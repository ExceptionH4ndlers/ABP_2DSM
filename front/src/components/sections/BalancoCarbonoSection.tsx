import styled from "styled-components";
import { Leaf, Factory, Users, Target, BookOpen, MapPin, TrendingUp, Map } from "lucide-react";

const SectionContainer = styled.section`
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  position: relative;

  ${({ theme }) => theme.media.sm} {
    padding: 5rem 1.5rem;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 6rem 2rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.sm} {
    margin-bottom: 3.5rem;
  }

  ${({ theme }) => theme.media.lg} {
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #0f766e;
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
    background: linear-gradient(90deg, #0d9488, #14b8a6);
    border-radius: 2px;
  }

  ${({ theme }) => theme.media.sm} {
    font-size: 2.6rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  ${({ theme }) => theme.media.sm} {
    font-size: 1.1rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 1.2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  ${({ theme }) => theme.media.lg} {
    gap: 4rem;
    margin-bottom: 4rem;
  }
`;

const TextContent = styled.div``;

const Description = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 2rem;

  ${({ theme }) => theme.media.lg} {
    font-size: 1.1rem;
  }
`;

const ObjectivesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ObjectiveItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 1.25rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(15, 118, 110, 0.1);
  border-left: 4px solid #0d9488;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(15, 118, 110, 0.15);
  }
`;

const ObjectiveIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ObjectiveContent = styled.div``;

const ObjectiveTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f766e;
  margin-bottom: 0.5rem;
`;

const ObjectiveText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

const VisualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${({ theme }) => theme.media.lg} {
    gap: 2rem;
  }
`;

const ProjectInfo = styled.div`
  background: white;
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 8px 40px rgba(15, 118, 110, 0.1);
  border: 1px solid #e0f2fe;

  ${({ theme }) => theme.media.lg} {
    border-radius: 20px;
    padding: 2rem;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f766e;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 12px;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  color: #374151;
  font-weight: 500;
`;

const GasesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GasCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(15, 118, 110, 0.1);
  border: 2px solid #e0f2fe;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(15, 118, 110, 0.15);
    border-color: #0d9488;
  }
`;

const GasIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const GasName = styled.div`
  font-weight: 600;
  color: #0f766e;
  margin-bottom: 0.5rem;
`;

const GasFormula = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-family: monospace;
`;

function BalancoCarbonoSection() {
  return (
    <SectionContainer id="balanco-carbono">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Balanço de Carbono nos Reservatórios de Furnas</SectionTitle>
          <SectionSubtitle>
            Projeto desenvolvido pelo INPE em cooperação com UFRJ, UFJF e IIE para determinação de
            emissões de gases de efeito estufa nos reservatórios das hidrelétricas de Furnas
            Centrais Elétricas S.A.
          </SectionSubtitle>
        </SectionHeader>

        <ContentGrid>
          <TextContent>
            <Description>
              Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono
              nos Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por
              coletas in situ de equipes que tinham como objetivo obter dados para determinar as
              emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos
              reservatórios das hidrelétricas, identificar as rotas do ciclo do carbono nesses
              reservatórios e os fatores ambientais envolvidos.
            </Description>

            <ObjectivesList>
              <ObjectiveItem>
                <ObjectiveIcon>
                  <Target size={24} />
                </ObjectiveIcon>
                <ObjectiveContent>
                  <ObjectiveTitle>Determinação de Emissões</ObjectiveTitle>
                  <ObjectiveText>
                    Determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido
                    nitroso, dos reservatórios das hidrelétricas
                  </ObjectiveText>
                </ObjectiveContent>
              </ObjectiveItem>

              <ObjectiveItem>
                <ObjectiveIcon>
                  <Leaf size={24} />
                </ObjectiveIcon>
                <ObjectiveContent>
                  <ObjectiveTitle>Ciclo do Carbono</ObjectiveTitle>
                  <ObjectiveText>
                    Identificar as rotas do ciclo do carbono nesses reservatórios e os fatores
                    ambientais envolvidos
                  </ObjectiveText>
                </ObjectiveContent>
              </ObjectiveItem>

              <ObjectiveItem>
                <ObjectiveIcon>
                  <Factory size={24} />
                </ObjectiveIcon>
                <ObjectiveContent>
                  <ObjectiveTitle>Avaliação de Fatores</ObjectiveTitle>
                  <ObjectiveText>
                    Avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e
                    operacionais dos reservatórios na emissão de gases de efeito estufa
                  </ObjectiveText>
                </ObjectiveContent>
              </ObjectiveItem>

              <ObjectiveItem>
                <ObjectiveIcon>
                  <TrendingUp size={24} />
                </ObjectiveIcon>
                <ObjectiveContent>
                  <ObjectiveTitle>Padrão de Emissão</ObjectiveTitle>
                  <ObjectiveText>
                    Determinar o padrão de emissão existente, anteriormente à construção de
                    reservatórios
                  </ObjectiveText>
                </ObjectiveContent>
              </ObjectiveItem>

              <ObjectiveItem>
                <ObjectiveIcon>
                  <Map size={24} />
                </ObjectiveIcon>
                <ObjectiveContent>
                  <ObjectiveTitle>Modelo Espacial</ObjectiveTitle>
                  <ObjectiveText>
                    Elaborar um modelo espacial e temporal de emissão de gases para reservatórios
                    implantados em ambientes de cerrado
                  </ObjectiveText>
                </ObjectiveContent>
              </ObjectiveItem>
            </ObjectivesList>
          </TextContent>

          <VisualContent>
            <ProjectInfo>
              <InfoTitle>Informações do Projeto</InfoTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoIcon>
                    <Users size={20} />
                  </InfoIcon>
                  <InfoText>Participantes: FURNAS, IIE, INPE, UFJF, UFRJ/COPPE</InfoText>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <MapPin size={20} />
                  </InfoIcon>
                  <InfoText>79 campanhas em reservatórios de Furnas</InfoText>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <BookOpen size={20} />
                  </InfoIcon>
                  <InfoText>Interface água-sedimento, coluna d'água e água-atmosfera</InfoText>
                </InfoItem>
              </InfoGrid>
            </ProjectInfo>

            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#0f766e",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                Gases de Efeito Estufa Monitorados
              </h3>
              <GasesGrid>
                <GasCard>
                  <GasIcon>
                    <Leaf size={24} />
                  </GasIcon>
                  <GasName>Dióxido de Carbono</GasName>
                  <GasFormula>CO₂</GasFormula>
                </GasCard>

                <GasCard>
                  <GasIcon>
                    <Factory size={24} />
                  </GasIcon>
                  <GasName>Metano</GasName>
                  <GasFormula>CH₄</GasFormula>
                </GasCard>

                <GasCard>
                  <GasIcon>
                    <Target size={24} />
                  </GasIcon>
                  <GasName>Óxido Nitroso</GasName>
                  <GasFormula>N₂O</GasFormula>
                </GasCard>
              </GasesGrid>
            </div>
          </VisualContent>
        </ContentGrid>
      </SectionContent>
    </SectionContainer>
  );
}

export default BalancoCarbonoSection;
