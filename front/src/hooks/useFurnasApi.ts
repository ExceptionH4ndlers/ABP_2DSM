/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || `http://localhost:${import.meta.env.VITE_SERVER_PORT ?? "3001"}`;

export interface FurnasQueryParams {
  page?: number;
  limit?: number;

  // FILTROS BÁSICOS
  startDate: string;
  endDate: string;

  // FILTROS AVANÇADOS US15
  reservatorios?: string[]; // múltiplos reservatórios
  instituicao?: string;
  nivelMin?: number;
  nivelMax?: number;
  volumeUtilMin?: number;
  volumeUtilMax?: number;
  geracaoMin?: number;
  geracaoMax?: number;

  // Ordenação multi-coluna
  sortBy?: string; // Ex: "data,nivel,volume_util"
  sortOrder?: string; // asc | desc
}

export function useFurnasApi() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (params: FurnasQueryParams) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      // PAGINAÇÃO
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());

      // INTERVALO DE DATAS
      queryParams.append("startDate", params.startDate);
      queryParams.append("endDate", params.endDate);

      // MÚLTIPLOS RESERVATÓRIOS
      if (params.reservatorios?.length) {
        params.reservatorios.forEach((r) => {
          queryParams.append("reservatorios", r);
        });
      }

      // INSTITUIÇÃO
      if (params.instituicao) {
        queryParams.append("instituicao", params.instituicao);
      }

      // RANGE — NÍVEL
      if (params.nivelMin !== undefined) {
        queryParams.append("nivelMin", params.nivelMin.toString());
      }
      if (params.nivelMax !== undefined) {
        queryParams.append("nivelMax", params.nivelMax.toString());
      }

      // RANGE — VOLUME ÚTIL
      if (params.volumeUtilMin !== undefined) {
        queryParams.append("volumeUtilMin", params.volumeUtilMin.toString());
      }
      if (params.volumeUtilMax !== undefined) {
        queryParams.append("volumeUtilMax", params.volumeUtilMax.toString());
      }

      // RANGE — GERAÇÃO
      if (params.geracaoMin !== undefined) {
        queryParams.append("geracaoMin", params.geracaoMin.toString());
      }
      if (params.geracaoMax !== undefined) {
        queryParams.append("geracaoMax", params.geracaoMax.toString());
      }

      // ORDENAÇÃO MULTI-COLUNA
      if (params.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }
      if (params.sortOrder) {
        queryParams.append("sortOrder", params.sortOrder);
      }

      const res = await fetch(`${API_BASE_URL}/furnas?${queryParams.toString()}`);

      if (!res.ok) {
        throw new Error("Erro ao carregar dados de Furnas.");
      }

      const json = await res.json();

      setData(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Erro inesperado ao obter dados.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    total,
    totalPages,
    loading,
    error,
    fetchData,
  };
}
