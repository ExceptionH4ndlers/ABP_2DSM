// src/components/PolygonPanel.tsx
import styled from "styled-components";
import type { MapPoint } from "../hooks/useMapData";
import { X } from "lucide-react";

const Panel = styled.div`
  margin-top: 8px;
  max-height: 260px;
  overflow-y: auto;
`;

const PolygonCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 8px;
  font-size: 12px;           /* 👈 fonte menor */
  line-height: 1.3;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;

  h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: #111827;
  }
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: #ffffff;
  border: none;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;

  &:hover {
    background: #dc2626;
  }
`;

interface PolygonPanelProps {
  polygons: [number, number][][];
  points: MapPoint[];
  onDeletePolygon: (index: number) => void;
  /**
   * true  -> mostrar somente estações que estão em interseção de 2+ polígonos
   * false -> mostrar todas as estações dentro de cada polígono
   */
  showOnlyIntersections?: boolean;
}

export default function PolygonPanel({
  polygons,
  points,
  onDeletePolygon,
  showOnlyIntersections = false,
}: PolygonPanelProps) {
  // mesmo teste de ponto dentro do polígono usado antes
  const isInside = (point: MapPoint, polygon: [number, number][]) => {
    const x = point.lat;
    const y = point.lng;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  };

  // todas as estações dentro de cada polígono
  const pointsInsideByPolygon = polygons.map((poly) =>
    points.filter((p) => isInside(p, poly)),
  );

  // se não for modo "interseção", renderiza direto
  if (!showOnlyIntersections) {
    return (
      <Panel>
        {polygons.map((poly, index) => {
          const insidePoints = pointsInsideByPolygon[index];

          return (
            <PolygonCard key={index}>
              <CardHeader>
                <h4>
                  Polígono {index + 1} • {insidePoints.length} estação(ões)
                </h4>
                <DeleteButton onClick={() => onDeletePolygon(index)}>
                  <X size={13} />
                </DeleteButton>
              </CardHeader>

              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {insidePoints.map((p) => (
                  <li key={p.id}>
                    {p.name} ({p.lat.toFixed(3)}, {p.lng.toFixed(3)})
                  </li>
                ))}
              </ul>
            </PolygonCard>
          );
        })}
      </Panel>
    );
  }

  // === MODO "SOMENTE INTERSEÇÃO ENTRE POLÍGONOS" ===
  // conta em quantos polígonos cada estação aparece
  const pointCounts = new Map<string, number>();
  pointsInsideByPolygon.forEach((list) => {
    list.forEach((p) => {
      const key = String(p.id);
      pointCounts.set(key, (pointCounts.get(key) ?? 0) + 1);
    });
  });

  return (
    <Panel>
      {polygons.map((poly, index) => {
        // para este polígono, mantenha apenas as estações que
        // aparecem em 2 ou mais polígonos -> interseção
        const intersectionPoints = pointsInsideByPolygon[index].filter((p) => {
          const count = pointCounts.get(String(p.id)) ?? 0;
          return count >= 2;
        });

        // se não houver nenhuma estação em interseção, não mostra o card
        if (intersectionPoints.length === 0) {
          return null;
        }

        return (
          <PolygonCard key={index}>
            <CardHeader>
              <h4>
                Polígono {index + 1} • {intersectionPoints.length} estação(ões) em
                interseção
              </h4>
              <DeleteButton onClick={() => onDeletePolygon(index)}>
                <X size={13} />
              </DeleteButton>
            </CardHeader>

            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {intersectionPoints.map((p) => (
                <li key={p.id}>
                  {p.name} ({p.lat.toFixed(3)}, {p.lng.toFixed(3)})
                </li>
              ))}
            </ul>
          </PolygonCard>
        );
      })}
    </Panel>
  );
}
