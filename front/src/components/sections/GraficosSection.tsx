import styled from "styled-components";
import { TrendingUp, BarChart3, LineChart, Activity, Clock, Zap } from "lucide-react";

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  position: relative;

  ${({ theme }) => theme.media.mobile} {
    padding: 4rem 1rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ef4444, #dc2626);
    border-radius: 2px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.1rem;
  }
`;

const ChartsContainer = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #fee2e2;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 2rem 1rem;
    border-radius: 20px;
  }
`;

const ChartPlaceholder = styled.div`
  height: 400px;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ef4444;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M10,90 L20,70 L30,80 L40,50 L50,60 L60,30 L70,40 L80,20 L90,10" stroke="rgba(239,68,68,0.3)" stroke-width="2" fill="none"/></svg>');
    opacity: 0.5;
  }
`;

const ChartContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
`;

const ChartIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.5rem;
`;

const ChartDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

const ChartTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ChartTypeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #fee2e2;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(239, 68, 68, 0.15);
  }
`;

const ChartTypeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ChartTypeIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ChartTypeTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #dc2626;
  margin: 0;
`;

const ChartTypeDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`;

const ParametersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const ParameterCard = styled.div`
  background: #fef2f2;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #fee2e2;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #fee2e2;
  }
`;

const ParameterIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const ParameterName = styled.div`
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.5rem;
`;

const ParameterUnit = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #fee2e2;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  color: #374151;
  font-weight: 500;
`;

function GraficosSection() {
  return (
    <SectionContainer id="graficos">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Gráficos Temporais</SectionTitle>
          <SectionSubtitle>
            Visualize séries temporais dos parâmetros monitorados pelo SIMA
          </SectionSubtitle>
        </SectionHeader>

        <ChartsContainer>
          <ChartPlaceholder>
            <ChartContent>
              <ChartIcon>
                <TrendingUp size={40} />
              </ChartIcon>
              <ChartTitle>Gráficos Interativos</ChartTitle>
              <ChartDescription>
                Séries temporais dos parâmetros limnológicos coletados pelo SIMA
              </ChartDescription>
            </ChartContent>
          </ChartPlaceholder>

          <ChartTypesGrid>
            <ChartTypeCard>
              <ChartTypeHeader>
                <ChartTypeIcon>
                  <LineChart size={24} />
                </ChartTypeIcon>
                <ChartTypeTitle>Gráficos de Linha</ChartTypeTitle>
              </ChartTypeHeader>
              <ChartTypeDescription>
                Visualize a evolução temporal dos parâmetros com gráficos de linha interativos que
                permitem zoom e seleção de períodos específicos.
              </ChartTypeDescription>
            </ChartTypeCard>

            <ChartTypeCard>
              <ChartTypeHeader>
                <ChartTypeIcon>
                  <BarChart3 size={24} />
                </ChartTypeIcon>
                <ChartTypeTitle>Gráficos de Barras</ChartTypeTitle>
              </ChartTypeHeader>
              <ChartTypeDescription>
                Compare valores médios, máximos e mínimos dos parâmetros em diferentes períodos com
                gráficos de barras comparativos.
              </ChartTypeDescription>
            </ChartTypeCard>

            <ChartTypeCard>
              <ChartTypeHeader>
                <ChartTypeIcon>
                  <Activity size={24} />
                </ChartTypeIcon>
                <ChartTypeTitle>Análise de Tendências</ChartTypeTitle>
              </ChartTypeHeader>
              <ChartTypeDescription>
                Identifique padrões e tendências nos dados com análises estatísticas e correlações
                entre diferentes parâmetros.
              </ChartTypeDescription>
            </ChartTypeCard>
          </ChartTypesGrid>

          <div style={{ marginTop: "3rem" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#dc2626",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Parâmetros Disponíveis
            </h3>
            <ParametersGrid>
              <ParameterCard>
                <ParameterIcon>
                  <Activity size={24} />
                </ParameterIcon>
                <ParameterName>Temperatura</ParameterName>
                <ParameterUnit>°C</ParameterUnit>
              </ParameterCard>

              <ParameterCard>
                <ParameterIcon>
                  <Activity size={24} />
                </ParameterIcon>
                <ParameterName>pH</ParameterName>
                <ParameterUnit>unidade</ParameterUnit>
              </ParameterCard>

              <ParameterCard>
                <ParameterIcon>
                  <Activity size={24} />
                </ParameterIcon>
                <ParameterName>Turbidez</ParameterName>
                <ParameterUnit>NTU</ParameterUnit>
              </ParameterCard>

              <ParameterCard>
                <ParameterIcon>
                  <Activity size={24} />
                </ParameterIcon>
                <ParameterName>Oxigênio Dissolvido</ParameterName>
                <ParameterUnit>mg/L</ParameterUnit>
              </ParameterCard>

              <ParameterCard>
                <ParameterIcon>
                  <Activity size={24} />
                </ParameterIcon>
                <ParameterName>CO₂ Dissolvido</ParameterName>
                <ParameterUnit>mg/L</ParameterUnit>
              </ParameterCard>

              <ParameterCard>
                <ParameterIcon>
                  <Activity size={24} />
                </ParameterIcon>
                <ParameterName>Condutividade</ParameterName>
                <ParameterUnit>μS/cm</ParameterUnit>
              </ParameterCard>
            </ParametersGrid>
          </div>

          <FeaturesList>
            <FeatureItem>
              <FeatureIcon>
                <Clock size={20} />
              </FeatureIcon>
              <FeatureText>Dados em tempo real atualizados a cada hora</FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon>
                <Zap size={20} />
              </FeatureIcon>
              <FeatureText>Zoom e pan para análise detalhada</FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon>
                <TrendingUp size={20} />
              </FeatureIcon>
              <FeatureText>Comparação de múltiplos parâmetros</FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon>
                <Activity size={20} />
              </FeatureIcon>
              <FeatureText>Exportação de gráficos em alta resolução</FeatureText>
            </FeatureItem>
          </FeaturesList>
        </ChartsContainer>
      </SectionContent>
    </SectionContainer>
  );
}

export default GraficosSection;
