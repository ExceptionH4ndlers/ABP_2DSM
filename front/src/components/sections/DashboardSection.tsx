import { useState } from "react";
import styled from "styled-components";
import { BarChart3, Download, Filter, RefreshCw, Eye, Database } from "lucide-react";

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
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

const DashboardContainer = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 2rem 1rem;
    border-radius: 20px;
  }
`;

const FiltersSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button<{ variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? `
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        
        &:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
      `
      : `
        background: white;
        color: #374151;
        border: 2px solid #e2e8f0;
        
        &:hover {
          background: #f8fafc;
          border-color: #3b82f6;
          transform: translateY(-2px);
        }
      `}

  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
    padding: 1rem 1.5rem;
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const DataCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
`;

const CardContent = styled.div`
  color: #64748b;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e2e8f0;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;

function DashboardSection() {
  const [filters, setFilters] = useState({
    projeto: "todos",
    reservatorio: "todos",
    dataInicio: "",
    dataFim: "",
    parametro: "todos",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Aplicando filtros:", filters);
    // Aqui seria implementada a lógica de filtro
  };

  const handleExportData = () => {
    console.log("Exportando dados...");
    // Aqui seria implementada a lógica de exportação
  };

  return (
    <SectionContainer id="dashboard">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Dashboard Interativo</SectionTitle>
          <SectionSubtitle>
            Visualize e analise todos os dados limnológicos em um painel unificado
          </SectionSubtitle>
        </SectionHeader>

        <DashboardContainer>
          <FiltersSection>
            <FilterGroup>
              <FilterLabel>Projeto</FilterLabel>
              <FilterSelect
                value={filters.projeto}
                onChange={(e) => handleFilterChange("projeto", e.target.value)}
              >
                <option value="todos">Todos os Projetos</option>
                <option value="sima">SIMA</option>
                <option value="balanco-carbono">Balanço de Carbono</option>
                <option value="balcar">BALCAR</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Reservatório</FilterLabel>
              <FilterSelect
                value={filters.reservatorio}
                onChange={(e) => handleFilterChange("reservatorio", e.target.value)}
              >
                <option value="todos">Todos os Reservatórios</option>
                <option value="furnas">Furnas</option>
                <option value="agua-vermelha">Água Vermelha</option>
                <option value="emborcacao">Emborcação</option>
                <option value="jaguara">Jaguara</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Data Início</FilterLabel>
              <FilterInput
                type="date"
                value={filters.dataInicio}
                onChange={(e) => handleFilterChange("dataInicio", e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Data Fim</FilterLabel>
              <FilterInput
                type="date"
                value={filters.dataFim}
                onChange={(e) => handleFilterChange("dataFim", e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Parâmetro</FilterLabel>
              <FilterSelect
                value={filters.parametro}
                onChange={(e) => handleFilterChange("parametro", e.target.value)}
              >
                <option value="todos">Todos os Parâmetros</option>
                <option value="temperatura">Temperatura</option>
                <option value="ph">pH</option>
                <option value="oxigenio">Oxigênio Dissolvido</option>
                <option value="turbidez">Turbidez</option>
                <option value="co2">CO₂</option>
                <option value="ch4">CH₄</option>
                <option value="n2o">N₂O</option>
              </FilterSelect>
            </FilterGroup>
          </FiltersSection>

          <ActionButtons>
            <ActionButton onClick={handleApplyFilters}>
              <Filter size={18} />
              Aplicar Filtros
            </ActionButton>
            <ActionButton variant="secondary">
              <RefreshCw size={18} />
              Atualizar Dados
            </ActionButton>
            <ActionButton onClick={handleExportData}>
              <Download size={18} />
              Exportar CSV
            </ActionButton>
          </ActionButtons>

          <DataGrid>
            <DataCard>
              <CardHeader>
                <CardIcon>
                  <BarChart3 size={24} />
                </CardIcon>
                <CardTitle>Visualização de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                Visualize os dados filtrados em tabelas dinâmicas com opções de ordenação e
                paginação. Os dados são atualizados em tempo real conforme os filtros aplicados.
              </CardContent>
            </DataCard>

            <DataCard>
              <CardHeader>
                <CardIcon>
                  <Eye size={24} />
                </CardIcon>
                <CardTitle>Gráficos Temporais</CardTitle>
              </CardHeader>
              <CardContent>
                Explore séries temporais dos parâmetros monitorados com gráficos interativos que
                permitem zoom, pan e seleção de períodos específicos.
              </CardContent>
            </DataCard>

            <DataCard>
              <CardHeader>
                <CardIcon>
                  <Database size={24} />
                </CardIcon>
                <CardTitle>Exportação de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                Exporte os dados filtrados em formato CSV para análise externa. Inclui metadados
                completos e informações sobre a qualidade dos dados.
              </CardContent>
            </DataCard>
          </DataGrid>

          <StatsGrid>
            <StatCard>
              <StatValue>15+</StatValue>
              <StatLabel>Parâmetros Monitorados</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>10+</StatValue>
              <StatLabel>Reservatórios</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>24/7</StatValue>
              <StatLabel>Monitoramento Contínuo</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>3</StatValue>
              <StatLabel>Projetos Integrados</StatLabel>
            </StatCard>
          </StatsGrid>
        </DashboardContainer>
      </SectionContent>
    </SectionContainer>
  );
}

export default DashboardSection;
