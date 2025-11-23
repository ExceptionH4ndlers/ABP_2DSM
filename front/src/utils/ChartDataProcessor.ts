export interface DataPoint {
  [key: string]: unknown;
  timestamp?: Date | string;
  value?: number;
}

export interface AggregatedData {
  period: string;
  value: number;
  count: number;
  min?: number;
  max?: number;
  avg?: number;
}

export interface Statistics {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  count: number;
}

export interface ScatterDataPoint {
  x: number;
  y: number;
}

export interface ChartDataset {
  label: string;
  data: number[] | ScatterDataPoint[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export type PeriodType = "day" | "week" | "month" | "year";

export class ChartDataProcessor {
  /**
   * Agrega dados por período (dia, semana, mês, ano)
   */
  static aggregateByPeriod(
    data: DataPoint[],
    period: PeriodType,
    valueKey: string = "value",
    timestampKey: string = "timestamp",
  ): AggregatedData[] {
    const grouped = new Map<string, number[]>();

    data.forEach((point) => {
      const timestampValue = point[timestampKey];
      if (
        timestampValue === null ||
        timestampValue === undefined ||
        (typeof timestampValue !== "string" &&
          typeof timestampValue !== "number" &&
          !(timestampValue instanceof Date))
      ) {
        return;
      }
      const timestamp =
        timestampValue instanceof Date
          ? timestampValue
          : new Date(timestampValue as string | number);
      if (isNaN(timestamp.getTime())) return;

      let periodKey: string;
      switch (period) {
        case "day":
          periodKey = timestamp.toISOString().split("T")[0];
          break;
        case "week": {
          const weekStart = new Date(timestamp);
          weekStart.setDate(timestamp.getDate() - timestamp.getDay());
          periodKey = weekStart.toISOString().split("T")[0];
          break;
        }
        case "month":
          periodKey = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}`;
          break;
        case "year":
          periodKey = String(timestamp.getFullYear());
          break;
        default:
          periodKey = timestamp.toISOString().split("T")[0];
      }

      const value = Number(point[valueKey]);
      if (!isNaN(value)) {
        if (!grouped.has(periodKey)) {
          grouped.set(periodKey, []);
        }
        grouped.get(periodKey)!.push(value);
      }
    });

    const result: AggregatedData[] = [];
    grouped.forEach((values, period) => {
      result.push({
        period,
        value: this.mean(values),
        count: values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: this.mean(values),
      });
    });

    return result.sort((a, b) => a.period.localeCompare(b.period));
  }

  /**
   * Calcula estatísticas (média, mediana, desvio padrão, mínimo, máximo)
   */
  static calculateStatistics(values: number[]): Statistics {
    if (values.length === 0) {
      return {
        mean: 0,
        median: 0,
        stdDev: 0,
        min: 0,
        max: 0,
        count: 0,
      };
    }

    const sorted = [...values].sort((a, b) => a - b);
    const mean = this.mean(values);
    const median = this.median(sorted);
    const stdDev = this.standardDeviation(values, mean);

    return {
      mean,
      median,
      stdDev,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      count: values.length,
    };
  }

  /**
   * Calcula a média
   */
  static mean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Calcula a mediana
   */
  static median(sortedValues: number[]): number {
    if (sortedValues.length === 0) return 0;
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 === 0
      ? (sortedValues[mid - 1] + sortedValues[mid]) / 2
      : sortedValues[mid];
  }

  /**
   * Calcula o desvio padrão
   */
  static standardDeviation(values: number[], mean?: number): number {
    if (values.length === 0) return 0;
    const avg = mean ?? this.mean(values);
    const squaredDiffs = values.map((val) => Math.pow(val - avg, 2));
    const variance = this.mean(squaredDiffs);
    return Math.sqrt(variance);
  }

  /**
   * Normaliza dados para escala 0-1 (min-max normalization)
   */
  static normalizeMinMax(values: number[]): number[] {
    if (values.length === 0) return [];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    if (range === 0) return values.map(() => 0.5);
    return values.map((val) => (val - min) / range);
  }

  /**
   * Normaliza dados usando z-score
   */
  static normalizeZScore(values: number[]): number[] {
    if (values.length === 0) return [];
    const mean = this.mean(values);
    const stdDev = this.standardDeviation(values, mean);
    if (stdDev === 0) return values.map(() => 0);
    return values.map((val) => (val - mean) / stdDev);
  }

  /**
   * Filtra outliers usando método IQR (Interquartile Range)
   */
  static filterOutliersIQR(values: number[]): number[] {
    if (values.length < 4) return values;

    const sorted = [...values].sort((a, b) => a - b);
    const q1Index = Math.floor(sorted.length * 0.25);
    const q3Index = Math.floor(sorted.length * 0.75);
    const q1 = sorted[q1Index];
    const q3 = sorted[q3Index];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return values.filter((val) => val >= lowerBound && val <= upperBound);
  }

  /**
   * Filtra outliers usando desvio padrão (remove valores além de n desvios)
   */
  static filterOutliersStdDev(values: number[], numStdDevs: number = 3): number[] {
    if (values.length === 0) return [];
    const mean = this.mean(values);
    const stdDev = this.standardDeviation(values, mean);
    const lowerBound = mean - numStdDevs * stdDev;
    const upperBound = mean + numStdDevs * stdDev;

    return values.filter((val) => val >= lowerBound && val <= upperBound);
  }

  /**
   * Prepara dados para gráfico de linha
   */
  static prepareLineChart(
    data: DataPoint[],
    labelKey: string,
    valueKey: string,
    datasetLabel: string = "Valores",
  ): ChartData {
    const labels = data.map((point) => String(point[labelKey]));
    const values = data.map((point) => Number(point[valueKey]) || 0);

    return {
      labels,
      datasets: [
        {
          label: datasetLabel,
          data: values,
          borderColor: "rgb(220, 38, 38)",
          backgroundColor: "rgba(220, 38, 38, 0.1)",
          borderWidth: 2,
        },
      ],
    };
  }

  /**
   * Prepara dados para gráfico de barras
   */
  static prepareBarChart(
    data: DataPoint[],
    labelKey: string,
    valueKey: string,
    datasetLabel: string = "Valores",
  ): ChartData {
    const labels = data.map((point) => String(point[labelKey]));
    const values = data.map((point) => Number(point[valueKey]) || 0);

    return {
      labels,
      datasets: [
        {
          label: datasetLabel,
          data: values,
          backgroundColor: "rgba(220, 38, 38, 0.8)",
          borderColor: "rgb(220, 38, 38)",
          borderWidth: 1,
        },
      ],
    };
  }

  /**
   * Prepara dados para gráfico de pizza
   */
  static preparePieChart(data: DataPoint[], labelKey: string, valueKey: string): ChartData {
    const labels = data.map((point) => String(point[labelKey]));
    const values = data.map((point) => Number(point[valueKey]) || 0);

    const colors = ["#f16464ff", "#7ac47eff", "#98a8f1ff", "#f8e597ff", "#f1b1d7ff", "#8ce7d5ff"];

    return {
      labels,
      datasets: [
        {
          label: "Distribuição",
          data: values,
          backgroundColor: values.map((_, i) => colors[i % colors.length]),
          borderWidth: 1,
        },
      ],
    };
  }

  /**
   * Prepara dados para gráfico de dispersão (scatter)
   */
  static prepareScatterChart(
    data: DataPoint[],
    xKey: string,
    yKey: string,
    datasetLabel: string = "Dados",
  ): ChartData {
    const xValues = data.map((point) => Number(point[xKey]) || 0);
    const yValues = data.map((point) => Number(point[yKey]) || 0);

    // Para scatter, os dados precisam estar no formato {x, y}
    const scatterData: ScatterDataPoint[] = xValues.map((x, i) => ({
      x,
      y: yValues[i],
    }));

    return {
      labels: xValues.map((x) => String(x)),
      datasets: [
        {
          label: datasetLabel,
          data: scatterData,
          backgroundColor: "rgba(220, 38, 38, 0.6)",
          borderColor: "rgb(220, 38, 38)",
          borderWidth: 1,
        },
      ],
    };
  }

  /**
   * Prepara dados para gráfico de múltiplas séries temporais
   */
  static prepareMultiSeriesChart(
    data: DataPoint[],
    timestampKey: string,
    seriesKeys: string[],
    labels: string[] = [],
  ): ChartData {
    const timestamps = data.map((point) => String(point[timestampKey]));
    const colors = [
      "rgb(220, 38, 38)",
      "rgb(59, 130, 246)",
      "rgb(16, 185, 129)",
      "rgb(245, 158, 11)",
      "rgb(139, 92, 246)",
    ];

    const datasets = seriesKeys.map((key, index) => ({
      label: labels[index] || key,
      data: data.map((point) => Number(point[key]) || 0),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace("rgb", "rgba").replace(")", ", 0.1)"),
      borderWidth: 2,
    }));

    return {
      labels: timestamps,
      datasets,
    };
  }

  /**
   * Agrupa dados por categoria
   */
  static groupByCategory(
    data: DataPoint[],
    categoryKey: string,
    valueKey: string,
  ): Map<string, number[]> {
    const grouped = new Map<string, number[]>();

    data.forEach((point) => {
      const category = String(point[categoryKey]);
      const value = Number(point[valueKey]);
      if (!isNaN(value)) {
        if (!grouped.has(category)) {
          grouped.set(category, []);
        }
        grouped.get(category)!.push(value);
      }
    });

    return grouped;
  }

  /**
   * Preenche valores faltantes usando interpolação linear
   */
  static interpolateMissingValues(values: (number | null)[]): number[] {
    const result: number[] = [];
    let lastValidIndex = -1;
    let lastValidValue = 0;

    for (let i = 0; i < values.length; i++) {
      if (values[i] !== null && values[i] !== undefined && !isNaN(values[i]!)) {
        result.push(values[i]!);
        lastValidIndex = i;
        lastValidValue = values[i]!;
      } else {
        // Encontrar próximo valor válido
        let nextValidIndex = -1;
        let nextValidValue = 0;
        for (let j = i + 1; j < values.length; j++) {
          if (values[j] !== null && values[j] !== undefined && !isNaN(values[j]!)) {
            nextValidIndex = j;
            nextValidValue = values[j]!;
            break;
          }
        }

        if (lastValidIndex >= 0 && nextValidIndex >= 0) {
          // Interpolação linear
          const ratio = (i - lastValidIndex) / (nextValidIndex - lastValidIndex);
          const interpolated = lastValidValue + (nextValidValue - lastValidValue) * ratio;
          result.push(interpolated);
        } else if (lastValidIndex >= 0) {
          // Usar último valor válido
          result.push(lastValidValue);
        } else if (nextValidIndex >= 0) {
          // Usar próximo valor válido
          result.push(nextValidValue);
        } else {
          // Sem valores válidos, usar 0
          result.push(0);
        }
      }
    }

    return result;
  }
}
