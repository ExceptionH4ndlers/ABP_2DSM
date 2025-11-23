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
}

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
}) => {
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

  return (
    <div className="w-full h-auto p-4 bg-white rounded-xl shadow-md">
      {title && <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>}

      {/* === Sem agrupamento por categorias === */}
      {!groupByCategory && (
        <div className="w-full h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />

              {bars.map((bar, i) => (
                <Bar
                  key={i}
                  dataKey={bar.key}
                  name={bar.label || bar.key}
                  fill={bar.color || "#8884d8"}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* === COM Agrupamento por categorias === */}
      {groupByCategory && groupedByCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {Object.entries(groupedByCategory).map(([category, values], i) => {
            // Filtrar as barras que pertencem a esta categoria
            const categoryBars = bars.filter((bar) => CATEGORY_MAP[bar.key] === category);

            if (categoryBars.length === 0) return null;

            return (
              <div key={i} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <h3 className="font-semibold text-gray-700 mb-3 capitalize">
                  Categoria: {category}
                </h3>

                <div className="w-full h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={values}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={xKey} />
                      <YAxis />
                      <Tooltip />
                      <Legend />

                      {categoryBars.map((bar, j) => (
                        <Bar
                          key={j}
                          dataKey={bar.key}
                          name={bar.label || bar.key}
                          fill={bar.color || "#8884d8"}
                          radius={[4, 4, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BarChartComparison;
