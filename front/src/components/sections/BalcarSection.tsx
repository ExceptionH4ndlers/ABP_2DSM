import styled from "styled-components";
import { Wind, Droplets, Thermometer, BarChart3, Globe, Zap } from "lucide-react";

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
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
  color: #d97706;
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
    background: linear-gradient(90deg, #f59e0b, #eab308);
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

const FocusAreasList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FocusAreaItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(217, 119, 6, 0.1);
  border-left: 4px solid #f59e0b;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(217, 119, 6, 0.15);
  }
`;

const FocusAreaIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f59e0b, #eab308);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FocusAreaContent = styled.div``;

const FocusAreaTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #d97706;
  margin-bottom: 0.5rem;
`;

const FocusAreaText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

const VisualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProjectScope = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 40px rgba(217, 119, 6, 0.1);
  border: 1px solid #fde68a;
`;

const ScopeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #d97706;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ScopeGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ScopeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fef3c7;
  border-radius: 12px;
`;

const ScopeIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f59e0b, #eab308);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ScopeText = styled.div`
  color: #374151;
  font-weight: 500;
`;

const ParametersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ParameterCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(217, 119, 6, 0.1);
  border: 2px solid #fde68a;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(217, 119, 6, 0.15);
    border-color: #f59e0b;
  }
`;

const ParameterIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f59e0b, #eab308);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const ParameterName = styled.div`
  font-weight: 600;
  color: #d97706;
  margin-bottom: 0.5rem;
`;

const ParameterDescription = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.4;
`;

function BalcarSection() {
  return (
    <SectionContainer id="balcar">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Projeto BALCAR</SectionTitle>
          <SectionSubtitle>
            Emissões de Gases de Efeito Estufa em Reservatórios de Centrais Hidrelétricas
          </SectionSubtitle>
        </SectionHeader>

        <ContentGrid>
          <TextContent>
            <Description>
              O Projeto BALCAR concentra-se na coleta de dados limnológicos e meteorológicos para
              subsidiar estudos sobre o balanço de carbono nos reservatórios de Furnas. Os dados
              coletados incluem parâmetros na interface água-sedimento, coluna d'água e interface
              água-atmosfera, com o objetivo de determinar as emissões de GEE e entender os
              processos envolvidos no ciclo do carbono nesses ambientes.
            </Description>

            <FocusAreasList>
              <FocusAreaItem>
                <FocusAreaIcon>
                  <Droplets size={24} />
                </FocusAreaIcon>
                <FocusAreaContent>
                  <FocusAreaTitle>Interface Água-Sedimento</FocusAreaTitle>
                  <FocusAreaText>
                    Monitoramento dos processos de troca entre a coluna d'água e os sedimentos do
                    fundo
                  </FocusAreaText>
                </FocusAreaContent>
              </FocusAreaItem>

              <FocusAreaItem>
                <FocusAreaIcon>
                  <Wind size={24} />
                </FocusAreaIcon>
                <FocusAreaContent>
                  <FocusAreaTitle>Coluna d'Água</FocusAreaTitle>
                  <FocusAreaText>
                    Análise vertical dos parâmetros físicos, químicos e biológicos da água
                  </FocusAreaText>
                </FocusAreaContent>
              </FocusAreaItem>

              <FocusAreaItem>
                <FocusAreaIcon>
                  <Globe size={24} />
                </FocusAreaIcon>
                <FocusAreaContent>
                  <FocusAreaTitle>Interface Água-Atmosfera</FocusAreaTitle>
                  <FocusAreaText>
                    Medição das trocas gasosas entre o reservatório e a atmosfera
                  </FocusAreaText>
                </FocusAreaContent>
              </FocusAreaItem>
            </FocusAreasList>
          </TextContent>

          <VisualContent>
            <ProjectScope>
              <ScopeTitle>Escopo do Projeto</ScopeTitle>
              <ScopeGrid>
                <ScopeItem>
                  <ScopeIcon>
                    <BarChart3 size={20} />
                  </ScopeIcon>
                  <ScopeText>Dados limnológicos e meteorológicos</ScopeText>
                </ScopeItem>

                <ScopeItem>
                  <ScopeIcon>
                    <Thermometer size={20} />
                  </ScopeIcon>
                  <ScopeText>Parâmetros físicos e químicos</ScopeText>
                </ScopeItem>

                <ScopeItem>
                  <ScopeIcon>
                    <Zap size={20} />
                  </ScopeIcon>
                  <ScopeText>Processos do ciclo do carbono</ScopeText>
                </ScopeItem>
              </ScopeGrid>
            </ProjectScope>

            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#d97706",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                Principais Parâmetros
              </h3>
              <ParametersGrid>
                <ParameterCard>
                  <ParameterIcon>
                    <Droplets size={24} />
                  </ParameterIcon>
                  <ParameterName>Parâmetros Limnológicos</ParameterName>
                  <ParameterDescription>
                    Temperatura, pH, oxigênio dissolvido, nutrientes e matéria orgânica
                  </ParameterDescription>
                </ParameterCard>

                <ParameterCard>
                  <ParameterIcon>
                    <Wind size={24} />
                  </ParameterIcon>
                  <ParameterName>Parâmetros Meteorológicos</ParameterName>
                  <ParameterDescription>
                    Temperatura do ar, umidade, velocidade do vento e precipitação
                  </ParameterDescription>
                </ParameterCard>

                <ParameterCard>
                  <ParameterIcon>
                    <BarChart3 size={24} />
                  </ParameterIcon>
                  <ParameterName>Gases de Efeito Estufa</ParameterName>
                  <ParameterDescription>
                    Concentrações de CO₂, CH₄ e N₂O na água e sedimentos
                  </ParameterDescription>
                </ParameterCard>

                <ParameterCard>
                  <ParameterIcon>
                    <Thermometer size={24} />
                  </ParameterIcon>
                  <ParameterName>Fluxos Gasosos</ParameterName>
                  <ParameterDescription>
                    Medição dos fluxos de gases entre água, sedimento e atmosfera
                  </ParameterDescription>
                </ParameterCard>
              </ParametersGrid>
            </div>
          </VisualContent>
        </ContentGrid>
      </SectionContent>
    </SectionContainer>
  );
}

export default BalcarSection;
