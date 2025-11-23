import { useState, useEffect } from "react";
import styled from "styled-components";
import { BarChart3, TrendingUp, FileDown } from "lucide-react";
import { useSimaApi } from "../hooks/useSimaApi";
import SimaChartFilters from "../components/SimaChartFilters";
import TimeSeriesLineChart from "../components/charts/TimeSeriesLineChart";
import ScatterChart from "../components/charts/ScatterChart";
import { useSimaChartData } from "../hooks/useSimaChartData";
import { useCsvExport } from "../hooks/useCsvExport";
import PeriodSelectionModal from "../components/PeriodSelectionModal";
import type {
  ChartFilters,
  TimeSeriesDataPoint,
  ScatterDataPoint,
} from "../hooks/useSimaChartData";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  padding: 2rem 1rem;

  ${({ theme }) => theme.media.sm} {
    padding: 3rem 2rem;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 4rem 3rem;
  }
`;

const PageHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  ${({ theme }) => theme.media.sm} {
    font-size: 3rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 3.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;

  ${({ theme }) => theme.media.sm} {
    font-size: 1.25rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 1.375rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FiltersSection = styled.section`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 1px solid #e2e8f0;

  ${({ theme }) => theme.media.sm} {
    padding: 3.5rem;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 4rem;
  }
`;

const ChartsSection = styled.section`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid #e2e8f0;

  ${({ theme }) => theme.media.sm} {
    padding: 3.5rem;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 4rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
  border-radius: 20px;
  border: 3px dashed #cbd5e1;
`;

const EmptyStateIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  line-height: 1.7;
`;

const ChartWrapper = styled.div`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExportSection = styled.section`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
`;

const ExportButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

function SimaGraficosPage() {
  const { data, loading, error, fetchData } = useSimaApi();

  const [chartFilters, setChartFilters] = useState<ChartFilters>({
    category: "todos",
    parameters: [],
    estacao: undefined,
    startDate: "", // Sem período padrão
    endDate: "", // Sem período padrão
    chartType: "line",
    groupBy: undefined,
    xAxisParam: undefined,
    yAxisParam: undefined,
  });

  const [chartDataLoaded, setChartDataLoaded] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const chartData = useSimaChartData(data, chartFilters);
  const { exportCsv } = useCsvExport();

  // Atualizar chartDataLoaded quando os dados chegarem
  useEffect(() => {
    if (chartDataLoaded && !loading) {
      // Se tentou carregar mas não há dados e não está carregando, manter como carregado
      // (pode ser que realmente não haja dados para os filtros)
    }
  }, [loading, data.length, chartDataLoaded]);

  // Função para converter dados do gráfico para formato CSV
  const convertChartDataToCsvFormat = (): Array<Record<string, unknown>> => {
    if (!chartData || chartData.length === 0) return [];

    switch (chartFilters.chartType) {
      case "line": {
        const timeSeriesData = chartData as TimeSeriesDataPoint[];
        return timeSeriesData.map((point) => {
          const row: Record<string, unknown> = {
            data: new Date(point.date).toLocaleString("pt-BR"),
            estacao: point.estacao || "N/A",
          };
          chartFilters.parameters.forEach((param) => {
            row[param] = point[param] || "";
          });
          return row;
        });
      }
      case "scatter": {
        const scatterData = chartData as ScatterDataPoint[];
        return scatterData.map((point) => ({
          [chartFilters.xAxisParam || "x"]: point.x,
          [chartFilters.yAxisParam || "y"]: point.y,
          data: new Date(point.date).toLocaleString("pt-BR"),
          estacao: point.estacao || "N/A",
        }));
      }
      default:
        return [];
    }
  };

  const handleExportChartCsv = async () => {
    const csvData = convertChartDataToCsvFormat();
    if (csvData.length === 0) {
      alert("Nenhum dado disponível para exportação.");
      return;
    }

    const filename = `dados_grafico_sima_${chartFilters.chartType}_${new Date().toISOString().split("T")[0]}.csv`;
    await exportCsv(csvData as Array<Record<string, unknown>>, filename);
  };

  const getChartId = () => {
    return `chart-${chartFilters.chartType}-container`;
  };

  const handleApplyFilters = () => {
    // Validar se há estação selecionada
    if (!chartFilters.estacao) {
      alert("Por favor, selecione uma estação.");
      return;
    }

    // Validar se há parâmetros selecionados
    if (!chartFilters.parameters || chartFilters.parameters.length === 0) {
      alert("Por favor, selecione pelo menos um parâmetro.");
      return;
    }

    // Validar se há período selecionado
    if (!chartFilters.startDate || !chartFilters.endDate) {
      // Abrir modal para seleção de período
      setShowPeriodModal(true);
      return;
    }

    // Validar se período não é muito longo
    const daysDiff = Math.ceil(
      (new Date(chartFilters.endDate).getTime() - new Date(chartFilters.startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysDiff > 365) {
      if (
        !window.confirm(
          `⚠️ O período selecionado é de ${daysDiff} dias (mais de 1 ano). Isso pode causar lentidão ou travamento.\n\nDeseja continuar mesmo assim?`,
        )
      ) {
        return;
      }
    }

    // Resetar estado antes de buscar
    setChartDataLoaded(false);

    // Normalizar ID da estação antes de enviar
    const normalizedEstacao = String(chartFilters.estacao).trim();

    // Buscar TODOS os dados do período (buscar todas as páginas automaticamente)
    fetchData(
      {
        page: 1,
        limit: 5000, // Limite por página (a função buscará todas as páginas)
        startDate: chartFilters.startDate,
        endDate: chartFilters.endDate,
        estacao: normalizedEstacao,
        sortOrder: "asc",
      },
      true, // fetchAllPages = true para buscar todas as páginas
    );

    // Marcar como carregado (será atualizado pelo useEffect quando dados chegarem)
    setChartDataLoaded(true);
  };

  const handlePeriodConfirm = (startDate: string, endDate: string) => {
    const updatedFilters = { ...chartFilters, startDate, endDate };
    setChartFilters(updatedFilters);
    setShowPeriodModal(false);

    // Aplicar filtros automaticamente após selecionar período
    const normalizedEstacao = updatedFilters.estacao ? String(updatedFilters.estacao).trim() : "";
    if (!normalizedEstacao) {
      return;
    }

    setChartDataLoaded(false);
    // Buscar TODOS os dados do período (buscar todas as páginas automaticamente)
    fetchData(
      {
        page: 1,
        limit: 5000, // Limite por página (a função buscará todas as páginas)
        startDate,
        endDate,
        estacao: normalizedEstacao,
        sortOrder: "asc",
      },
      true, // fetchAllPages = true para buscar todas as páginas
    );
    setChartDataLoaded(true);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <BarChart3 size={48} />
          Gráficos e Visualizações
        </PageTitle>
        <PageSubtitle>
          Explore e analise os dados do SIMA através de gráficos interativos e análises
          comparativas. Selecione os parâmetros, período e tipo de visualização para gerar gráficos
          personalizados.
        </PageSubtitle>
      </PageHeader>

      <ContentContainer>
        {/* Modal de Seleção de Período */}
        <PeriodSelectionModal
          isOpen={showPeriodModal}
          onClose={() => setShowPeriodModal(false)}
          onConfirm={handlePeriodConfirm}
          initialStartDate={chartFilters.startDate}
          initialEndDate={chartFilters.endDate}
          estacoesCount={1} // Sempre uma estação
          parametersCount={chartFilters.parameters?.length || 0}
          estacoes={chartFilters.estacao ? [chartFilters.estacao] : []}
        />

        {/* Seção de Filtros */}
        <FiltersSection>
          <SimaChartFilters
            filters={chartFilters}
            onFiltersChange={(newFilters) => {
              setChartFilters(newFilters);
              setChartDataLoaded(false);
            }}
            onApply={handleApplyFilters}
            loading={loading}
          />
        </FiltersSection>

        {/* Seção de Gráficos */}
        <ChartsSection>
          {!chartDataLoaded ? (
            <EmptyState>
              <EmptyStateIcon>
                <TrendingUp size={48} color="#3b82f6" />
              </EmptyStateIcon>
              <EmptyStateTitle>Configure os Filtros</EmptyStateTitle>
              <EmptyStateText>
                Selecione os parâmetros, período e tipo de gráfico desejado, depois clique em
                "Aplicar Filtros" para visualizar os dados em formato gráfico.
              </EmptyStateText>
            </EmptyState>
          ) : error ? (
            <EmptyState>
              <EmptyStateIcon>
                <BarChart3 size={48} color="#ef4444" />
              </EmptyStateIcon>
              <EmptyStateTitle>Erro ao Carregar Dados</EmptyStateTitle>
              <EmptyStateText>{error}</EmptyStateText>
            </EmptyState>
          ) : (
            <>
              {chartData.length === 0 && chartDataLoaded && !loading && (
                <EmptyState>
                  <EmptyStateIcon>
                    <BarChart3 size={48} color="#f59e0b" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Nenhum Dado Disponível</EmptyStateTitle>
                  <EmptyStateText>
                    Não foram encontrados dados para os filtros selecionados. Verifique se:
                    <br />
                    • As estações selecionadas possuem dados no período escolhido
                    <br />
                    • Os parâmetros selecionados existem nos dados das estações
                    <br />• O período de datas está correto
                  </EmptyStateText>
                </EmptyState>
              )}

              {chartData.length > 0 && chartFilters.chartType === "line" && (
                <ChartWrapper>
                  <TimeSeriesLineChart
                    data={chartData as TimeSeriesDataPoint[]}
                    parameters={chartFilters.parameters}
                    title="Séries Temporais"
                    large
                    id={getChartId()}
                    initialStartDate={chartFilters.startDate}
                    initialEndDate={chartFilters.endDate}
                    onDateRangeChange={(startDate, endDate) => {
                      setChartFilters({ ...chartFilters, startDate, endDate });
                    }}
                    exportButtons={
                      <button
                        onClick={handleExportChartCsv}
                        disabled={!chartDataLoaded || chartData.length === 0}
                        style={{
                          padding: "0.875rem 2rem",
                          borderRadius: "10px",
                          fontSize: "0.9375rem",
                          fontWeight: 600,
                          border: "none",
                          cursor:
                            chartDataLoaded && chartData.length > 0 ? "pointer" : "not-allowed",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "white",
                          opacity: chartDataLoaded && chartData.length > 0 ? 1 : 0.5,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <FileDown size={18} />
                        Exportar Dados (CSV)
                      </button>
                    }
                  />
                </ChartWrapper>
              )}

              {chartData.length > 0 &&
                chartFilters.chartType === "scatter" &&
                chartFilters.xAxisParam &&
                chartFilters.yAxisParam && (
                  <ChartWrapper>
                    <ScatterChart
                      data={chartData as ScatterDataPoint[]}
                      xAxisParam={chartFilters.xAxisParam}
                      yAxisParam={chartFilters.yAxisParam}
                      title="Gráfico de Dispersão"
                      large
                      id={getChartId()}
                    />
                  </ChartWrapper>
                )}

              {/* Seção de Exportação para outros tipos de gráfico */}
              {chartDataLoaded && chartData.length > 0 && chartFilters.chartType !== "line" && (
                <ExportSection>
                  <ExportButtonsContainer>
                    <button
                      onClick={handleExportChartCsv}
                      disabled={!chartDataLoaded || chartData.length === 0}
                      style={{
                        padding: "0.875rem 2rem",
                        borderRadius: "10px",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        border: "none",
                        cursor: chartDataLoaded && chartData.length > 0 ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        color: "white",
                        opacity: chartDataLoaded && chartData.length > 0 ? 1 : 0.5,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <FileDown size={18} />
                      Exportar Dados (CSV)
                    </button>
                  </ExportButtonsContainer>
                </ExportSection>
              )}

              {chartFilters.parameters.length === 0 && (
                <EmptyState>
                  <EmptyStateIcon>
                    <BarChart3 size={48} color="#94a3b8" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Nenhum Parâmetro Selecionado</EmptyStateTitle>
                  <EmptyStateText>
                    Por favor, selecione pelo menos um parâmetro para visualizar os dados.
                  </EmptyStateText>
                </EmptyState>
              )}
            </>
          )}
        </ChartsSection>
      </ContentContainer>
    </PageContainer>
  );
}

export default SimaGraficosPage;
