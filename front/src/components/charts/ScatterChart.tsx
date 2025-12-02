import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styled from "styled-components";
import { getParameterByKey } from "../../utils/simaChartCategories";
import type { ScatterDataPoint } from "../../hooks/useSimaChartData";

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
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const ChartSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

interface ScatterChartProps {
  data: ScatterDataPoint[];
  xAxisParam: string;
  yAxisParam: string;
  title?: string;
  large?: boolean;
  id?: string; // ID para exportação PDF
}

export default function ScatterChart({
  data,
  xAxisParam,
  yAxisParam,
  title = "Gráfico de Dispersão",
  large = false,
  id = "chart-scatter-container",
}: ScatterChartProps) {
  const xParam = getParameterByKey(xAxisParam);
  const yParam = getParameterByKey(yAxisParam);

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: ScatterDataPoint }>;
  }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ marginBottom: "8px", fontWeight: 600, color: "#1e293b" }}>
            {point.estacao || "Estação"}
          </p>
          <p style={{ marginBottom: "4px", fontSize: "0.875rem", color: "#3b82f6" }}>
            {xParam?.label || xAxisParam} ({xParam?.unit || ""}):{" "}
            <strong>{point.x.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</strong>
          </p>
          <p style={{ marginBottom: "4px", fontSize: "0.875rem", color: "#ef4444" }}>
            {yParam?.label || yAxisParam} ({yParam?.unit || ""}):{" "}
            <strong>{point.y.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</strong>
          </p>
          <p style={{ marginTop: "8px", fontSize: "0.75rem", color: "#64748b" }}>
            {new Date(point.date).toLocaleDateString("pt-BR")}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <ChartContainer $large={large} id={id}>
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
          Nenhum dado disponível para os parâmetros selecionados
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer $large={large} id={id}>
      <ChartTitle>{title}</ChartTitle>
      <ChartSubtitle>
        {xParam?.label || xAxisParam} vs {yParam?.label || yAxisParam}
      </ChartSubtitle>

      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart data={data} margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="x"
            name={xParam?.label || xAxisParam}
            label={{
              value: `${xParam?.label || xAxisParam} ${xParam?.unit ? `(${xParam.unit})` : ""}`,
              position: "insideBottom",
              offset: -5,
              style: { textAnchor: "middle", fill: "#64748b" },
            }}
            stroke="#64748b"
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yParam?.label || yAxisParam}
            label={{
              value: `${yParam?.label || yAxisParam} ${yParam?.unit ? `(${yParam.unit})` : ""}`,
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#64748b" },
            }}
            stroke="#64748b"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Dados" data={data} fill="#3b82f6" shape="circle" />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
