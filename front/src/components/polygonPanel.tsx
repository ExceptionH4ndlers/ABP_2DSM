// src/components/PolygonPanel.tsx
import styled from "styled-components";
import type { MapPoint } from "../hooks/useMapData";
import { X, Sparkles } from "lucide-react";

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
  font-size: 12px; /* 👈 fonte menor */
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
  /**
   * Callback quando uma estação é clicada na lista
   */
  onStationClick?: (station: MapPoint) => void;
}

const StationItem = styled.li<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$clickable ? "#f3f4f6" : "transparent")};
  }
`;

export default function PolygonPanel({
  polygons,
  points,
  onDeletePolygon,
  showOnlyIntersections = false,
  onStationClick,
}: PolygonPanelProps) {
  // mesmo teste de ponto dentro do polígono usado antes
  const isInside = (point: MapPoint, polygon: [number, number][]) => {
    const x = point.lat;
    const y = point.lng;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  };

  // todas as estações dentro de cada polígono
  const pointsInsideByPolygon = polygons.map((poly) => points.filter((p) => isInside(p, poly)));

  // Contar em quantos polígonos cada estação aparece (para indicador visual)
  const stationPolygonCount = new Map<string, number>();
  pointsInsideByPolygon.forEach((list) => {
    list.forEach((p) => {
      const key = String(p.id);
      stationPolygonCount.set(key, (stationPolygonCount.get(key) ?? 0) + 1);
    });
  });

  // se não for modo "interseção", renderiza direto
  if (!showOnlyIntersections) {
    return (
      <Panel>
        {polygons.map((_poly, index) => {
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

              <ul style={{ margin: 0, paddingLeft: 16, listStyle: "none" }}>
                {insidePoints.map((p) => {
                  const count = stationPolygonCount.get(String(p.id)) ?? 1;
                  const isInMultiple = count > 1;
                  return (
                    <StationItem
                      key={p.id}
                      $clickable={!!onStationClick}
                      onClick={() => onStationClick?.(p)}
                      title={
                        onStationClick
                          ? isInMultiple
                            ? `Clique para destacar no mapa. Esta estação está em ${count} polígonos.`
                            : "Clique para destacar no mapa"
                          : undefined
                      }
                    >
                      <Sparkles size={12} color="#f59e0b" style={{ flexShrink: 0 }} />
                      <span>
                        {p.name} ({p.lat.toFixed(3)}, {p.lng.toFixed(3)})
                        {isInMultiple && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: 10,
                              color: "#f59e0b",
                              fontWeight: 600,
                            }}
                            title={`Esta estação está em ${count} polígonos`}
                          >
                            ({count}×)
                          </span>
                        )}
                      </span>
                    </StationItem>
                  );
                })}
              </ul>
            </PolygonCard>
          );
        })}
      </Panel>
    );
  }

  // === MODO "SOMENTE INTERSEÇÃO ENTRE POLÍGONOS" ===
  // Usa o stationPolygonCount já calculado acima

  return (
    <Panel>
      {polygons.map((_poly, index) => {
        // para este polígono, mantenha apenas as estações que
        // aparecem em 2 ou mais polígonos -> interseção
        const intersectionPoints = pointsInsideByPolygon[index].filter((p) => {
          const count = stationPolygonCount.get(String(p.id)) ?? 0;
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
                Polígono {index + 1} • {intersectionPoints.length} estação(ões) em interseção
              </h4>
              <DeleteButton onClick={() => onDeletePolygon(index)}>
                <X size={13} />
              </DeleteButton>
            </CardHeader>

            <ul style={{ margin: 0, paddingLeft: 16, listStyle: "none" }}>
              {intersectionPoints.map((p) => {
                const count = stationPolygonCount.get(String(p.id)) ?? 2;
                return (
                  <StationItem
                    key={p.id}
                    $clickable={!!onStationClick}
                    onClick={() => onStationClick?.(p)}
                    title={
                      onStationClick
                        ? `Clique para destacar no mapa. Esta estação está em ${count} polígonos.`
                        : undefined
                    }
                  >
                    <Sparkles size={12} color="#f59e0b" style={{ flexShrink: 0 }} />
                    <span>
                      {p.name} ({p.lat.toFixed(3)}, {p.lng.toFixed(3)})
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 10,
                          color: "#f59e0b",
                          fontWeight: 600,
                        }}
                        title={`Esta estação está em ${count} polígonos`}
                      >
                        ({count}×)
                      </span>
                    </span>
                  </StationItem>
                );
              })}
            </ul>
          </PolygonCard>
        );
      })}
    </Panel>
  );
}
