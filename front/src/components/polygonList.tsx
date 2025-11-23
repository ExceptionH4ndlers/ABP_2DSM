// src/components/PolygonList.tsx
import styled from "styled-components";
import type { PolygonSelection } from "../utils/polygonUtils";

const ListWrapper = styled.div`
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
`;

const PolygonBlock = styled.div`
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 8px 10px;
  margin-bottom: 8px;
  background: #f9fafb;
`;

const PolygonHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const StationItem = styled.div`
  font-size: 12px;
  color: #4b5563;
  padding: 2px 0;
`;

interface PolygonListProps {
  selections: PolygonSelection[];
}

export function PolygonList({ selections }: PolygonListProps) {
  if (selections.length === 0) {
    return (
      <ListWrapper>
        <SectionTitle>Estações dentro de polígonos</SectionTitle>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Nenhuma estação encontrada.</div>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <SectionTitle>Estações dentro de polígonos</SectionTitle>
      {selections.map((sel) => (
        <PolygonBlock key={sel.polygonIndex}>
          <PolygonHeader>
            Polígono {sel.polygonIndex + 1} • {sel.points.length} estação(ões)
          </PolygonHeader>
          {sel.points.map((pt) => (
            <StationItem key={pt.id}>
              • {pt.name} ({pt.lat.toFixed(3)}, {pt.lng.toFixed(3)})
            </StationItem>
          ))}
        </PolygonBlock>
      ))}
    </ListWrapper>
  );
}
