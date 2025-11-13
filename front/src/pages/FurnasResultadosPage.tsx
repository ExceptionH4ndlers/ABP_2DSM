import { useState } from "react";
import styled, { css } from "styled-components";
import { BarChart3 } from "lucide-react";
import FurnasSidebar from "../components/FurnasSidebar";

const FurnasResultadosContainer = styled.div`
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

const ListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  gap: 0.75rem;

  ${({ theme }) => theme.media.md} {
    gap: 1rem;
  }
`;

const BulletPoint = styled.div`
  width: 10px;
  height: 10px;
  background: #196d95;
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
`;

const ListText = styled.p`
  font-size: 1rem;
  color: #000000;
  line-height: 1.7;
  margin: 0;

  ${({ theme }) => theme.media.lg} {
    font-size: 1.1rem;
  }
`;

function FurnasResultadosPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <FurnasResultadosContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="resultados"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        {/* Seção Resultados Esperados */}
        <Section>
          <SectionTitle>
            <BarChart3 size={40} />
            Resultados Esperados do Projeto
          </SectionTitle>
          <SectionSubtitle>
            Principais resultados e benefícios esperados do projeto Balanço de Carbono
          </SectionSubtitle>

          <ListItem>
            <BulletPoint />
            <ListText>
              Padronização de metodologia para o cálculo das emissões de gases de efeito estufa em
              reservatórios;
            </ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Modelo de emissão de longo prazo de gases de efeito estufa por reservatórios;
            </ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Artigos em revistas especializadas e publicação de livro, o qual incluirá uma versão
              direcionada à comunidade científica internacional.
            </ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>Modelos ecohidrodinâmicos aplicados;</ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>Disponibilização de modelos e dados na internet;</ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Desenvolvimento de técnicas computacionais de análise de sinais ambientais;
            </ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>Incentivo da inovação tecnológica no país;</ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Capacitação de recursos humanos com atividades acadêmicas de pesquisa.
            </ListText>
          </ListItem>
        </Section>

        {/* Seção Benefícios Gerados */}
        <Section>
          <SectionTitle>
            <BarChart3 size={40} />
            Benefícios Gerados
          </SectionTitle>
          <SectionSubtitle>Impactos positivos e contribuições do projeto</SectionSubtitle>

          <ListItem>
            <BulletPoint />
            <ListText>Fortalecimento dos parceiros como Centros de Excelência;</ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Produção de conhecimento relevante ao estado-da-arte (Subsídios à realização de 5
              dissertações de mestrado e 6 teses de doutorado, além de cursos de especialização);
            </ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Participação em conferências, seminários e congressos e publicações em anais e
              revistas especializadas;
            </ListText>
          </ListItem>

          <ListItem>
            <BulletPoint />
            <ListText>
              Resultados irão compor o balanço de carbono de FURNAS, o qual permitirá o
              aprimoramento de seu planejamento ambiental, baseado no desenvolvimento sustentável.
            </ListText>
          </ListItem>
        </Section>
      </MainContent>
    </FurnasResultadosContainer>
  );
}

export default FurnasResultadosPage;
