import React from "react";
import styled from "styled-components";

interface Option {
  label: string;
  value: string;
}

export interface Filters {
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
  reservatorios: string[];
  instituicao: string;
  nivelMin: string;
  nivelMax: string;
  volumeUtilMin: string;
  volumeUtilMax: string;
  geracaoMin: string;
  geracaoMax: string;
  sortBy: string;
  sortOrder: string;
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  reservatoriosOptions: Option[];
  instituicoesOptions: Option[];
  onApply: () => void;
}

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1f2937;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &[type="date"] {
    cursor: pointer;
  }

  &[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      opacity: 1;
    }
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1f2937;
  background-color: #ffffff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%234B5563' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &[multiple] {
    background-image: none;
    min-height: 120px;
    padding: 0.5rem;
  }
`;

const RangeContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  ${FilterInput} {
    flex: 1;
  }
`;

const RangeSeparator = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  flex-shrink: 0;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  ${FilterInput} {
    flex: 1;
  }
`;

const DateRangeSeparator = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  flex-shrink: 0;
`;

const SortContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  ${FilterInput} {
    flex: 1;
  }

  ${FilterSelect} {
    flex-shrink: 0;
    min-width: 100px;
  }
`;

export function DataTableFiltersFurnas({
  filters,
  setFilters,
  reservatoriosOptions,
  instituicoesOptions,
  onApply,
}: Props) {
  return (
    <FiltersContainer>
      {/* Data inicial e final */}
      <FilterGroup>
        <FilterLabel>Data inicial</FilterLabel>
        <FilterInput
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Data final</FilterLabel>
        <FilterInput
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </FilterGroup>

    </FiltersContainer>
  );
}
