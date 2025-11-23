/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { getParameterByKey } from "../../utils/simaChartCategories";

interface BarDefinition {
  key: string;
  label?: string;
  color?: string;
}

interface BarChartComparisonProps {
  data: Array<Record<string, unknown>>;
  xKey: string; // reservatório | sitio | campanha
  bars: BarDefinition[];
  title?: string;
  /** Se verdadeiro, gera gráficos separados por categoria */
  groupByCategory?: boolean;
  large?: boolean;
  id?: string; // ID para exportação PDF
}

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

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #64748b;
  font-size: 0.875rem;
`;

/**
 * Tipos de parâmetros agrupados por categoria
 * (biótico, abiótico, gases)
 */
const CATEGORY_MAP: Record<string, string> = {
  // Biotico
  doc: "biótico",
  toc: "biótico",
  poc: "biótico",
  densidadeBacteria: "biótico",
  biomassaBacteria: "biótico",
  clorofilaA: "biótico",
  biomassaCarbonoTotalFito: "biótico",
  densidadeTotalFito: "biótico",
  biomassaZoo: "biótico",
  densidadeTotalZoo: "biótico",

  // Abiotico
  dic: "abiótico",
  nt: "abiótico",
  pt: "abiótico",
  delta13c: "abiótico",
  delta15n: "abiótico",

  // Gases
  co2: "gases",
  o2: "gases",
  n2: "gases",
  ch4: "gases",
  n2o: "gases",
};

const BarChartComparison: React.FC<BarChartComparisonProps> = ({
  data,
  xKey,
  bars,
  title,
  groupByCategory = false,
  large = false,
  id = "chart-bar-container",
}) => {
  if (data.length === 0) {
    return (
      <ChartContainer $large={large} id={id}>
        {title && <ChartTitle>{title}</ChartTitle>}
        <EmptyState>Nenhum dado disponível para os filtros selecionados</EmptyState>
      </ChartContainer>
    );
  }
  /**
   * Quando ativa a comparação por categorias:
   * - separamos os parâmetros conforme CATEGORY_MAP
   * - exibimos um gráfico por categoria automaticamente
   */
  const groupedByCategory = groupByCategory
    ? (() => {
        const categories: Record<string, Array<Record<string, unknown>>> = {};

        bars.forEach((bar) => {
          const category = CATEGORY_MAP[bar.key] || "outros";
          if (!categories[category]) categories[category] = [];

          data.forEach((item) => {
            if (!categories[category].includes(item)) {
              categories[category].push(item);
            }
          });
        });

        return categories;
      })()
    : null;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
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
          <p style={{ marginBottom: "8px", fontWeight: 600, color: "#1e293b" }}>{label}</p>
          {payload.map((entry: any, index: number) => {
            const param = getParameterByKey(entry.dataKey);
            return (
              <p
                key={index}
                style={{
                  color: entry.color,
                  marginBottom: "4px",
                  fontSize: "0.875rem",
                }}
              >
                {param?.label || entry.name}:{" "}
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

  return (
    <ChartContainer $large={large} id={id}>
      {title && <ChartTitle>{title}</ChartTitle>}

      {/* === Sem agrupamento por categorias === */}
      {!groupByCategory && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={80} stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                const param = getParameterByKey(value);
                return param?.label || value;
              }}
            />

            {bars.map((bar, i) => {
              const param = getParameterByKey(bar.key);
              return (
                <Bar
                  key={i}
                  dataKey={bar.key}
                  name={bar.label || param?.label || bar.key}
                  fill={bar.color || "#3b82f6"}
                  radius={[4, 4, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* === COM Agrupamento por categorias === */}
      {groupByCategory && groupedByCategory && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "2rem",
            marginTop: "1rem",
          }}
        >
          {Object.entries(groupedByCategory).map(([category, values], i) => {
            // Filtrar as barras que pertencem a esta categoria
            const categoryBars = bars.filter((bar) => CATEGORY_MAP[bar.key] === category);

            if (categoryBars.length === 0) return null;

            return (
              <div
                key={i}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  background: "#f9fafb",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "1rem",
                    textTransform: "capitalize",
                  }}
                >
                  Categoria: {category}
                </h3>

                <div style={{ width: "100%", height: "350px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={values} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey={xKey}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        stroke="#64748b"
                      />
                      <YAxis stroke="#64748b" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        formatter={(value) => {
                          const param = getParameterByKey(value);
                          return param?.label || value;
                        }}
                      />

                      {categoryBars.map((bar, j) => {
                        const param = getParameterByKey(bar.key);
                        return (
                          <Bar
                            key={j}
                            dataKey={bar.key}
                            name={bar.label || param?.label || bar.key}
                            fill={bar.color || "#3b82f6"}
                            radius={[4, 4, 0, 0]}
                          />
                        );
                      })}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ChartContainer>
  );
};

export default BarChartComparison;
