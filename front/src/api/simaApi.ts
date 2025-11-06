import axios from "axios";
import type { PaginatedResponse, Sima } from "../types/sima";

// Monta a URL com a porta do backend
const API_BASE =
  import.meta.env.VITE_API_URL || `http://localhost:${import.meta.env.VITE_SERVER_PORT ?? "3001"}`;

// ✅ Novo tipo para os parâmetros da função
interface GetSimaParams {
  page: number;
  limit: number;
  startDate: string; // formato ISO: 'YYYY-MM-DD'
  endDate: string; // formato ISO: 'YYYY-MM-DD'
}

export const getSima = async ({
  page,
  limit,
  startDate,
  endDate,
}: GetSimaParams): Promise<PaginatedResponse<Sima>> => {
  // Validação simples
  if (!page || page < 1 || !limit || limit < 1) {
    throw new Error("Parâmetros de paginação inválidos.");
  }
  if (!startDate || !endDate) {
    throw new Error("Os parâmetros 'startDate' e 'endDate' são obrigatórios.");
  }

  // Chamada usando `params` (mais seguro)
  const response = await axios.get<PaginatedResponse<Sima>>(`${API_BASE}/sima/sima/all`, {
    params: {
      page,
      limit,
      startDate,
      endDate,
    },
  });

  return response.data;
};
