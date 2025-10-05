import styled from "styled-components";
import { FileText, Calendar, Database } from "lucide-react";

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ReservatorioSection = styled.div`
  margin: 2rem 0;
`;

const ReservatorioTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const InstituicaoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InstituicaoCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
`;

const InstituicaoTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const CampanhaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CampanhaItem = styled.li`
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border-left: 3px solid #0891b2;
`;

const CampanhaPeriodo = styled.span`
  font-weight: 500;
  color: #374151;
`;

const DatasetSection = styled.div`
  margin: 2rem 0;
`;

const DatasetTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const InstitutionHeader = styled.div<{ $institution?: string }>`
  background: #f8fafc;
  color: #1f2937;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #e5e7eb;
`;

// removed InstitutionLogo as the visual badge is no longer needed

const InstitutionInfo = styled.div`
  flex: 1;
`;

const InstitutionName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
`;

const InstitutionDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
`;

const InstituicaoDatasetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DatasetCard = styled.div<{ $institution?: string }>`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #e5e7eb;
  }
`;

const DatasetCardTitle = styled.h4<{ $institution?: string }>`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InstitutionIcon = styled.div<{ $institution?: string }>`
  display: none;
`;

const DatasetStats = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const StatItem = styled.div<{ $institution?: string }>`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
`;

const StatLabel = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const ParameterList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ParameterItem = styled.li<{ $institution?: string }>`
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 3px solid #e5e7eb;
`;

function BalcarDescricaoPage() {
  return (
    <Section>
      <SectionTitle>
        <FileText size={20} /> Sobre a Base de Dados
      </SectionTitle>
      <SectionText>
        A base de dados é formada pelos resultados de 79 campanhas realizadas pelas instituições participantes nos reservatórios listados abaixo. As datas compreendem o período de início e fim de cada campanha no reservatório. As datas de cada campanha podem variar de uma instituição para outra.
      </SectionText>
      <SectionText>
        Ao lado são listados os conjuntos de dados coletados por cada instituição.
      </SectionText>
      <SectionText>
        Os dados fornecidos por Furnas não são provenientes de campanhas.
      </SectionText>

      <SectionTitle>
        <Calendar size={20} /> Campanhas por Reservatório
      </SectionTitle>
      <SectionText>
        A seguir são apresentadas as datas das campanhas realizadas por cada instituição participante nos diferentes reservatórios estudados.
      </SectionText>

      <ReservatorioSection>
        <ReservatorioTitle>Corumbá</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 16/11/2004 a 19/11/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 5/3/2005 a 17/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 21/8/2005 a 24/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>INPE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 12/3/2005 a 19/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 23/8/2005 a 28/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 16/11/2004 a 18/11/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 14/3/2005 a 17/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 20/8/2005 a 24/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 16/11/2004 a 21/11/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 14/3/2005 a 17/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 21/8/2005 a 24/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>
      <SectionTitle>
        <Database size={20} /> Conjuntos de Dados por Instituição
      </SectionTitle>
      <SectionText>
        A seguir são apresentados os conjuntos de dados coletados por cada instituição participante, incluindo informações sobre quantidade de coletas, campanhas, locais e parâmetros medidos.
      </SectionText>

      <DatasetSection>
        <DatasetTitle>FURNAS</DatasetTitle>
        <InstitutionHeader $institution="FURNAS">
          <InstitutionInfo>
            <InstitutionName>FURNAS Centrais Elétricas</InstitutionName>
            <InstitutionDescription>Dados operacionais e meteorológicos</InstitutionDescription>
          </InstitutionInfo>
        </InstitutionHeader>
        <InstituicaoDatasetGrid>
          <DatasetCard $institution="FURNAS">
            <DatasetCardTitle $institution="FURNAS">
              <InstitutionIcon $institution="FURNAS">📊</InstitutionIcon>
              Dados de Precipitação
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="FURNAS"><StatLabel>Quantidade de coletas:</StatLabel> 20.683</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="FURNAS">Precipitação (Medida diária)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="FURNAS">
            <DatasetCardTitle $institution="FURNAS">
              <InstitutionIcon $institution="FURNAS">🌊</InstitutionIcon>
              Nível do Reservatório
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="FURNAS"><StatLabel>Quantidade de coletas:</StatLabel> 8.470</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="FURNAS">Nível (Nível da água do reservatório à 0h00)</ParameterItem>
              <ParameterItem $institution="FURNAS">Volume útil (Volume útil do reservatório à 0h00)</ParameterItem>
              <ParameterItem $institution="FURNAS">Per. volume útil (Percentual do volume útil à 0h00)</ParameterItem>
              <ParameterItem $institution="FURNAS">Geração (Geração diária da usina)</ParameterItem>
              <ParameterItem $institution="FURNAS">Vazão afluente (Média diária)</ParameterItem>
              <ParameterItem $institution="FURNAS">Vazão defluente (Média diária)</ParameterItem>
              <ParameterItem $institution="FURNAS">Produtividade (Média diária)</ParameterItem>
              <ParameterItem $institution="FURNAS">Vazão turbinada (Média diária)</ParameterItem>
              <ParameterItem $institution="FURNAS">Vazão vertida (Média diária)</ParameterItem>
              <ParameterItem $institution="FURNAS">Vazão turb. em vazio (Média diária)</ParameterItem>
            </ParameterList>
          </DatasetCard>
        </InstituicaoDatasetGrid>

        <DatasetTitle>IIE</DatasetTitle>
        <InstitutionHeader $institution="IIE">
          <InstitutionInfo>
            <InstitutionName>Instituto Internacional de Ecologia</InstitutionName>
            <InstitutionDescription>Interface água-sedimento e parâmetros físico-químicos</InstitutionDescription>
          </InstitutionInfo>
        </InstitutionHeader>
        <InstituicaoDatasetGrid>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">🏔️</InstitutionIcon>
              Água e Matéria Orgânica no Sedimento
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 1.283</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 243</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Profundidade (Intervalo de profundidade da fatia de sedimento)</ParameterItem>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">Água (Conteúdo de água no sedimento)</ParameterItem>
              <ParameterItem $institution="IIE">Matéria orgânica (Conteúdo de matéria orgânica no sedimento)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">💨</InstitutionIcon>
              Concentração de Gás na Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 1.008</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 244</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">Altura (Altura sobre a interface)</ParameterItem>
              <ParameterItem $institution="IIE">Réplica</ParameterItem>
              <ParameterItem $institution="IIE">CH₄ (Concentração de metano na amostra da água)</ParameterItem>
              <ParameterItem $institution="IIE">CO₂ (Concentração de dióxido de carbono na amostra da água)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">💨</InstitutionIcon>
              Concentração de Gás no Sedimento
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 3.548</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 243</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">Profundidade (Profundidade do sedimento sob a interface)</ParameterItem>
              <ParameterItem $institution="IIE">Réplica</ParameterItem>
              <ParameterItem $institution="IIE">CH₄ (Concentração de metano no sedimento)</ParameterItem>
              <ParameterItem $institution="IIE">CO₂ (Concentração de dióxido de carbono no sedimento)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">🧪</InstitutionIcon>
              Dados do Horiba
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 21.799</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 198</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Prof. (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="IIE">Temp. da água</ParameterItem>
              <ParameterItem $institution="IIE">Condutividade</ParameterItem>
              <ParameterItem $institution="IIE">pH</ParameterItem>
              <ParameterItem $institution="IIE">DO (Oxigênio dissolvido)</ParameterItem>
              <ParameterItem $institution="IIE">TDS (Sólidos totais dissolvidos)</ParameterItem>
              <ParameterItem $institution="IIE">Potencial REDOX</ParameterItem>
              <ParameterItem $institution="IIE">Turbidez</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">🌬️</InstitutionIcon>
              Fluxo Difusivo
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 324</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 243</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">Intervalo (Direção do fluxo)</ParameterItem>
              <ParameterItem $institution="IIE">CH₄ (Metano)</ParameterItem>
              <ParameterItem $institution="IIE">CO₂ (Dióxido de carbono)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">🧪</InstitutionIcon>
              Íons na Água Intersticial do Sedimento
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 1.069</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 207</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Profundidade (Intervalo de profundidade da fatia de sedimento)</ParameterItem>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">F⁻, Cl⁻, NO₂⁻, Br⁻, NO₃⁻, PO₄³⁻, SO₄²⁻</ParameterItem>
              <ParameterItem $institution="IIE">Na⁺, NH₄⁺, K⁺, Mg, Ca²⁺, Acetato</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">🧪</InstitutionIcon>
              Nutrientes no Sedimento
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 1.233</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 238</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Profundidade (Intervalo de profundidade da fatia de sedimento)</ParameterItem>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">N₂ (Concentração de Nitrogênio Total Kjeldahl)</ParameterItem>
              <ParameterItem $institution="IIE">PT (Concentração de Fósforo Total)</ParameterItem>
              <ParameterItem $institution="IIE">TC (Concentração de Carbono Total)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="IIE">
            <DatasetCardTitle $institution="IIE">
              <InstitutionIcon $institution="IIE">🧪</InstitutionIcon>
              Variáveis Físicas e Químicas da Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="IIE"><StatLabel>Quantidade de coletas:</StatLabel> 446</StatItem>
              <StatItem $institution="IIE"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="IIE"><StatLabel>Locais distintos de coleta:</StatLabel> 197</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="IIE">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="IIE">Secchi (Profundidade do disco de Secchi)</ParameterItem>
              <ParameterItem $institution="IIE">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="IIE">F⁻, Cl⁻, N-NO₃⁻, P-PO₄³⁻, S-SO₄²⁻</ParameterItem>
              <ParameterItem $institution="IIE">Li, Na, N-NH₄, K, Mg, Ca</ParameterItem>
              <ParameterItem $institution="IIE">Clorofila, Feofitina, Turbidez</ParameterItem>
              <ParameterItem $institution="IIE">NT (Nitrogênio Orgânico Total)</ParameterItem>
              <ParameterItem $institution="IIE">PT (Fósforo Total)</ParameterItem>
              <ParameterItem $institution="IIE">TDC (Carbono total dissolvido)</ParameterItem>
            </ParameterList>
          </DatasetCard>
        </InstituicaoDatasetGrid>

        <DatasetTitle>INPE</DatasetTitle>
        <InstitutionHeader $institution="INPE">
          <InstitutionInfo>
            <InstitutionName>Instituto Nacional de Pesquisas Espaciais</InstitutionName>
            <InstitutionDescription>Fluxos de gases na interface água-atmosfera</InstitutionDescription>
          </InstitutionInfo>
        </InstitutionHeader>
        <InstituicaoDatasetGrid>
          <DatasetCard $institution="INPE">
            <DatasetCardTitle $institution="INPE">
              <InstitutionIcon $institution="INPE">🫧</InstitutionIcon>
              Fluxo de Bolhas
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="INPE"><StatLabel>Quantidade de coletas:</StatLabel> 297</StatItem>
              <StatItem $institution="INPE"><StatLabel>Quantidade de campanhas:</StatLabel> 2</StatItem>
              <StatItem $institution="INPE"><StatLabel>Locais distintos de coleta:</StatLabel> 1</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="INPE">Profundidade (Profundidade média)</ParameterItem>
              <ParameterItem $institution="INPE">CH₄ (Fluxo de Bolhas)</ParameterItem>
              <ParameterItem $institution="INPE">Desvio padrão</ParameterItem>
              <ParameterItem $institution="INPE">Nro. de amostras</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="INPE">
            <DatasetCardTitle $institution="INPE">
              <InstitutionIcon $institution="INPE">🌬️</InstitutionIcon>
              Fluxo Difusivo (INPE)
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="INPE"><StatLabel>Quantidade de coletas:</StatLabel> 380</StatItem>
              <StatItem $institution="INPE"><StatLabel>Quantidade de campanhas:</StatLabel> 4</StatItem>
              <StatItem $institution="INPE"><StatLabel>Locais distintos de coleta:</StatLabel> 3</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="INPE">Profundidade</ParameterItem>
              <ParameterItem $institution="INPE">CO₂ (Fluxo de CO₂ na interface água-ar)</ParameterItem>
              <ParameterItem $institution="INPE">Desvio padrão CO₂, Nro. de amostras CO₂</ParameterItem>
              <ParameterItem $institution="INPE">CH₄ (Fluxo de CH₄ difusivo+bolhas na interface água-ar)</ParameterItem>
              <ParameterItem $institution="INPE">Desvio Padrão CH₄, Nro. de amostras CH₄</ParameterItem>
            </ParameterList>
          </DatasetCard>
        </InstituicaoDatasetGrid>

        <DatasetTitle>UFJF</DatasetTitle>
        <InstitutionHeader $institution="UFJF">
          <InstitutionInfo>
            <InstitutionName>Universidade Federal de Juiz de Fora</InstitutionName>
            <InstitutionDescription>Produção primária e metabolismo na coluna d'água</InstitutionDescription>
          </InstitutionInfo>
        </InstitutionHeader>
        <InstituicaoDatasetGrid>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🧪</InstitutionIcon>
              Abióticos na Coluna d'Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 120</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 20</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 9</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFJF">DIC (Carbono inorgânico dissolvido)</ParameterItem>
              <ParameterItem $institution="UFJF">NT (Nitrogênio), PT (Fósforo Total)</ParameterItem>
              <ParameterItem $institution="UFJF">Delta 13C, Delta 15N</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🧪</InstitutionIcon>
              Abióticos na Superfície
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 238</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 21</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 85</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">DIC (Carbono inorgânico dissolvido)</ParameterItem>
              <ParameterItem $institution="UFJF">NT (Nitrogênio), PT (Fósforo Total)</ParameterItem>
              <ParameterItem $institution="UFJF">Delta 13C, Delta 15N</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🔬</InstitutionIcon>
              Bióticos na Coluna d'Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 120</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 20</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 9</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFJF">DOC, POC, TOC (Carbono orgânico)</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade bactéria, Biomassa bactéria</ParameterItem>
              <ParameterItem $institution="UFJF">Clorofila, Biomassa carbono total fito</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade total fito, Biomassa zoo</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade total zoo</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🔬</InstitutionIcon>
              Bióticos na Superfície
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 239</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 21</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 85</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">DOC, POC, TOC (Carbono orgânico)</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade bactéria, Biomassa bactéria</ParameterItem>
              <ParameterItem $institution="UFJF">Clorofila, Biomassa carbono total fito</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade total fito, Biomassa zoo</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade total zoo</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">📈</InstitutionIcon>
              Fluxos de Carbono
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 19</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 19</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 8</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">Produção fitoplanctônica</ParameterItem>
              <ParameterItem $institution="UFJF">Carbono orgânico excretado</ParameterItem>
              <ParameterItem $institution="UFJF">Respiração fito</ParameterItem>
              <ParameterItem $institution="UFJF">Produção bacteriana</ParameterItem>
              <ParameterItem $institution="UFJF">Respiração bacteriana</ParameterItem>
              <ParameterItem $institution="UFJF">Taxa de sedimentação</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🌊</InstitutionIcon>
              Medidas de Campo na Coluna d'Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 131</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 21</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 9</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFJF">Secchi (Profundidade do disco de Secchi)</ParameterItem>
              <ParameterItem $institution="UFJF">Temp. da água, Condutividade</ParameterItem>
              <ParameterItem $institution="UFJF">DO (Oxigênio dissolvido), pH</ParameterItem>
              <ParameterItem $institution="UFJF">Turbidez, Material em suspensão</ParameterItem>
              <ParameterItem $institution="UFJF">Intensidade luminosa</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🌊</InstitutionIcon>
              Medidas de Campo na Superfície
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 238</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 21</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 85</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">Secchi (Profundidade do disco de Secchi)</ParameterItem>
              <ParameterItem $institution="UFJF">Temp. da água, Condutividade</ParameterItem>
              <ParameterItem $institution="UFJF">DO (Oxigênio dissolvido), pH</ParameterItem>
              <ParameterItem $institution="UFJF">Turbidez, Material em suspensão</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFJF">
            <DatasetCardTitle $institution="UFJF">
              <InstitutionIcon $institution="UFJF">🧪</InstitutionIcon>
              Parâmetros Biológicos e Físicos da Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de coletas:</StatLabel> 201</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Quantidade de campanhas:</StatLabel> 12</StatItem>
              <StatItem $institution="UFJF"><StatLabel>Locais distintos de coleta:</StatLabel> 46</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFJF">Profundidade, Secchi</ParameterItem>
              <ParameterItem $institution="UFJF">Temp. da água, Condutividade</ParameterItem>
              <ParameterItem $institution="UFJF">DO (Oxigênio dissolvido), pH</ParameterItem>
              <ParameterItem $institution="UFJF">Turbidez, Material em suspensão</ParameterItem>
              <ParameterItem $institution="UFJF">DOC, POC, TOC, DIC</ParameterItem>
              <ParameterItem $institution="UFJF">NT (Nitrogênio), PT (Fósforo Total)</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade bactéria, Biomassa bactéria</ParameterItem>
              <ParameterItem $institution="UFJF">Clorofila, Biomassa carbono total fito</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade total fito, Biomassa zoo</ParameterItem>
              <ParameterItem $institution="UFJF">Densidade total zoo</ParameterItem>
              <ParameterItem $institution="UFJF">Produção fitoplanctônica</ParameterItem>
              <ParameterItem $institution="UFJF">Carbono orgânico excretado</ParameterItem>
              <ParameterItem $institution="UFJF">Respiração fito</ParameterItem>
              <ParameterItem $institution="UFJF">Produção bacteriana</ParameterItem>
              <ParameterItem $institution="UFJF">Respiração bacteriana</ParameterItem>
              <ParameterItem $institution="UFJF">Taxa de sedimentação</ParameterItem>
              <ParameterItem $institution="UFJF">Delta 13C, Delta 15N</ParameterItem>
              <ParameterItem $institution="UFJF">Intensidade luminosa</ParameterItem>
            </ParameterList>
          </DatasetCard>
        </InstituicaoDatasetGrid>

        <DatasetTitle>UFRJ</DatasetTitle>
        <InstitutionHeader $institution="UFRJ">
          <InstitutionInfo>
            <InstitutionName>Universidade Federal do Rio de Janeiro - COPPE</InstitutionName>
            <InstitutionDescription>Fluxos de gases e sedimentação de carbono</InstitutionDescription>
          </InstitutionInfo>
        </InstitutionHeader>
        <InstituicaoDatasetGrid>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🫧</InstitutionIcon>
              Bolhas
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 396</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 119</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFRJ">Nro. de funis</ParameterItem>
              <ParameterItem $institution="UFRJ">Volume coletado</ParameterItem>
              <ParameterItem $institution="UFRJ">CO₂ (Dióxido de carbono)</ParameterItem>
              <ParameterItem $institution="UFRJ">O₂ (Oxigênio)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂ (Nitrogênio)</ParameterItem>
              <ParameterItem $institution="UFRJ">CH₄ (Metano)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂O (Óxido nitroso)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🌍</InstitutionIcon>
              Câmara Solo
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 82</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 22</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 31</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">CH₄ (Metano)</ParameterItem>
              <ParameterItem $institution="UFRJ">CO₂ (Dióxido de carbono)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂O (Óxido nitroso)</ParameterItem>
              <ParameterItem $institution="UFRJ">Temp. do ar, Temp. do solo</ParameterItem>
              <ParameterItem $institution="UFRJ">Vel. do vento</ParameterItem>
              <ParameterItem $institution="UFRJ">Altitude (Altitude do local da medida)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🍂</InstitutionIcon>
              Carbono Total no Sedimento
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 301</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 26</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 29</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">Camada (Profundidade no sedimento)</ParameterItem>
              <ParameterItem $institution="UFRJ">TC (Carbono total em sedimento)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🧪</InstitutionIcon>
              DC, DOC, POC, TOC, DIC e TC
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 315</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 272</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">DC (Carbono dissolvido)</ParameterItem>
              <ParameterItem $institution="UFRJ">DOC (Carbono orgânico dissolvido)</ParameterItem>
              <ParameterItem $institution="UFRJ">POC (Carbono orgânico particulado)</ParameterItem>
              <ParameterItem $institution="UFRJ">TOC (Carbono orgânico total)</ParameterItem>
              <ParameterItem $institution="UFRJ">DIC (Carbono inorgânico dissolvido)</ParameterItem>
              <ParameterItem $institution="UFRJ">TC (Carbono total)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🌬️</InstitutionIcon>
              Difusão
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 654</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 368</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">CH₄ (Metano)</ParameterItem>
              <ParameterItem $institution="UFRJ">CO₂ (Dióxido de carbono)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂O (Óxido nitroso)</ParameterItem>
              <ParameterItem $institution="UFRJ">pH</ParameterItem>
              <ParameterItem $institution="UFRJ">Temp. da água, Temp. do ar</ParameterItem>
              <ParameterItem $institution="UFRJ">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFRJ">Altitude (Altitude do local da medida)</ParameterItem>
              <ParameterItem $institution="UFRJ">Vel. do vento</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">💧</InstitutionIcon>
              Dupla Dessorção da Água
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 535</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 19</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 45</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFRJ">CO₂ (Volume de água: 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">O₂ (Volume de água: 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂ (Volume de água: 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">CH₄ (Volume de água: 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂O (Volume de água: 250 ml)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🫧</InstitutionIcon>
              Gases em Bolhas
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 20</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 7</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 11</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFRJ">CO₂ (Máximo volume de gás extraível de 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">O₂ (Máximo volume de gás extraível de 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂ (Máximo volume de gás extraível de 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">CH₄ (Máximo volume de gás extraível de 250 ml)</ParameterItem>
              <ParameterItem $institution="UFRJ">N₂O (Máximo volume de gás extraível de 250 ml)</ParameterItem>
            </ParameterList>
          </DatasetCard>
          <DatasetCard $institution="UFRJ">
            <DatasetCardTitle $institution="UFRJ">
              <InstitutionIcon $institution="UFRJ">🧪</InstitutionIcon>
              Parâmetros Físicos e Químicos
            </DatasetCardTitle>
            <DatasetStats>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de coletas:</StatLabel> 1.547</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Quantidade de campanhas:</StatLabel> 27</StatItem>
              <StatItem $institution="UFRJ"><StatLabel>Locais distintos de coleta:</StatLabel> 103</StatItem>
            </DatasetStats>
            <ParameterList>
              <ParameterItem $institution="UFRJ">Profundidade (Profundidade de coleta)</ParameterItem>
              <ParameterItem $institution="UFRJ">Cota (Nível da água)</ParameterItem>
              <ParameterItem $institution="UFRJ">Temp. do ar, Temp. da água</ParameterItem>
              <ParameterItem $institution="UFRJ">DO (Oxigênio dissolvido)</ParameterItem>
              <ParameterItem $institution="UFRJ">pH</ParameterItem>
              <ParameterItem $institution="UFRJ">Potencial REDOX</ParameterItem>
              <ParameterItem $institution="UFRJ">Vel. do vento</ParameterItem>
            </ParameterList>
          </DatasetCard>
        </InstituicaoDatasetGrid>
      </DatasetSection>

      <ReservatorioSection>
        <ReservatorioTitle>Estreito</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 14/11/2005 a 15/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 28/3/2006 a 29/3/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 9/8/2006 a 11/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 18/11/2005 a 18/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 8/4/2006 a 10/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 9/8/2006 a 10/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 14/11/2005 a 16/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 26/3/2006 a 28/3/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 10/8/2006 a 13/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>

      <ReservatorioSection>
        <ReservatorioTitle>Funil</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 20/11/2006 a 28/11/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 26/3/2007 a 29/3/2007</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 23/7/2007 a 26/7/2007</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 20/11/2006 a 23/11/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 26/3/2007 a 29/3/2007</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 23/7/2007 a 26/7/2007</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>

      <ReservatorioSection>
        <ReservatorioTitle>Furnas</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 19/11/2005 a 22/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 3/4/2006 a 7/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 31/7/2006 a 5/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 15/11/2005 a 23/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 2/4/2006 a 4/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 31/7/2006 a 2/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 20/11/2005 a 27/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 2/4/2006 a 8/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 31/7/2006 a 7/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>

      <ReservatorioSection>
        <ReservatorioTitle>Itumbiara</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 20/11/2004 a 23/11/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 19/3/2005 a 22/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 25/8/2005 a 28/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 20/11/2004 a 21/11/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 18/3/2005 a 20/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 25/8/2005 a 28/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 22/11/2004 a 26/11/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 17/3/2005 a 23/3/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 25/8/2005 a 30/8/2005</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>

      <ReservatorioSection>
        <ReservatorioTitle>Manso</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 25/11/2003 a 26/11/2003</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 22/3/2004 a 24/3/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 19/7/2004 a 21/7/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Quarta: 27/11/2006 a 29/11/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Quinta: 19/3/2007 a 22/3/2007</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Sexta: 16/7/2007 a 18/7/2007</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>INPE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 22/3/2004 a 25/3/2004</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 25/11/2003 a 25/11/2003</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 24/3/2004 a 25/3/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 19/7/2004 a 22/7/2004</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 24/11/2003 a 27/11/2003</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 22/3/2004 a 25/3/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 18/7/2004 a 25/7/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Quarta: 27/11/2006 a 1/12/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Quinta: 19/3/2007 a 22/3/2007</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Sexta: 16/7/2007 a 19/7/2007</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>

      <ReservatorioSection>
        <ReservatorioTitle>Mascarenhas de Moraes</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 14/11/2005 a 17/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 29/3/2006 a 1/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 6/8/2006 a 10/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 17/11/2005 a 21/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 7/4/2006 a 12/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 4/8/2006 a 8/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 17/11/2005 a 21/11/2005</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 28/3/2006 a 1/4/2006</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 7/8/2006 a 10/8/2006</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>

      <ReservatorioSection>
        <ReservatorioTitle>Serra da Mesa</ReservatorioTitle>
        <InstituicaoGrid>
          <InstituicaoCard>
            <InstituicaoTitle>IIE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 18/11/2003 a 21/11/2003</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 15/3/2004 a 19/3/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 12/7/2004 a 16/7/2004</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>INPE</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 16/3/2004 a 18/3/2004</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFJF</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 18/11/2003 a 18/11/2003</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 18/3/2004 a 18/3/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 12/7/2004 a 14/7/2004</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
          <InstituicaoCard>
            <InstituicaoTitle>UFRJ</InstituicaoTitle>
            <CampanhaList>
              <CampanhaItem>
                <CampanhaPeriodo>Primeira: 17/11/2003 a 21/11/2003</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Segunda: 15/3/2004 a 19/3/2004</CampanhaPeriodo>
              </CampanhaItem>
              <CampanhaItem>
                <CampanhaPeriodo>Terceira: 12/7/2004 a 17/7/2004</CampanhaPeriodo>
              </CampanhaItem>
            </CampanhaList>
          </InstituicaoCard>
        </InstituicaoGrid>
      </ReservatorioSection>
    </Section>
  );
}

export default BalcarDescricaoPage;
