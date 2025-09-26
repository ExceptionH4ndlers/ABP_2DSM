import styled from "styled-components";
import { Waves, Settings, Database, Clock, Satellite, Activity } from "lucide-react";

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: white;
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
  color: #1e40af;
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
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 2rem;
    margin-bottom: 3rem;
  }
`;

const TextContent = styled.div``;

const Description = styled.p`
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  color: #374151;
  font-weight: 500;
`;

const VisualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SystemDiagram = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(59,130,246,0.1)"/></svg>');
    opacity: 0.5;
  }
`;

const DiagramTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DiagramSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DiagramStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const StepText = styled.span`
  color: #374151;
  font-weight: 500;
`;

const ParametersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const ParameterCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.15);
  }
`;

const ParameterIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const ParameterName = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const ParameterValue = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

function SimaSection() {
  return (
    <SectionContainer id="sima">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Sistema Integrado de Monitoramento Ambiental</SectionTitle>
          <SectionSubtitle>
            Monitoramento em tempo real de processos hidrosféricos através de plataformas autônomas
          </SectionSubtitle>
        </SectionHeader>

        <ContentGrid>
          <TextContent>
            <Description>
              O SIMA é um sistema de hardware e software desenvolvido para coleta e monitoramento em
              tempo real de processos hidrosféricos. Utiliza uma plataforma autônoma ancorada
              equipada com sensores, eletrônica de armazenamento, bateria e antena de transmissão.
            </Description>

            <FeaturesList>
              <FeatureItem>
                <FeatureIcon>
                  <Clock size={20} />
                </FeatureIcon>
                <FeatureText>Coleta contínua de dados em intervalos pré-programados</FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>
                  <Satellite size={20} />
                </FeatureIcon>
                <FeatureText>Transmissão via satélite em algumas horas após coleta</FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>
                  <Database size={20} />
                </FeatureIcon>
                <FeatureText>Armazenamento local com maior frequência de dados</FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>
                  <Activity size={20} />
                </FeatureIcon>
                <FeatureText>Portal web para acesso aos dados transmitidos</FeatureText>
              </FeatureItem>
            </FeaturesList>
          </TextContent>

          <VisualContent>
            <SystemDiagram>
              <DiagramTitle>Fluxo de Funcionamento</DiagramTitle>
              <DiagramSteps>
                <DiagramStep>
                  <StepNumber>1</StepNumber>
                  <StepText>Coleta de dados pelos sensores</StepText>
                </DiagramStep>
                <DiagramStep>
                  <StepNumber>2</StepNumber>
                  <StepText>Armazenamento em buffer de memória</StepText>
                </DiagramStep>
                <DiagramStep>
                  <StepNumber>3</StepNumber>
                  <StepText>Transmissão via satélite</StepText>
                </DiagramStep>
                <DiagramStep>
                  <StepNumber>4</StepNumber>
                  <StepText>Disponibilização no portal web</StepText>
                </DiagramStep>
              </DiagramSteps>
            </SystemDiagram>

            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#1e40af",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                Parâmetros Monitorados
              </h3>
              <ParametersGrid>
                <ParameterCard>
                  <ParameterIcon>
                    <Waves size={24} />
                  </ParameterIcon>
                  <ParameterName>Temperatura</ParameterName>
                  <ParameterValue>°C</ParameterValue>
                </ParameterCard>

                <ParameterCard>
                  <ParameterIcon>
                    <Settings size={24} />
                  </ParameterIcon>
                  <ParameterName>pH</ParameterName>
                  <ParameterValue>unidade</ParameterValue>
                </ParameterCard>

                <ParameterCard>
                  <ParameterIcon>
                    <Activity size={24} />
                  </ParameterIcon>
                  <ParameterName>Turbidez</ParameterName>
                  <ParameterValue>NTU</ParameterValue>
                </ParameterCard>

                <ParameterCard>
                  <ParameterIcon>
                    <Database size={24} />
                  </ParameterIcon>
                  <ParameterName>Oxigênio</ParameterName>
                  <ParameterValue>mg/L</ParameterValue>
                </ParameterCard>
              </ParametersGrid>
            </div>
          </VisualContent>
        </ContentGrid>
      </SectionContent>
    </SectionContainer>
  );
}

export default SimaSection;
