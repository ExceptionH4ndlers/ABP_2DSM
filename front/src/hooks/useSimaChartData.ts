import { useMemo } from "react";
import type { SimaApiData } from "./useSimaApi";

export type ChartType = "line" | "scatter";
export type GroupBy = "estacao" | "periodo" | "parametro";

export interface ChartFilters {
  category:
    | "todos"
    | "fisicos"
    | "biologicos"
    | "gases"
    | "meteorologicos"
    | "correntes"
    | "temperaturas";
  parameters: string[];
  estacao?: string; // Estação única selecionada
  startDate: string;
  endDate: string;
  chartType: ChartType;
  groupBy?: GroupBy;
  xAxisParam?: string; // Para scatter plot
  yAxisParam?: string; // Para scatter plot
}

export interface TimeSeriesDataPoint {
  date: string;
  estacao?: string;
  [paramKey: string]: string | number | undefined;
}

export interface ScatterDataPoint {
  x: number;
  y: number;
  date: string;
  estacao?: string;
}

/**
 * Hook para processar dados do SIMA para diferentes tipos de gráficos
 */
export function useSimaChartData(
  data: SimaApiData[],
  filters: ChartFilters,
): TimeSeriesDataPoint[] | ScatterDataPoint[] {
  // Extrair valores para dependências do useMemo (evitar recálculos desnecessários)
  const parametersKey = filters.parameters?.join(",") || "";
  const filtersKey = JSON.stringify({
    parameters: parametersKey,
    estacao: filters.estacao,
    startDate: filters.startDate,
    endDate: filters.endDate,
    chartType: filters.chartType,
    groupBy: filters.groupBy,
    xAxisParam: filters.xAxisParam,
    yAxisParam: filters.yAxisParam,
  });

  return useMemo(() => {
    // Validar se há parâmetros selecionados
    if (!filters.parameters || filters.parameters.length === 0) {
      return [];
    }

    // Validar se há estação selecionada
    if (!filters.estacao || filters.estacao.length === 0) {
      return [];
    }

    // Se não há dados, retornar vazio
    if (!data || data.length === 0) {
      return [];
    }

    // Normalizar IDs de estações (remover espaços e converter para string)
    const normalizeId = (id: string | undefined | null): string => {
      if (!id) return "";
      return String(id).trim();
    };

    // Normalizar estação selecionada
    const selectedEstacao = normalizeId(filters.estacao);

    // Processar todos os dados (sem limite artificial)
    // O limite agora é apenas para evitar travamentos extremos em casos muito grandes
    // Limite muito alto para permitir períodos longos (ex: 4+ anos)
    // Apenas limita em casos extremos (mais de 100k registros)
    const MAX_DATA_POINTS = 200000; // Limite muito alto para períodos longos

    const dataToProcess = data.length > MAX_DATA_POINTS ? data.slice(0, MAX_DATA_POINTS) : data;

    if (data.length > MAX_DATA_POINTS) {
      console.warn(
        `⚠️ Limite de dados atingido: ${data.length} > ${MAX_DATA_POINTS}. Processando apenas os primeiros ${MAX_DATA_POINTS} registros.`,
      );
    }

    // Filtrar dados por período e estação(ões)
    // Nota: Os dados já podem vir filtrados do servidor, mas fazemos uma validação adicional
    // para garantir que apenas os dados corretos sejam processados
    const filteredData = dataToProcess.filter((item) => {
      // Validar data (os dados já devem vir filtrados, mas validamos para garantir)
      const itemDate = new Date(item.datahora);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);

      const inDateRange = itemDate >= startDate && itemDate <= endDate;
      if (!inDateRange) {
        return false;
      }

      // Validar estação (normalizar antes de comparar)
      const itemEstacaoId = normalizeId(item.idestacao);
      return itemEstacaoId === selectedEstacao;
    });

    // Se não há dados após filtro, retornar vazio
    if (filteredData.length === 0) {
      return [];
    }

    // Verificar se os parâmetros existem nos dados
    if (filteredData.length > 0) {
      const sampleItem = filteredData[0] as unknown as Record<string, unknown>;
      const camposDisponiveis = Object.keys(sampleItem);
      const parametrosEncontrados = filters.parameters.filter((param) =>
        camposDisponiveis.includes(param),
      );
      if (parametrosEncontrados.length === 0) {
        // Nenhum parâmetro encontrado nos dados
        return [];
      }
    }

    let result: TimeSeriesDataPoint[] | ScatterDataPoint[];

    switch (filters.chartType) {
      case "line":
        result = processTimeSeriesData(filteredData, filters);
        break;
      case "scatter":
        result = processScatterData(filteredData, filters);
        break;
      default:
        result = [];
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filtersKey]);
}

/**
 * Processar dados para gráfico de linha (séries temporais)
 */
function processTimeSeriesData(data: SimaApiData[], filters: ChartFilters): TimeSeriesDataPoint[] {
  // Validar se há estação selecionada
  if (!filters.estacao || filters.estacao.length === 0) {
    return [];
  }

  // Se não há parâmetros selecionados, não processar
  if (!filters.parameters || filters.parameters.length === 0) {
    return [];
  }

  // Se não há dados, retornar vazio
  if (!data || data.length === 0) {
    return [];
  }

  // Normalizar IDs para comparação (consistente com a função principal)
  const normalizeId = (id: string | undefined | null): string => {
    if (!id) return "";
    return String(id).trim();
  };
  const normalizedSelectedEstacao = normalizeId(filters.estacao);

  // Filtrar dados pela estação selecionada
  const filteredByEstacao = data.filter((item) => {
    const itemEstacaoId = normalizeId(item.idestacao);
    return itemEstacaoId === normalizedSelectedEstacao;
  });

  // Se não há dados, retornar vazio
  if (filteredByEstacao.length === 0) {
    return [];
  }

  const estacaoNome = filteredByEstacao[0]?.nome_estacao || normalizedSelectedEstacao;
  const result: TimeSeriesDataPoint[] = [];

  // Processar todos os dados (sem limite artificial para períodos longos)
  // Limite muito alto apenas para casos extremos
  const maxItems = 200000; // Limite muito alto para permitir períodos longos
  const itemsToProcess =
    filteredByEstacao.length > maxItems ? filteredByEstacao.slice(0, maxItems) : filteredByEstacao;

  if (filteredByEstacao.length > maxItems) {
    console.warn(
      `⚠️ Limite de itens atingido: ${filteredByEstacao.length} > ${maxItems}. Processando apenas os primeiros ${maxItems} registros.`,
    );
  }

  const groupedByDate = new Map<string, SimaApiData[]>();
  itemsToProcess.forEach((item) => {
    const dateKey = new Date(item.datahora).toISOString();
    if (!groupedByDate.has(dateKey)) {
      groupedByDate.set(dateKey, []);
    }
    groupedByDate.get(dateKey)?.push(item);
  });

  groupedByDate.forEach((dateItems, dateKey) => {
    const point: TimeSeriesDataPoint = {
      date: dateKey,
      estacao: estacaoNome,
    };

    filters.parameters.forEach((paramKey) => {
      const values = dateItems
        .map((item) => (item as unknown as Record<string, unknown>)[paramKey] as number | undefined)
        .filter((v): v is number => v !== null && v !== undefined && !isNaN(v));

      if (values.length > 0) {
        const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
        // Para uma única estação, usar apenas o nome do parâmetro
        point[paramKey] = Number(avg.toFixed(2));
      }
    });

    result.push(point);
  });

  // Ordenar por data
  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return result;
}

/**
 * Processar dados para gráfico scatter (x,y)
 */
function processScatterData(data: SimaApiData[], filters: ChartFilters): ScatterDataPoint[] {
  if (!filters.xAxisParam || !filters.yAxisParam) {
    return [];
  }

  const result: ScatterDataPoint[] = [];

  data.forEach((item) => {
    const xValue = (item as unknown as Record<string, unknown>)[filters.xAxisParam!] as
      | number
      | undefined;
    const yValue = (item as unknown as Record<string, unknown>)[filters.yAxisParam!] as
      | number
      | undefined;

    if (
      xValue !== null &&
      xValue !== undefined &&
      !isNaN(xValue) &&
      yValue !== null &&
      yValue !== undefined &&
      !isNaN(yValue)
    ) {
      result.push({
        x: Number(xValue.toFixed(2)),
        y: Number(yValue.toFixed(2)),
        date: item.datahora,
        estacao: item.nome_estacao || item.idestacao,
      });
    }
  });

  return result;
}
