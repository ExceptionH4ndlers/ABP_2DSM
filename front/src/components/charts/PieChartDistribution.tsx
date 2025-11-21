import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartDistributionProps {
  data: { label: string; value: number }[];
}

const PieChartDistribution: React.FC<PieChartDistributionProps> = ({ data }) => {
  // Processar os dados para o formato aceito pelo Chart.js
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "#f16464ff",
          "#7ac47eff",
          "#98a8f1ff",
          "#f8e597ff",
          "#f1b1d7ff",
          "#8ce7d5ff",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartDistribution;
