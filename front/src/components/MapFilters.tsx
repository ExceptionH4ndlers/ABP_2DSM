import React, { useState } from "react";
import styled from "styled-components";
import { Filter, X, Image as ImageIcon } from "lucide-react";
import type { MapFilters } from "../hooks/useMapData";
import { toPng, toJpeg } from "html-to-image";

const FilterContainer = styled.div<{ $isSidebar?: boolean }>`
  background: white;
  border-radius: ${(props) => (props.$isSidebar ? "0" : "16px")};
  padding: 1.5rem;
  box-shadow: ${(props) => (props.$isSidebar ? "none" : "0 4px 20px rgba(0, 0, 0, 0.1)")};
  border: ${(props) => (props.$isSidebar ? "none" : "1px solid #e2e8f0")};
  margin-bottom: ${(props) => (props.$isSidebar ? "0" : "1rem")};
  height: ${(props) => (props.$isSidebar ? "100%" : "auto")};
  display: ${(props) => (props.$isSidebar ? "flex" : "block")};
  flex-direction: ${(props) => (props.$isSidebar ? "column" : "row")};
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

const FilterActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

// Botão reutilizável com variação de estilo
const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;

  ${({ $variant = "secondary" }) => {
    if ($variant === "primary") {
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
  placeholderOnly?: boolean;
  isSidebar?: boolean;
}

export default function MapFiltersComponent({
  filters,
  onFiltersChange,
  onClose,
  isOpen,
  placeholderOnly = true,
  isSidebar = false,
}: MapFiltersProps) {
  const [localFilters, setLocalFilters] = useState<MapFilters>(filters);

  React.useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [filters, isOpen]);

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose?.();
  };

  const resetFilters = () => {
    const defaultFilters: MapFilters = {
      showSima: true,
      showFurnas: true,
      showBalcar: true,
      dateRange: { start: "", end: "" },
      region: undefined,
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  // 🔹 Função de exportação do gráfico
  const exportGraph = async (format: "png" | "jpeg") => {
    try {
      // Alvo do mapa (ajuste o seletor conforme o seu componente)
      const mapElement = document.querySelector("#map-container");
      if (!mapElement) {
        console.warn("Elemento do mapa não encontrado (#map-container).");
        return;
      }

      const dataUrl =
        format === "png"
          ? await toPng(mapElement as HTMLElement)
          : await toJpeg(mapElement as HTMLElement, { quality: 0.95 });

      const link = document.createElement("a");
      link.download = `grafico-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao exportar gráfico:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <FilterContainer $isSidebar={isSidebar}>
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
        <div style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Em breve você poderá configurar filtros específicos para esta página. Por enquanto o mapa
          já apresenta apenas os dados do contexto atual (SIMA/FURNAS/BALCAR, conforme a página).
        </div>
      ) : (
        <>
          <FilterGrid>{/* futuros filtros aqui */}</FilterGrid>
          <FilterActions>
            <ActionButton onClick={resetFilters}>Limpar Filtros</ActionButton>
            <ActionButton $variant="primary" onClick={applyFilters}>
              Aplicar Filtros
            </ActionButton>
            {/* 🔽 Botões de exportação adicionados abaixo */}
            <ActionButton onClick={() => exportGraph("png")}>
              <ImageIcon size={16} style={{ marginRight: "4px" }} />
              Exportar PNG
            </ActionButton>
            <ActionButton onClick={() => exportGraph("jpeg")}>
              <ImageIcon size={16} style={{ marginRight: "4px" }} />
              Exportar JPEG
            </ActionButton>
          </FilterActions>
        </>
      )}
    </FilterContainer>
  );
}
