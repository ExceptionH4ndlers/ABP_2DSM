import React from "react";
import styled from "styled-components";

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

export function DataTableFiltersFurnas({ filters, setFilters }: Props) {
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
