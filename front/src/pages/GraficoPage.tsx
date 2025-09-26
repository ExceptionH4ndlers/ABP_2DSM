import styled from "styled-components";
import { Droplets, Thermometer } from "lucide-react";
import DonutChart from "../components/charts/DonutChart";
import BarChart from "../components/charts/BarChart";

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
    max-width: 100%;
  }
`;

const PageTitle = styled.h2`
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.75rem;
  }
`;

const PageSubtitle = styled.p`
  color: #475569;
  text-align: center;
  margin: 0 0 1.5rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.9rem;
    margin: 0 0 1rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0;
  }
`;

const ChartPanel = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.colors.card.shadow};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  backdrop-filter: blur(10px);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(30, 64, 175, 0.2);
    border-color: rgba(30, 64, 175, 0.25);
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 1.5rem;
    border-radius: 16px;
    margin: 0;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const ChartIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(30, 64, 175, 0.1);
  color: ${({ theme }) => theme.colors.primary};
`;

const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const SourceText = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 1rem;
  text-align: center;
`;

function GraficoPage() {
  // Dados mock para os gráficos
  const temperaturaData = [
    { label: "Jan", value: 22.5, color: "#1e40af" },
    { label: "Fev", value: 23.1, color: "#1e40af" },
    { label: "Mar", value: 24.3, color: "#1e40af" },
    { label: "Abr", value: 25.8, color: "#1e40af" },
    { label: "Mai", value: 26.2, color: "#1e40af" },
    { label: "Jun", value: 25.9, color: "#1e40af" },
  ];

  const precipitacaoData = [
    { label: "Jan", value: 180, color: "#3b82f6" },
    { label: "Fev", value: 220, color: "#3b82f6" },
    { label: "Mar", value: 195, color: "#3b82f6" },
    { label: "Abr", value: 165, color: "#3b82f6" },
    { label: "Mai", value: 140, color: "#3b82f6" },
    { label: "Jun", value: 120, color: "#3b82f6" },
  ];

  const qualidadeAguaData = [
    { label: "Excelente", value: 35, color: "#10b981" },
    { label: "Boa", value: 45, color: "#3b82f6" },
    { label: "Regular", value: 15, color: "#f59e0b" },
    { label: "Ruim", value: 5, color: "#ef4444" },
  ];

  const distribuicaoAguaData = [
    { label: "Água Salgada", value: 97.5, color: "#1e40af" },
    { label: "Água Doce", value: 2.5, color: "#3b82f6" },
  ];

  return (
    <PageContainer>
      <MainContent>
        <PageTitle>Gráficos de Monitoramento</PageTitle>
        <PageSubtitle>
          Visualizações para análise dos dados ambientais coletados pelo SIMA
        </PageSubtitle>

        {/* Gráficos de barras */}
        <ChartsGrid>
          <ChartPanel>
            <ChartHeader>
              <ChartIcon>
                <Thermometer size={20} />
              </ChartIcon>
              <ChartTitle>Temperatura da Água por Mês</ChartTitle>
            </ChartHeader>
            <ChartContainer style={{ height: 350 }}>
              <BarChart data={temperaturaData} height={300} showValues={true} />
            </ChartContainer>
            <SourceText>Temperatura média mensal (°C) - Estação SIMA 001</SourceText>
          </ChartPanel>

          <ChartPanel>
            <ChartHeader>
              <ChartIcon>
                <Droplets size={20} />
              </ChartIcon>
              <ChartTitle>Precipitação Mensal</ChartTitle>
            </ChartHeader>
            <ChartContainer style={{ height: 350 }}>
              <BarChart data={precipitacaoData} height={300} showValues={true} />
            </ChartContainer>
            <SourceText>Precipitação acumulada mensal (mm) - Estação SIMA 001</SourceText>
          </ChartPanel>
        </ChartsGrid>

        {/* Gráficos de donut */}
        <ChartsGrid>
          <ChartPanel>
            <ChartHeader>
              <ChartIcon>
                <Droplets size={20} />
              </ChartIcon>
              <ChartTitle>Qualidade da Água</ChartTitle>
            </ChartHeader>
            <ChartContainer style={{ height: 380 }}>
              <DonutChart
                segments={qualidadeAguaData}
                size={280}
                thickness={25}
                centerLabel="Boa 45%"
                showLegend={true}
              />
            </ChartContainer>
            <SourceText>
              Classificação da qualidade da água baseada em parâmetros físico-químicos
            </SourceText>
          </ChartPanel>

          <ChartPanel>
            <ChartHeader>
              <ChartIcon>
                <Droplets size={20} />
              </ChartIcon>
              <ChartTitle>Distribuição de Água no Planeta</ChartTitle>
            </ChartHeader>
            <ChartContainer style={{ height: 380 }}>
              <DonutChart
                segments={distribuicaoAguaData}
                size={280}
                thickness={25}
                centerLabel="97.5% Salgada"
                showLegend={true}
              />
            </ChartContainer>
            <SourceText>Distribuição global de água salgada vs água doce</SourceText>
          </ChartPanel>
        </ChartsGrid>
      </MainContent>
    </PageContainer>
  );
}

export default GraficoPage;
