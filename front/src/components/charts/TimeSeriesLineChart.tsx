import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { Calendar } from "lucide-react";
import { getParameterByKey } from "../../utils/simaChartCategories";
import type { TimeSeriesDataPoint } from "../../hooks/useSimaChartData";

const ChartContainer = styled.div<{ $large?: boolean }>`
  width: 100%;
  height: ${(props) => (props.$large ? "700px" : "500px")};
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  ${({ theme }) => theme.media.sm} {
    height: ${(props) => (props.$large ? "650px" : "450px")};
  }

  ${({ theme }) => theme.media.lg} {
    height: ${(props) => (props.$large ? "800px" : "500px")};
  }

  /* Ocultar legenda do Recharts no print */
  @media print {
    .chart-legend {
      display: none !important;
    }
  }
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const DateRangeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
`;

const DateInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1e293b;
  background-color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const DateRangeSeparator = styled.span`
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 500;
`;

const DateRangeInfo = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  margin-left: auto;
`;

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

interface TimeSeriesLineChartProps {
  data: TimeSeriesDataPoint[];
  parameters: string[];
  title?: string;
  large?: boolean;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  id?: string; // ID para exportação PDF
  exportButtons?: React.ReactNode; // Botões de exportação
}

export default function TimeSeriesLineChart({
  data,
  parameters,
  title = "Séries Temporais",
  large = false,
  onDateRangeChange,
  initialStartDate,
  initialEndDate,
  id = "chart-line-container",
  exportButtons,
}: TimeSeriesLineChartProps) {
  const [startDate, setStartDate] = useState<string>(initialStartDate || "");
  const [endDate, setEndDate] = useState<string>(initialEndDate || "");

  // Calcular range de datas disponível
  useEffect(() => {
    if (data.length > 0) {
      const dates = data.map((d) => new Date(d.date).getTime());
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));

      if (!initialStartDate) {
        setStartDate(minDate.toISOString().split("T")[0]);
      }
      if (!initialEndDate) {
        setEndDate(maxDate.toISOString().split("T")[0]);
      }
    }
  }, [data, initialStartDate, initialEndDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (onDateRangeChange && endDate) {
      onDateRangeChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (onDateRangeChange && startDate) {
      onDateRangeChange(startDate, newEndDate);
    }
  };

  // Filtrar dados pelo range selecionado
  // Se não há datas selecionadas, usar todos os dados
  const filteredData =
    !startDate || !endDate
      ? data
      : data.filter((point) => {
          const pointDate = new Date(point.date).getTime();
          const start = new Date(startDate).getTime();
          const end = new Date(endDate).getTime() + 86400000; // +1 dia para incluir o dia final
          return pointDate >= start && pointDate <= end;
        });

  // Calcular estatísticas do range
  const getDateRangeInfo = () => {
    if (filteredData.length === 0) return "Nenhum dado no período selecionado";
    const totalPoints = data.length;
    const visiblePoints = filteredData.length;
    const percentage = ((visiblePoints / totalPoints) * 100).toFixed(1);
    return `${visiblePoints} de ${totalPoints} pontos (${percentage}%)`;
  };

  // Função toggleSeries removida - não há mais legenda clicável superior

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number | string;
      color: string;
      payload?: TimeSeriesDataPoint;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      // Verificar se há informação de estação no payload
      const estacao = payload[0]?.payload?.estacao;

      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <p style={{ marginBottom: "8px", fontWeight: 600, color: "#1e293b" }}>
            {formatDate(label || "")}
          </p>
          {estacao && (
            <p
              style={{
                marginBottom: "8px",
                fontSize: "0.75rem",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              Estação: {estacao}
            </p>
          )}
          {payload.map((entry, index: number) => {
            // Parâmetro é sempre a chave direta (sem prefixo de estação)
            const paramKey = entry.dataKey;
            const param = getParameterByKey(paramKey);

            return (
              <p
                key={index}
                style={{
                  color: entry.color,
                  marginBottom: "4px",
                  fontSize: "0.875rem",
                }}
              >
                {param?.label || paramKey}:{" "}
                <strong>
                  {typeof entry.value === "number"
                    ? entry.value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
                    : entry.value}{" "}
                  {param?.unit && `(${param.unit})`}
                </strong>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <ChartContainer $large={large}>
        <ChartTitle>{title}</ChartTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            color: "#64748b",
          }}
        >
          Nenhum dado disponível para os filtros selecionados
        </div>
      </ChartContainer>
    );
  }

  // Calcular min/max dates para os inputs
  const dates = data.map((d) => new Date(d.date).getTime());
  const minDate = new Date(Math.min(...dates)).toISOString().split("T")[0];
  const maxDate = new Date(Math.max(...dates)).toISOString().split("T")[0];

  return (
    <ChartContainer $large={large} id={id}>
      <ChartTitle>{title}</ChartTitle>

      {/* Seletor de Range de Datas */}
      <DateRangeSelector>
        <DateRangeLabel>
          <Calendar size={16} />
          Período de Análise:
        </DateRangeLabel>
        <DateInput
          type="date"
          value={startDate}
          min={minDate}
          max={maxDate}
          onChange={handleStartDateChange}
        />
        <DateRangeSeparator>→</DateRangeSeparator>
        <DateInput
          type="date"
          value={endDate}
          min={minDate}
          max={maxDate}
          onChange={handleEndDateChange}
        />
        <DateRangeInfo>{getDateRangeInfo()}</DateRangeInfo>
      </DateRangeSelector>

      {/* Botões de Exportação no lugar da legenda superior */}
      {exportButtons && (
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {exportButtons}
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filteredData.length > 0 ? filteredData : data}
          margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
            }}
            angle={-45}
            textAnchor="end"
            height={80}
            stroke="#64748b"
          />
          <YAxis stroke="#64748b" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={(value) => {
              const param = getParameterByKey(value);
              return param?.label || value;
            }}
            className="chart-legend"
          />

          {(() => {
            // Usar dados filtrados ou todos os dados
            const dataToRender = filteredData.length > 0 ? filteredData : data;

            if (dataToRender.length === 0) {
              return null;
            }

            // Sempre uma única estação - renderizar linhas simples
            const lines = parameters
              .map((paramKey, index) => {
                // Verificar se o parâmetro existe nos dados
                const hasData = dataToRender.some((d) => {
                  const value = d[paramKey];
                  return value !== undefined && value !== null && !isNaN(Number(value));
                });

                if (!hasData) {
                  return null;
                }

                const param = getParameterByKey(paramKey);
                return (
                  <Line
                    key={paramKey}
                    type="monotone"
                    dataKey={paramKey}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name={param?.label || paramKey}
                    connectNulls={false}
                  />
                );
              })
              .filter((line): line is React.ReactElement => line !== null);

            return lines.length > 0 ? lines : null;
          })()}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
