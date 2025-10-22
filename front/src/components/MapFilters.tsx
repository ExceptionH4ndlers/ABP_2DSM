import { useState } from 'react';
import styled from 'styled-components';
import { Filter, X } from 'lucide-react';
import type { MapFilters } from '../hooks/useMapData';

const FilterContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8fafc;
  }
`;

const Checkbox = styled.input`
  margin: 0;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

// Usar prop transitória para evitar forward ao DOM
const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;

  ${({ $variant = 'secondary' }) => {
    if ($variant === 'primary') {
      return `
        background: #3b82f6;
        border-color: #3b82f6;
        color: white;
        
        &:hover {
          background: #2563eb;
          border-color: #2563eb;
        }
      `;
    }
    return `
      background: white;
      border-color: #d1d5db;
      color: #374151;
      
      &:hover {
        background: #f9fafb;
        border-color: #9ca3af;
      }
    `;
  }}
`;

interface MapFiltersProps {
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
  onClose?: () => void;
  isOpen: boolean;
  // Enquanto definimos os filtros definitivos, exibir apenas placeholder
  placeholderOnly?: boolean;
}

export default function MapFiltersComponent({ 
  filters, 
  onFiltersChange, 
  onClose,
  isOpen,
  placeholderOnly = true
}: MapFiltersProps) {
  const [localFilters, setLocalFilters] = useState<MapFilters>(filters);

  // Sincroniza estado local quando abrir ou quando props mudarem
  React.useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleTypeChange = (type: keyof Pick<MapFilters, 'showSima' | 'showFurnas' | 'showBalcar'>) => {
    const newFilters = { ...localFilters, [type]: !localFilters[type] };
    setLocalFilters(newFilters);
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const newDateRange = { 
      start: localFilters.dateRange?.start || '', 
      end: localFilters.dateRange?.end || '',
      ...{ [field]: value }
    };
    setLocalFilters({ ...localFilters, dateRange: newDateRange });
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose?.();
  };

  const resetFilters = () => {
    const defaultFilters: MapFilters = {
      showSima: true,
      showFurnas: true,
      showBalcar: true,
      dateRange: {
        start: '',
        end: ''
      },
      region: undefined
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  if (!isOpen) return null;

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>
          <Filter size={18} />
          Filtros do Mapa
        </FilterTitle>
        {onClose && (
          <CloseButton onClick={onClose}>
            <X size={16} />
          </CloseButton>
        )}
      </FilterHeader>

      {placeholderOnly ? (
        <div style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Em breve você poderá configurar filtros específicos para esta página.
          Por enquanto o mapa já apresenta apenas os dados do contexto atual
          (SIMA/FURNAS/BALCAR, conforme a página).
        </div>
      ) : (
        <>
          <FilterGrid>
            {/* UI antiga de filtros ficará disponível quando placeholderOnly=false */}
          </FilterGrid>
          <FilterActions>
            <ActionButton onClick={resetFilters}>Limpar Filtros</ActionButton>
            <ActionButton $variant="primary" onClick={applyFilters}>Aplicar Filtros</ActionButton>
          </FilterActions>
        </>
      )}
    </FilterContainer>
  );
}
