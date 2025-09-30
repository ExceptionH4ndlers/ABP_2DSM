import { useState } from "react";

export interface SimaApiData {
  idsima: number;
  idestacao: string;
  datahora: string;
  regno?: number;
  nofsamples?: number;
  proamag?: number;
  dirvt?: number;
  intensvt?: number;
  u_vel?: number;
  v_vel?: number;
  tempag1?: number;
  tempag2?: number;
  tempag3?: number;
  tempag4?: number;
  tempar?: number;
  ur?: number;
  tempar_r?: number;
  pressatm?: number;
  radincid?: number;
  radrefl?: number;
  bateria?: number;
  sonda_temp?: number;
  sonda_cond?: number;
  sonda_dosat?: number;
  sonda_do?: number;
  sonda_ph?: number;
  sonda_nh4?: number;
  sonda_no3?: number;
  sonda_turb?: number;
  sonda_chl?: number;
  sonda_bateria?: number;
  corr_norte?: number;
  corr_leste?: number;
  co2_low?: number;
  co2_high?: number;
  precipitacao?: number;
}

export interface SimaApiResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: SimaApiData[];
}

export interface SimaApiParams {
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
  estacao?: string;
  sortOrder?: string;
}

const API_BASE_URL = "http://localhost:3001";

export const useSimaApi = () => {
  const [data, setData] = useState<SimaApiData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchData = async (params: SimaApiParams) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
        startDate: params.startDate,
        endDate: params.endDate,
      });

      if (params.estacao) {
        queryParams.append("estacao", params.estacao);
      }

      if (params.sortOrder) {
        queryParams.append("sortOrder", params.sortOrder);
      }

      const response = await fetch(`${API_BASE_URL}/sima/all?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const result: SimaApiResponse = await response.json();

      if (result.success) {
        setData(result.data);
        setPagination({
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        });
      } else {
        throw new Error("Erro na resposta da API");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    pagination,
    fetchData,
  };
};
