import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, X, Filter, CheckCircle2, Circle } from "lucide-react";
import {
  getParametersByCategory,
  CATEGORY_LABELS,
  SIMA_PARAMETERS,
  type SimaCategory,
  type SimaParameter,
} from "../utils/simaChartCategories";
import type { ChartType, GroupBy } from "../hooks/useSimaChartData";
import { useEstacoes } from "../hooks/useEstacoes";

const FiltersContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;

  ${({ theme }) => theme.media.sm} {
    padding: 3rem;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 3.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: "";
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 2px;
  }
`;

const FiltersSection = styled.div`
  margin-bottom: 2rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: start;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    align-items: start;
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    align-items: start;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  letter-spacing: 0.025em;
  display: block;
`;

const FilterSelect = styled.select`
  padding: 0.875rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #1e293b;
  background-color: #ffffff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25em;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;

  &:hover {
    border-color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &[multiple] {
    background-image: none;
    min-height: 200px;
    padding: 0.75rem;
    overflow-y: auto;
    cursor: default;
  }

  &[multiple] option {
    padding: 0.5rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const EstacoesLimitWarning = styled.div`
  font-size: 0.75rem;
  color: #f59e0b;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const ChartTypeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => (props.$active ? "#3b82f6" : "#e2e8f0")};
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"};
  color: ${(props) => (props.$active ? "#ffffff" : "#475569")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.875rem 2rem;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
`;

const SearchButton = styled(ActionButton)`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  }
`;

const ClearButton = styled(ActionButton)`
  background: #ffffff;
  color: #475569;
  border: 1.5px solid #cbd5e1;

  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #94a3b8;
  }
`;

const CategoryFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const CategoryFilterButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid ${(props) => (props.$active ? "#3b82f6" : "#cbd5e1")};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"};
  color: ${(props) => (props.$active ? "#ffffff" : "#475569")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-1px);
  }
`;

const ParametersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
      background: #94a3b8;
    }
  }
`;

const ParameterCheckbox = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.$selected
      ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"};
  border: 2px solid ${(props) => (props.$selected ? "#3b82f6" : "#e2e8f0")};

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-1px);
  }

  input[type="checkbox"] {
    display: none;
  }
`;

const ParameterLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ParameterName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
`;

const ParameterUnit = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
`;

const SelectedParamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 2px solid #bae6fd;
  min-height: 4rem;
  align-items: flex-start;
`;

const SelectedParamTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border-radius: 25px;
  font-size: 0.8125rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const RemoveButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.15);
  }
`;

const EmptyParamsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.875rem;
  font-style: italic;
  width: 100%;
  padding: 1rem;
  text-align: center;
`;

const SelectedCount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  margin-bottom: 1rem;
`;

// Seleção única de estação (não há comparação entre estações)

export interface SimaChartFiltersProps {
  filters: {
    category: "todos" | SimaCategory;
    parameters: string[];
    estacao?: string; // Estação única selecionada
    startDate: string;
    endDate: string;
    chartType: ChartType;
    groupBy?: GroupBy;
    xAxisParam?: string;
    yAxisParam?: string;
  };
  onFiltersChange: (filters: SimaChartFiltersProps["filters"]) => void;
  onApply: () => void;
  loading?: boolean;
}

export default function SimaChartFilters({
  filters,
  onFiltersChange,
  onApply,
  loading = false,
}: SimaChartFiltersProps) {
  const { estacoes } = useEstacoes();
  const [availableParameters, setAvailableParameters] = useState<SimaParameter[]>([]);

  // Atualizar parâmetros disponíveis quando categoria muda
  useEffect(() => {
    const params = getParametersByCategory(filters.category);
    setAvailableParameters(params);

    // Remover parâmetros que não estão mais na categoria selecionada
    const validParams = filters.parameters.filter((paramKey) =>
      params.some((p) => p.key === paramKey),
    );
    if (validParams.length !== filters.parameters.length) {
      onFiltersChange({ ...filters, parameters: validParams });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category]);

  const handleCategoryChange = (category: "todos" | SimaCategory) => {
    onFiltersChange({ ...filters, category, parameters: [] });
  };

  const handleParameterToggle = (paramKey: string) => {
    const isSelected = filters.parameters.includes(paramKey);
    if (isSelected) {
      onFiltersChange({
        ...filters,
        parameters: filters.parameters.filter((p) => p !== paramKey),
      });
    } else {
      onFiltersChange({
        ...filters,
        parameters: [...filters.parameters, paramKey],
      });
    }
  };

  const handleClearFilters = () => {
    onFiltersChange({
      category: "todos",
      parameters: [],
      estacao: undefined,
      startDate: "", // Sem período padrão
      endDate: "", // Sem período padrão
      chartType: "line",
      groupBy: undefined,
      xAxisParam: undefined,
      yAxisParam: undefined,
    });
  };

  return (
    <FiltersContainer>
      {/* Seção: Filtros Básicos */}
      <FiltersSection>
        <SectionTitle>Filtros de Contexto</SectionTitle>
        <FiltersGrid>
          <FilterGroup>
            <FilterLabel>
              Estação de Monitoramento *
            </FilterLabel>
            <FilterSelect
              value={filters.estacao || ""}
              onChange={(e) => {
                const normalizedId = e.target.value ? String(e.target.value).trim() : undefined;
                onFiltersChange({
                  ...filters,
                  estacao: normalizedId,
                });
              }}
              required
            >
              <option value="">Selecione uma estação</option>
              {estacoes.map((estacao) => (
                <option key={estacao.idestacao} value={estacao.idestacao}>
                  {estacao.rotulo} {estacao.idestacao && `(ID: ${estacao.idestacao})`}
                </option>
              ))}
            </FilterSelect>
            {!filters.estacao && (
              <EstacoesLimitWarning style={{ marginTop: "0.5rem" }}>
                ⚠️ Selecione uma estação para visualizar os gráficos
              </EstacoesLimitWarning>
            )}
          </FilterGroup>
        </FiltersGrid>
      </FiltersSection>

      {/* Seção: Parâmetros */}
      <FiltersSection>
        <SectionTitle>
          <Filter size={20} />
          Seleção de Parâmetros
        </SectionTitle>

        {/* Filtros rápidos por categoria */}
        <CategoryFiltersContainer>
          <CategoryFilterButton
            $active={filters.category === "todos"}
            onClick={() => handleCategoryChange("todos")}
          >
            {filters.category === "todos" ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            Todas as Categorias
          </CategoryFilterButton>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <CategoryFilterButton
              key={key}
              $active={filters.category === key}
              onClick={() => handleCategoryChange(key as SimaCategory)}
            >
              {filters.category === key ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              {label}
            </CategoryFilterButton>
          ))}
        </CategoryFiltersContainer>

        {/* Grid de parâmetros com checkboxes */}
        <FilterGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            <FilterLabel>Selecione um ou mais parâmetros (Ctrl+Click para múltiplos)</FilterLabel>
            {filters.parameters.length > 0 && (
              <SelectedCount>
                {filters.parameters.length} parâmetro{filters.parameters.length > 1 ? "s" : ""}{" "}
                selecionado{filters.parameters.length > 1 ? "s" : ""}
              </SelectedCount>
            )}
          </div>
          <ParametersGrid>
            {availableParameters.map((param) => {
              const isSelected = filters.parameters.includes(param.key);
              return (
                <ParameterCheckbox
                  key={param.key}
                  $selected={isSelected}
                  onClick={(e) => {
                    e.preventDefault();
                    handleParameterToggle(param.key);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleParameterToggle(param.key)}
                  />
                  {isSelected ? (
                    <CheckCircle2 size={20} color="#3b82f6" fill="#3b82f6" />
                  ) : (
                    <Circle size={20} color="#cbd5e1" />
                  )}
                  <ParameterLabel>
                    <ParameterName>{param.label}</ParameterName>
                    {param.unit && <ParameterUnit>{param.unit}</ParameterUnit>}
                  </ParameterLabel>
                </ParameterCheckbox>
              );
            })}
          </ParametersGrid>

          {/* Parâmetros selecionados */}
          <SelectedParamsContainer>
            {filters.parameters.length > 0 ? (
              filters.parameters.map((paramKey) => {
                const param = SIMA_PARAMETERS.find((p) => p.key === paramKey);
                return (
                  <SelectedParamTag key={paramKey}>
                    {param?.label || paramKey}
                    {param?.unit && (
                      <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>({param.unit})</span>
                    )}
                    <RemoveButton
                      onClick={() => handleParameterToggle(paramKey)}
                      aria-label="Remover parâmetro"
                    >
                      <X size={14} />
                    </RemoveButton>
                  </SelectedParamTag>
                );
              })
            ) : (
              <EmptyParamsMessage>
                <Circle size={16} style={{ marginRight: "0.5rem" }} />
                Nenhum parâmetro selecionado. Selecione pelo menos um parâmetro para gerar o
                gráfico.
              </EmptyParamsMessage>
            )}
          </SelectedParamsContainer>
        </FilterGroup>
      </FiltersSection>

      {/* Seção: Tipo de Gráfico */}
      <FiltersSection>
        <SectionTitle>Tipo de Visualização</SectionTitle>
        <FilterGroup>
          <ChartTypeContainer>
            <ChartTypeButton
              $active={filters.chartType === "line"}
              onClick={() => onFiltersChange({ ...filters, chartType: "line" })}
            >
              📈 Linha
            </ChartTypeButton>
            <ChartTypeButton
              $active={filters.chartType === "scatter"}
              onClick={() => onFiltersChange({ ...filters, chartType: "scatter" })}
            >
              📉 Scatter
            </ChartTypeButton>
          </ChartTypeContainer>
        </FilterGroup>

        {filters.chartType === "scatter" && (
          <FiltersGrid style={{ marginTop: "1rem" }}>
            <FilterGroup>
              <FilterLabel>Eixo X</FilterLabel>
              <FilterSelect
                value={filters.xAxisParam || ""}
                onChange={(e) =>
                  onFiltersChange({ ...filters, xAxisParam: e.target.value || undefined })
                }
              >
                <option value="">Selecione um parâmetro</option>
                {availableParameters.map((param) => (
                  <option key={param.key} value={param.key}>
                    {param.label} {param.unit && `(${param.unit})`}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Eixo Y</FilterLabel>
              <FilterSelect
                value={filters.yAxisParam || ""}
                onChange={(e) =>
                  onFiltersChange({ ...filters, yAxisParam: e.target.value || undefined })
                }
              >
                <option value="">Selecione um parâmetro</option>
                {availableParameters.map((param) => (
                  <option key={param.key} value={param.key}>
                    {param.label} {param.unit && `(${param.unit})`}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
          </FiltersGrid>
        )}
      </FiltersSection>

      {/* Botões de Ação */}
      <ActionButtons>
        <ClearButton onClick={handleClearFilters} disabled={loading}>
          <X size={18} />
          Limpar Filtros
        </ClearButton>
        <SearchButton
          onClick={onApply}
          disabled={loading || filters.parameters.length === 0 || !filters.estacao}
        >
          <Search size={18} />
          {loading ? "Carregando..." : "Aplicar Filtros"}
        </SearchButton>
      </ActionButtons>
    </FiltersContainer>
  );
}
