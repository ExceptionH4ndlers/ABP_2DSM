import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div<{ $large?: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.$large ? "900px" : "600px")};
  height: ${(props) => (props.$large ? "700px" : "500px")};
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 0 auto 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  text-align: center;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  position: relative;

  ${({ theme }) => theme.media.sm} {
    max-width: 350px;
    height: 350px;
  }

  ${({ theme }) => theme.media.lg} {
    max-width: 400px;
    height: 400px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #64748b;
  font-size: 0.875rem;
`;

interface PieChartDistributionProps {
  data: { label: string; value: number }[];
  title?: string;
  large?: boolean;
  id?: string; // ID para exportação PDF
}

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
  "#f16464",
  "#7ac47e",
  "#98a8f1",
  "#f8e597",
  "#f1b1d7",
  "#8ce7d5",
];

const PieChartDistribution: React.FC<PieChartDistributionProps> = ({
  data,
  title = "Distribuição",
  large = false,
  id = "chart-pie-container",
}) => {
  if (data.length === 0) {
    return (
      <ChartContainer $large={large} id={id}>
        <ChartTitle>{title}</ChartTitle>
        <EmptyState>Nenhum dado disponível para os filtros selecionados</EmptyState>
      </ChartContainer>
    );
  }

  // Processar os dados para o formato aceito pelo Chart.js
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((_, index) => COLORS[index % COLORS.length]),
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { label?: string; parsed?: number; dataset?: { data?: number[] } }) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset?.data?.reduce((a: number, b: number) => a + b, 0) || 0;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
            return `${label}: ${value.toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
            })} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <ChartContainer $large={large} id={id}>
      <ChartTitle>{title}</ChartTitle>
      <ChartWrapper>
        <Pie data={chartData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default PieChartDistribution;
