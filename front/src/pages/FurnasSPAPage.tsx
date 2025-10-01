import { useState } from "react";
import styled from "styled-components";
import {
  Target,
  Activity,
  MapPin,
  Database,
  Filter,
  Search,
} from "lucide-react";
import { CsvExportButton } from "../components/CsvExportButton";
import furnasLogo from "../../img/furnas/carbon_budget_p_m.jpg";

const FurnasSPAContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: visible;
`;

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionTitleWithLogo = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SmallLogo = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MapPlaceholder = styled.div`
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 4rem 2rem;
  margin: 2rem 0;
  color: #64748b;
  text-align: center;
`;

const ControlsSection = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 100%;
`;

const DateRangeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DateRangeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const DateRangeSeparator = styled.span`
  color: #6b7280;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const ControlSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ClearButton = styled.button`
  background: white;
  border: 2px solid #9ca3af;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #6b7280;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #64748b;
`;

const ErrorContainer = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #dc2626;
  text-align: center;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  th,
  td {
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
    min-width: 200px;
    min-height: 35px;
    transition: all 0.2s ease;
    width: auto;
  }

  td {
    padding: 0.6rem 1rem;
  }

  th {
  font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
    position: sticky;
    top: 0;
    z-index: 10;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    height: 50px;
    padding: 0.8rem 1rem;
  }

  td {
    font-size: 1rem;
    color: #374151;
    height: 35px;
  }

  tr:hover {
    background: #f3f4f6;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }

  tr:nth-child(even):hover {
    background: #f3f4f6;
  }
`;

function FurnasSPAPage() {
  const [filters, setFilters] = useState({
    startDate: "2006-01-01", // Período do projeto Furnas
    endDate: "2013-12-31",
    limit: 10,
    reservatorio: "", // Filtro por reservatório
    sortOrder: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    // Simular busca de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: "2006-01-01",
      endDate: "2013-12-31",
      limit: 10,
      reservatorio: "",
      sortOrder: "desc",
    });
  };

  return (
    <FurnasSPAContainer>
      <MainContent>
        {/* Seção Sobre o Balanço de Carbono */}
        <Section id="home">
          <SectionTitleWithLogo>
            <SmallLogo src={furnasLogo} alt="Logo Furnas" />
          </SectionTitleWithLogo>
          <SectionSubtitle style={{ textAlign: "center" }}>
            Projeto Balanço de Carbono em Reservatórios Hidrelétricos
          </SectionSubtitle>

          <SectionText>
            O projeto Balanço de Carbono representa um esforço pioneiro na quantificação 
            das emissões de gases de efeito estufa (GEE) em reservatórios hidrelétricos 
            brasileiros. Desenvolvido em parceria com a Furnas Centrais Elétricas, este 
            projeto científico visa compreender e quantificar os fluxos de carbono em 
            ambientes aquáticos continentais.
          </SectionText>

          <SectionText>
            Com 79 campanhas científicas realizadas em diversos reservatórios, o projeto 
            coletou dados essenciais sobre emissões de CH₄, CO₂ e N₂O, contribuindo para 
            o desenvolvimento de modelos espaciais específicos para ambientes de cerrado 
            e outras regiões brasileiras.
          </SectionText>
        </Section>

        {/* Seção Objetivos */}
        <Section id="objetivos">
          <SectionTitle>
            <Target size={40} />
            Objetivos do Projeto
          </SectionTitle>
          <SectionSubtitle>
            Compreender os processos biogeoquímicos em reservatórios hidrelétricos
          </SectionSubtitle>

          <SectionText>
            <strong>Quantificação de Emissões:</strong> Medir e quantificar as emissões 
            de gases de efeito estufa (CH₄, CO₂, N₂O) em reservatórios hidrelétricos, 
            contribuindo para o inventário nacional de emissões.
          </SectionText>

          <SectionText>
            <strong>Desenvolvimento de Modelos:</strong> Criar modelos espaciais e 
            temporais para prever emissões de carbono em diferentes tipos de reservatórios 
            e condições ambientais.
          </SectionText>

          <SectionText>
            <strong>Impacto Ambiental:</strong> Avaliar o impacto ambiental dos 
            reservatórios hidrelétricos e propor medidas de mitigação para reduzir 
            as emissões de gases de efeito estufa.
          </SectionText>

          <SectionText>
            <strong>Base Científica:</strong> Fornecer dados científicos robustos para 
            políticas públicas e regulamentações ambientais relacionadas à geração 
            hidrelétrica.
          </SectionText>
        </Section>

        {/* Seção Metodologia */}
        <Section id="metodologia">
          <SectionTitle>
            <Activity size={40} />
            Metodologia Científica
          </SectionTitle>
          <SectionSubtitle>
            Abordagem multidisciplinar para análise de fluxos de carbono
          </SectionSubtitle>

          <SectionText>
            <strong>Campanhas de Campo:</strong> Realização de 79 campanhas científicas 
            em reservatórios estratégicos, com coleta sistemática de dados ambientais, 
            hidrológicos e biogeoquímicos.
          </SectionText>

          <SectionText>
            <strong>Medições Gasosas:</strong> Utilização de técnicas avançadas para 
            medição de concentrações e fluxos de CH₄, CO₂ e N₂O em diferentes 
            compartimentos (água, sedimento, atmosfera).
          </SectionText>

          <SectionText>
            <strong>Análise Espacial:</strong> Desenvolvimento de modelos espaciais 
            específicos para ambientes de cerrado, considerando variabilidade temporal 
            e espacial das emissões.
          </SectionText>

          <SectionText>
            <strong>Integração de Dados:</strong> Combinação de dados in situ com 
            informações de sensoriamento remoto e modelagem hidrodinâmica para uma 
            compreensão holística dos processos.
          </SectionText>
        </Section>

        {/* Seção Mapa */}
        <Section id="mapa">
          <SectionTitle>
            <MapPin size={40} />
            Localização dos Reservatórios
          </SectionTitle>
          <SectionSubtitle>
            Reservatórios estudados no projeto Balanço de Carbono
          </SectionSubtitle>

          <MapPlaceholder>
            <MapPin size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h3>Mapa Interativo dos Reservatórios</h3>
            <p>
              Visualização geográfica dos reservatórios hidrelétricos estudados 
              no projeto, incluindo dados de localização, características 
              ambientais e resultados das campanhas científicas.
            </p>
          </MapPlaceholder>
        </Section>

        {/* Seção Banco de Dados */}
        <Section id="dados">
          <SectionTitle>
            <Database size={40} />
            Banco de Dados
          </SectionTitle>
          <SectionSubtitle>
            Consulte e visualize os dados coletados nas campanhas científicas
          </SectionSubtitle>

          <ControlsSection>
            <ControlsGrid>
              <DateRangeGroup>
                <ControlLabel>Período</ControlLabel>
                <DateRangeContainer>
                  <DateRangeInput
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                  <DateRangeSeparator>até</DateRangeSeparator>
                  <DateRangeInput
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </DateRangeContainer>
              </DateRangeGroup>
              <ControlGroup>
                <ControlLabel>Reservatório</ControlLabel>
                <ControlSelect
                  value={filters.reservatorio}
                  onChange={(e) => setFilters({ ...filters, reservatorio: e.target.value })}
                >
                  <option value="">Todos os reservatórios</option>
                  <option value="furnas">Furnas</option>
                  <option value="itumbiara">Itumbiara</option>
                  <option value="embarcacao">Embarcação</option>
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Registros por página</ControlLabel>
                <ControlSelect
                  value={filters.limit}
                  onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Ordenação</ControlLabel>
                <ControlSelect
                  value={filters.sortOrder}
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                >
                  <option value="desc">Mais recente → Mais antigo</option>
                  <option value="asc">Mais antigo → Mais recente</option>
                </ControlSelect>
              </ControlGroup>
            </ControlsGrid>

            <ActionButtons>
              <SearchButton onClick={handleSearch} disabled={loading}>
                <Search size={20} />
                {loading ? "Buscando..." : "Buscar Dados"}
              </SearchButton>
              <ClearButton onClick={handleClearFilters}>
                <Filter size={20} />
                Limpar Filtros
              </ClearButton>
              <CsvExportButton data={[]} filename="dados_furnas.csv" />
            </ActionButtons>
          </ControlsSection>

          {error && (
            <ErrorContainer>
              <strong>Erro ao carregar dados:</strong> {error}
            </ErrorContainer>
          )}

          {loading ? (
            <LoadingContainer>
              <Activity size={24} style={{ marginRight: "0.5rem" }} />
              Carregando dados das campanhas científicas...
            </LoadingContainer>
          ) : (
            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Reservatório</th>
                    <th>Data</th>
                    <th>CH₄ (mg/m²/d)</th>
                    <th>CO₂ (mg/m²/d)</th>
                    <th>N₂O (mg/m²/d)</th>
                    <th>Temperatura (°C)</th>
                    <th>Profundidade (m)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                      Selecione os filtros e clique em "Buscar Dados" para visualizar os resultados
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
            </TableContainer>
          )}
        </Section>
      </MainContent>
    </FurnasSPAContainer>
  );
}

export default FurnasSPAPage;