import { useEffect, useState } from "react";

interface Estacao {
  idestacao: string;
  rotulo: string;
}

interface EstacoesResponse {
  success: boolean;
  data: Estacao[];
}

const API_BASE_URL = "http://localhost:3001";

export const useEstacoes = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/sima/estacao/simple`);

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const result: EstacoesResponse = await response.json();

        if (result.success) {
          setEstacoes(result.data);
        } else {
          throw new Error("Erro na resposta da API");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setEstacoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEstacoes();
  }, []);

  return {
    estacoes,
    loading,
    error,
  };
};
