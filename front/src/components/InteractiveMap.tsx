// src/components/InteractiveMap.tsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON, CircleMarker } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import { Maximize2, Minimize2, Filter } from "lucide-react";
import type { MapPoint, MapFilters } from "../hooks/useMapData";
import MapFiltersComponent from "./MapFilters";
import MarkerClusterGroup from "./MarkerClusterGroup";
import SkeletonMap from "./skeletons/SkeletonMap";
import { MapClickHandler } from "./MapClickHandler";
import type { LatLngTuple, PolygonSelection } from "../utils/polygonUtils";
import { getStationsByPolygon } from "../utils/polygonUtils";

// Importar CSS do Leaflet
import "leaflet/dist/leaflet.css";
import { PolygonControls } from "./polygonControls";
import PolygonPanel from "./polygonPanel";
import RevealedStationMarker from "./RevealedStationMarker";

// Fix para ícones do Leaflet no React
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapWrapper = styled.div<{ $isFullscreen?: boolean }>`
  width: ${(props) => (props.$isFullscreen ? "100vw" : "100%")};
  height: ${(props) => (props.$isFullscreen ? "100vh" : "400px")};
  border-radius: ${(props) => (props.$isFullscreen ? "0" : "16px")};
  overflow: hidden;
  box-shadow: ${(props) => (props.$isFullscreen ? "none" : "0 4px 20px rgba(0, 0, 0, 0.1)")};
  border: ${(props) => (props.$isFullscreen ? "none" : "1px solid #e2e8f0")};
  position: ${(props) => (props.$isFullscreen ? "fixed" : "relative")};
  top: ${(props) => (props.$isFullscreen ? "0" : "auto")};
  left: ${(props) => (props.$isFullscreen ? "0" : "auto")};
  right: ${(props) => (props.$isFullscreen ? "0" : "auto")};
  bottom: ${(props) => (props.$isFullscreen ? "0" : "auto")};
  z-index: ${(props) => (props.$isFullscreen ? "9999" : "auto")};

  ${({ theme }) => theme.media.md} {
    height: ${(props) => (props.$isFullscreen ? "100vh" : "500px")};
  }

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: ${(props) => (props.$isFullscreen ? "0" : "16px")};
  }

  .leaflet-popup-content-wrapper {
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    padding: 0 !important;
  }

  .leaflet-popup-content {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    box-sizing: border-box;
    font-family: inherit;
  }

  .leaflet-popup-close-button {
    top: 6px !important;
    right: 6px !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .leaflet-popup-tip {
    background: white;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 16px 24px;
  color: #dc2626;
  font-weight: 500;
  text-align: center;
  z-index: 2000;
`;

const ControlButton = styled.button`
  position: absolute;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #374151;

  &:hover {
    background: #f9fafb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const FullscreenButton = styled(ControlButton)`
  top: 1rem;
  right: 1rem;
`;

const FilterToggleButton = styled(ControlButton)`
  bottom: 1rem;
  left: 1rem;
  top: auto;
`;

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

const Sidebar = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 400px;
  max-width: 90vw;
  background: white;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 10001;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const CoveragePanel = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 380px;
  max-width: calc(100vw - 2rem);
  z-index: 1100;
`;

// Componentes styled removidos - não utilizados (TicketMainValue, TicketDetails, TicketRow)

// ===== MAP CENTER / TILE FIX =====

interface MapCenterProps {
  points: MapPoint[];
}

function MapCenter({ points }: MapCenterProps) {
  const map = useMap();

  React.useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng]));
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      map.setView([-15, -50], 5);
    }
  }, [map, points]);

  return null;
}

function TileLayerFix() {
  const map = useMap();

  React.useEffect(() => {
    const forceUpdate = () => {
      try {
        map.invalidateSize();
        setTimeout(() => {
          try {
            map.invalidateSize();
          } catch {
            /* noop */
          }
        }, 100);
      } catch {
        /* noop */
      }
    };

    map.on("moveend", forceUpdate);
    map.on("zoomend", forceUpdate);
    map.on("resize", forceUpdate);

    forceUpdate();

    return () => {
      map.off("moveend", forceUpdate);
      map.off("zoomend", forceUpdate);
      map.off("resize", forceUpdate);
    };
  }, [map]);

  return null;
}

// ===== PROPS =====

interface InteractiveMapProps {
  points: MapPoint[];
  loading?: boolean;
  error?: string | null;
  onMarkerClick?: (point: MapPoint) => void; // mantido, mas não usamos mais
  className?: string;
  filters?: MapFilters;
  onFiltersChange?: (filters: MapFilters) => void;
  filtersOpen?: boolean;
  onFiltersOpenChange?: (open: boolean) => void;
}

// CoverageTicket removido - não utilizado

// ===== MAIN COMPONENT =====

export default function InteractiveMap({
  points,
  loading = false,
  error = null,
  className,
  filters,
  onFiltersChange,
  filtersOpen,
  onFiltersOpenChange,
}: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [internalShowFilters, setInternalShowFilters] = useState(false);

  // Polígonos desenhados
  const [drawing, setDrawing] = useState(false);
  const [currentPolygonPoints, setCurrentPolygonPoints] = useState<LatLngTuple[]>([]);
  const [polygons, setPolygons] = useState<LatLngTuple[][]>([]);
  const [, setPolygonSelections] = useState<PolygonSelection[]>([]);
  const [showOnlyPolygonIntersections] = useState(false);
  const [clickPoints, setClickPoints] = useState<LatLngTuple[]>([]); // pontos de clique visuais

  // Sistema de revelação de estações
  const [revealedStations, setRevealedStations] = useState<MapPoint[]>([]);
  const [highlightedStationId, setHighlightedStationId] = useState<string | null>(null);
  const [stationToOpenPopup, setStationToOpenPopup] = useState<string | null>(null);

  const showFilters = filtersOpen ?? internalShowFilters;
  const setShowFilters = (open: boolean) => {
    if (onFiltersOpenChange) onFiltersOpenChange(open);
    else setInternalShowFilters(open);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsFullscreen(false);
      setSidebarOpen(false);
      document.body.style.overflow = "";
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) setSidebarOpen(false);
  }, [isFullscreen]);

  // Polígonos → estações dentro e sistema de revelação
  useEffect(() => {
    if (polygons.length === 0) {
      setPolygonSelections([]);
      setRevealedStations([]);
      return;
    }

    const selections = getStationsByPolygon(polygons, points);
    setPolygonSelections(selections);

    // Coletar todas as estações únicas dentro de todos os polígonos
    const allRevealedPoints = new Map<string, MapPoint>();
    selections.forEach((selection) => {
      selection.points.forEach((point) => {
        allRevealedPoints.set(point.id, point);
      });
    });

    setRevealedStations(Array.from(allRevealedPoints.values()));
  }, [polygons, points]);

  // formatPercent e formatArea removidos - não utilizados

  if (error) {
    return (
      <MapWrapper className={className}>
        <ErrorMessage>{error}</ErrorMessage>
      </MapWrapper>
    );
  }

  if (loading) {
    return (
      <MapWrapper className={className} $isFullscreen={isFullscreen}>
        <SkeletonMap showControls />
      </MapWrapper>
    );
  }

  const handleDeletePolygon = (index: number) => {
    setPolygons((prev) => {
      const polyToDelete = prev[index];

      // remove pontos visuais associados
      setClickPoints((prevClicks) =>
        prevClicks.filter(
          (pt) => !polyToDelete.some((polyPt) => polyPt[0] === pt[0] && polyPt[1] === pt[1]),
        ),
      );

      // A remoção do polígono vai disparar o useEffect que recalcula revealedStations
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <MapWrapper className={className} $isFullscreen={isFullscreen}>
        <FullscreenButton
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </FullscreenButton>

        {isFullscreen && filters && onFiltersChange && (
          <FilterToggleButton onClick={toggleSidebar} aria-label="Abrir filtros">
            <Filter size={20} />
          </FilterToggleButton>
        )}

        {!isFullscreen && showFilters && filters && onFiltersChange && (
          <MapFiltersComponent
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClose={() => setShowFilters(false)}
            isOpen={showFilters}
            placeholderOnly
          />
        )}

        <MapContainer
          center={[-15, -50]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          zoomControl
          scrollWheelZoom
          doubleClickZoom
          dragging
          maxBounds={[
            [-85.05, -180],
            [85.05, 180],
          ]}
          maxBoundsViscosity={1.0}
          preferCanvas={false}
          fadeAnimation
          zoomAnimation
        >
          {/* Handler de clique para desenhar polígonos */}
          <MapClickHandler
            drawing={drawing}
            onAddPoint={(latlng) => {
              const newPoint: LatLngTuple = [latlng.lat, latlng.lng];
              setCurrentPolygonPoints((prev) => [...prev, newPoint]);
              setClickPoints((prev) => [...prev, newPoint]); // ponto visual
            }}
          />

          {/* Polígono em desenho (não-interativo, para permitir clique por cima) */}
          {currentPolygonPoints.length > 0 && (
            <GeoJSON
              data={
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        ...currentPolygonPoints.map(([lat, lng]) => [lng, lat]),
                        [currentPolygonPoints[0][1], currentPolygonPoints[0][0]],
                      ],
                    ],
                  },
                } as GeoJSON.Feature<GeoJSON.Polygon>
              }
              style={{
                color: "#000",
                weight: 2,
                fillOpacity: 0.1,
                dashArray: "4 4",
              }}
              interactive={false}
            />
          )}

          {/* Polígonos finalizados (não-interativos para permitir novo clique por cima) */}
          {polygons.map((poly, idx) => (
            <GeoJSON
              key={idx}
              data={
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [...poly.map(([lat, lng]) => [lng, lat]), [poly[0][1], poly[0][0]]],
                    ],
                  },
                } as GeoJSON.Feature<GeoJSON.Polygon>
              }
              style={{
                color: "#f59e0b",
                weight: 2,
                fillColor: "#fbbf24",
                fillOpacity: 0.15,
              }}
              interactive={false}
            />
          ))}

          {/* Pontos de clique para indicar onde foi clicado */}
          {clickPoints.map(([lat, lng], idx) => (
            <CircleMarker
              key={`click-${idx}`}
              center={[lat, lng]}
              radius={4}
              pathOptions={{
                color: "#f59e0b",
                fillColor: "#fbbf24",
                fillOpacity: 1,
              }}
            />
          ))}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            noWrap={false}
            updateWhenZooming
            updateWhenIdle={false}
            updateInterval={200}
            keepBuffer={4}
            tileSize={256}
            zoomOffset={0}
            errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />

          <TileLayerFix />
          <MapCenter points={points} />

          {/* Marcadores de estações reveladas (apenas quando polígonos são desenhados) */}
          {revealedStations.length > 0 && (
            <MarkerClusterGroup>
              {revealedStations.map((point) => (
                <RevealedStationMarker
                  key={point.id}
                  point={point}
                  isHighlighted={highlightedStationId === point.id}
                  shouldOpenPopup={stationToOpenPopup === point.id}
                />
              ))}
            </MarkerClusterGroup>
          )}
        </MapContainer>

        {/* Painel de cobertura + polígonos (tickets + lista de estações) */}
        <CoveragePanel>
          <div style={{ marginBottom: 10 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
              🟧 Ferramenta de Polígonos
            </h3>

            <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 6 }}>
              Desenhe polígonos diretamente no mapa para revelar as estações dentro da área
              selecionada. As estações aparecerão como marcadores destacados no mapa e na lista
              abaixo.
            </p>

            {revealedStations.length > 0 && (
              <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, marginBottom: 6 }}>
                ✨ {revealedStations.length} estação(ões) revelada(s)
              </p>
            )}

            <p style={{ fontSize: 12, color: "#ef4444" }}>
              ⚠ Ao excluir um polígono, as estações reveladas por ele desaparecerão. As linhas do
              polígono são interligadas na ordem dos cliques.
            </p>
          </div>

          {/* Toggle de interseção de polígonos (a lógica de interseção não está aqui ainda) */}
          {polygons.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#374151",
              }}
            ></div>
          )}

          {/* Controles de polígonos + lista de estações dentro */}
          <PolygonControls
            drawing={drawing}
            currentPolygonPointsCount={currentPolygonPoints.length}
            hasPolygons={polygons.length > 0}
            onStart={() => {
              setDrawing(true);
              setCurrentPolygonPoints([]);
            }}
            onStop={() => setDrawing(false)}
            onClosePolygon={() => {
              if (currentPolygonPoints.length >= 3) {
                setPolygons((prev) => [...prev, currentPolygonPoints]);
                setCurrentPolygonPoints([]);
                setDrawing(false);
              }
            }}
            onClearAll={() => {
              setCurrentPolygonPoints([]);
              setPolygons([]);
              setPolygonSelections([]);
              setClickPoints([]); // limpa marcações visuais também
              setRevealedStations([]); // limpa estações reveladas
            }}
          />
          {polygons.length > 0 && (
            <PolygonPanel
              polygons={polygons}
              points={points}
              onDeletePolygon={handleDeletePolygon}
              showOnlyIntersections={showOnlyPolygonIntersections}
              onStationClick={(station) => {
                setHighlightedStationId(station.id);
                setStationToOpenPopup(station.id);
                // Remover destaque e popup após 3 segundos
                setTimeout(() => {
                  setHighlightedStationId(null);
                  setStationToOpenPopup(null);
                }, 3000);
              }}
            />
          )}
        </CoveragePanel>
      </MapWrapper>

      {isFullscreen && filters && onFiltersChange && (
        <>
          <SidebarOverlay $isOpen={sidebarOpen} onClick={toggleSidebar} />
          <Sidebar $isOpen={sidebarOpen}>
            <MapFiltersComponent
              filters={filters}
              onFiltersChange={onFiltersChange}
              onClose={toggleSidebar}
              isOpen={sidebarOpen}
              placeholderOnly
              isSidebar
            />
          </Sidebar>
        </>
      )}
    </>
  );
}
