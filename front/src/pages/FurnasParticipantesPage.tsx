import { useState } from "react";
import styled, { css } from "styled-components";
import { Users } from "lucide-react";
import FurnasSidebar from "../components/FurnasSidebar";

const FurnasParticipantesContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.lg} {
    flex-direction: row;
  }
`;

const MainContent = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  margin-left: 0;
  padding: 1.5rem 1rem;
  max-width: 100%;
  overflow-x: hidden;
  transition:
    margin-left 0.3s ease,
    max-width 0.3s ease;

  ${({ theme }) => theme.media.sm} {
    padding: 2rem;
  }

  ${({ theme, $collapsed }) => css`
    ${theme.media.lg} {
      margin-left: ${$collapsed ? "80px" : "240px"};
      max-width: ${$collapsed ? "calc(100vw - 80px)" : "calc(100vw - 240px)"};
    }

    ${theme.media.xl} {
      margin-left: ${$collapsed ? "80px" : "280px"};
      max-width: ${$collapsed ? "calc(100vw - 80px)" : "calc(100vw - 280px)"};
    }
  `}
`;

const Section = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.75rem 1.25rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);

  ${({ theme }) => theme.media.sm} {
    border-radius: 18px;
    padding: 2.25rem;
  }

  ${({ theme }) => theme.media.lg} {
    border-radius: 20px;
    padding: 3rem;
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.sm} {
    font-size: 2.25rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;

  ${({ theme }) => theme.media.sm} {
    font-size: 1.1rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const ParticipantItem = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 0.75rem;

  ${({ theme }) => theme.media.md} {
    display: flex;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const ParticipantContent = styled.div`
  flex: 1;
`;

const ParticipantName = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.5rem;
  line-height: 1.4;

  ${({ theme }) => theme.media.lg} {
    font-size: 1.3rem;
  }
`;

const ParticipantDescription = styled.p`
  font-size: 1rem;
  color: #000000;
  line-height: 1.7;
  margin: 0;

  ${({ theme }) => theme.media.lg} {
    font-size: 1.1rem;
  }
`;

const StyledLink = styled.a`
  color: #196d95;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    color: #0f4c6b;
  }
`;

function FurnasParticipantesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <FurnasParticipantesContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="participantes"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        {/* Seção Participantes */}
        <Section>
          <SectionTitle>
            <Users size={40} />
            Participantes
          </SectionTitle>
          <SectionSubtitle>
            Instituições parceiras e suas responsabilidades no projeto Balanço de Carbono
          </SectionSubtitle>

          <ParticipantItem>
            <ParticipantContent>
              <ParticipantName>
                <StyledLink
                  href="https://www.furnas.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FURNAS Centrais Elétricas S.A.
                </StyledLink>
              </ParticipantName>
              <ParticipantDescription>Coordenação do projeto.</ParticipantDescription>
            </ParticipantContent>
          </ParticipantItem>

          <ParticipantItem>
            <ParticipantContent>
              <ParticipantName>
                <StyledLink href="https://coppe.ufrj.br/" target="_blank" rel="noopener noreferrer">
                  Universidade Federal do Rio de Janeiro - COPPE
                </StyledLink>
              </ParticipantName>
              <ParticipantDescription>
                Estimativa de fluxos de GHG (gases de efeito estufa, CO2, CH4 e N2) na interface
                água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.
              </ParticipantDescription>
            </ParticipantContent>
          </ParticipantItem>

          <ParticipantItem>
            <ParticipantContent>
              <ParticipantName>
                <StyledLink
                  href="https://www2.ufjf.br/ufjf/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Universidade Federal de Juiz de Fora
                </StyledLink>
              </ParticipantName>
              <ParticipantDescription>
                Determinações da produção primária, metabolismo bacteriano e concentrações de
                nutrientes na coluna d'água.
              </ParticipantDescription>
            </ParticipantContent>
          </ParticipantItem>

          <ParticipantItem>
            <ParticipantContent>
              <ParticipantName>
                <StyledLink
                  href="https://www.iie.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instituto Internacional de Ecologia e Gerenciamento Ambiental
                </StyledLink>
              </ParticipantName>
              <ParticipantDescription>
                Estimativas de fluxos de GHG e das concentrações de carbono e nutrientes na
                interface água-sedimento.
              </ParticipantDescription>
            </ParticipantContent>
          </ParticipantItem>

          <ParticipantItem>
            <ParticipantContent>
              <ParticipantName>
                <StyledLink
                  href="https://www.gov.br/inpe/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instituto Nacional de Pesquisas Espaciais
                </StyledLink>
              </ParticipantName>
              <ParticipantDescription>
                Organização do banco de dados do projeto, instalação de plataformas telemétricas de
                dados ambientais, estimativa de fluxos de GHG na interface água-atmosfera, análise
                isotópica (CENA-USP) e modelagem dos fluxos de emissão de GHG.
              </ParticipantDescription>
            </ParticipantContent>
          </ParticipantItem>
        </Section>
      </MainContent>
    </FurnasParticipantesContainer>
  );
}

export default FurnasParticipantesPage;
