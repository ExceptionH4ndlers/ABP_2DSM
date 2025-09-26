import styled from "styled-components";
import { Waves, Settings, Database } from "lucide-react";

// --- Styled Components ---

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
    max-width: 100%;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 1rem;
    margin-top: 1rem;
    padding: 0;
  }
`;

const FullWidthSection = styled.div`
  grid-column: 1 / -1;
`;

const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: center;
  margin: 0 0 3rem;
  font-size: 1.125rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
    margin: 0 0 2rem;
  }
`;

const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.colors.card.shadow};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  backdrop-filter: blur(10px);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(30, 64, 175, 0.1);
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  line-height: 1.7;
  text-align: justify;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.base};
    font-weight: 600;
  }
`;

// textos de fonte removidos da home

function DashboardPage() {
  return (
    <DashboardContainer>
      <MainContent>
        <PageTitle>Bem-vindo ao SIMA</PageTitle>
        <PageSubtitle>
          Portal de acesso aos dados de monitoramento hidrosférico em tempo real
        </PageSubtitle>

        <ContentGrid>
          <FullWidthSection>
            <InfoSection>
              <SectionHeader>
                <SectionIcon>
                  <Waves size={24} />
                </SectionIcon>
                <InfoTitle>Sobre o SIMA</InfoTitle>
              </SectionHeader>
              <InfoText>
                O SIMA (Sistema Integrado de Monitoramento Ambiental) é um sistema de hardware e
                software desenvolvido para coleta e monitoramento em tempo real de processos
                hidrosféricos. O sistema utiliza uma plataforma autônoma ancorada equipada com
                sensores, eletrônica de armazenamento, bateria e antena de transmissão. Os dados são
                coletados em intervalos pré-programados, transmitidos via satélite e também
                armazenados na estação de coleta (com maior frequência para os dados armazenados). O
                sistema inclui um portal para acessar dados transmitidos por satélite em algumas
                horas após a coleta. A combinação desses componentes fornece uma ferramenta poderosa
                para gestão ambiental e controle de recursos hídricos.
              </InfoText>
            </InfoSection>
          </FullWidthSection>

          <InfoSection>
            <SectionHeader>
              <SectionIcon>
                <Settings size={24} />
              </SectionIcon>
              <InfoTitle>Estrutura do SIMA</InfoTitle>
            </SectionHeader>
            <InfoText>
              O SIMA é formado por uma plataforma, que em alguns modelos pode ser uma "bóia
              toroidal" ou uma estrutura maior. Esta plataforma serve como base para os equipamentos
              de monitoramento e coleta de dados ambientais.
            </InfoText>
            <InfoText>
              A escolha do tipo de plataforma depende das condições específicas do ambiente aquático
              onde será instalada, considerando fatores como profundidade, correntes marinhas e
              objetivos da pesquisa.
            </InfoText>
          </InfoSection>

          <InfoSection>
            <SectionHeader>
              <SectionIcon>
                <Database size={24} />
              </SectionIcon>
              <InfoTitle>Modo de Funcionamento</InfoTitle>
            </SectionHeader>
            <InfoText>
              <strong>Coleta e transmissão dos dados:</strong> Os circuitos analógicos e digitais
              são responsáveis por controlar os sensores, as variáveis de engenharia e ativar o
              transmissor satelital.
            </InfoText>
            <InfoText>
              <strong>Amostragem:</strong> Um novo conjunto completo de dados é armazenado em um
              buffer de memória a cada hora completa. Após o preenchimento de oito buffers, o
              conjunto de dados mais antigo é descartado.
            </InfoText>
          </InfoSection>
        </ContentGrid>
      </MainContent>
    </DashboardContainer>
  );
}

export default DashboardPage;
