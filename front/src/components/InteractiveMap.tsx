import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import { Maximize2, Minimize2, Filter } from "lucide-react";
import type { MapPoint, MapFilters } from "../hooks/useMapData";
import MapMarker from "./MapMarker";
import MapFiltersComponent from "./MapFilters";
import MarkerClusterGroup from "./MarkerClusterGroup";
import SkeletonMap from "./skeletons/SkeletonMap";
import { buffer as turfBuffer, point as turfPoint } from "@turf/turf";
import type { Feature, Polygon, MultiPolygon } from "geojson";
import { calculateBufferCoverage } from "../utils/bufferIntersections";
import type { BufferCoverageMetrics } from "../utils/bufferIntersections";
import { fetchBufferCoverage } from "../api/bufferApi";
import TicketCard from "./ticketCardMap";

// Importar CSS do Leaflet
import "leaflet/dist/leaflet.css";

// Fix para +-cones do Leaflet no React
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
    /* Remover margens/padding e ocupar toda a largura do wrapper */
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* Garantir que o bot+-o de fechar n+-o provoque deslocamento visual */
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

// Removidos controles flutuantes antigos (Filtros e Centralizar Brasil)

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
  width: 340px;
  max-width: calc(100vw - 2rem);
  z-index: 1100;
`;

const CoverageTitle = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 15px;
  margin-bottom: 8px;
`;

const CoverageSubtitle = styled.div`
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 12px;
`;

const SelectedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const SelectedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  color: #374151;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

const MetricCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const RadiusInput = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  margin-bottom: 10px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

const CoverageStatus = styled.div<{ $status: "idle" | "loading" | "ok" | "error" }>`
  font-size: 13px;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const StatusDot = styled.span<{ $status: "idle" | "loading" | "ok" | "error" }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: ${(props) => {
    switch (props.$status) {
      case "loading":
        return "#f59e0b";
      case "ok":
        return "#10b981";
      case "error":
        return "#ef4444";
      default:
        return "#d1d5db";
    }
  }};
`;
// === TICKETS (NÃO coloque dentro de outro styled!) ===

const TicketList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 12px;
  padding: 8px 0;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 6px;
  }
`;

const TicketMainValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 10px;
`;

const TicketDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
`;

const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #374151;
`;

const TicketHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #111827;
`;


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
      // Centro do Brasil
      map.setView([-15, -50], 5);
    }
  }, [map, points]);

  return null;
}

// Componente para for+-ar atualiza+-+-o de tiles e prevenir +-reas cinzas
function TileLayerFix() {
  const map = useMap();

  React.useEffect(() => {
    // Forçar redesenho dos tiles quando o mapa for movido ou zoom mudar
    const forceUpdate = () => {
      try {
        map.invalidateSize();
        // Pequeno delay para garantir que os tiles sejam recarregados
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

    // Forçar atualização inicial
    forceUpdate();

    return () => {
      map.off("moveend", forceUpdate);
      map.off("zoomend", forceUpdate);
      map.off("resize", forceUpdate);
    };
  }, [map]);

  return null;
}

interface InteractiveMapProps {
  points: MapPoint[];
  loading?: boolean;
  error?: string | null;
  onMarkerClick?: (point: MapPoint) => void;
  className?: string;
  filters?: MapFilters;
  onFiltersChange?: (filters: MapFilters) => void;
  // Controle externo opcional de abertura do painel de filtros
  filtersOpen?: boolean;
  onFiltersOpenChange?: (open: boolean) => void;
}

function CoverageTicket({
  item,
  formatPercent,
  formatArea,
}: {
  item: { label: string; metrics: BufferCoverageMetrics };
  formatPercent: (v: number) => string;
  formatArea: (v: number) => string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <TicketCard
      open={open}
      onClick={() => setOpen(!open)}
      title={item.label}
    >
      <TicketMainValue>
        {formatPercent(item.metrics.overlapOnUnionPercentage)}
      </TicketMainValue>

      <TicketDetails>
        <TicketRow>
          <span>Área A:</span> <span>{formatArea(item.metrics.areaA)}</span>
        </TicketRow>

        <TicketRow>
          <span>Área B:</span> <span>{formatArea(item.metrics.areaB)}</span>
        </TicketRow>

        <TicketRow>
          <span>Interseção:</span>{" "}
          <span>{formatArea(item.metrics.intersectionArea)}</span>
        </TicketRow>

        <TicketRow>
          <span>A % sobreposta:</span>{" "}
          <span>{formatPercent(item.metrics.aOverlapPercentage)}</span>
        </TicketRow>

        <TicketRow>
          <span>B % sobreposta:</span>{" "}
          <span>{formatPercent(item.metrics.bOverlapPercentage)}</span>
        </TicketRow>

        <TicketRow>
          <span>Exclusivo A:</span>{" "}
          <span>{formatArea(item.metrics.aExclusiveArea)}</span>
        </TicketRow>

        <TicketRow>
          <span>Exclusivo B:</span>{" "}
          <span>{formatArea(item.metrics.bExclusiveArea)}</span>
        </TicketRow>
      </TicketDetails>
    </TicketCard>
  );
}



export default function InteractiveMap({
  points,
  loading = false,
  error = null,
  onMarkerClick,
  className,
  filters,
  onFiltersChange,
  filtersOpen,
  onFiltersOpenChange,
}: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [internalShowFilters, setInternalShowFilters] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState<MapPoint[]>([]);
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [buffers, setBuffers] = useState<
    Array<{ point: MapPoint; buffer: Feature<Polygon | MultiPolygon> }>
  >([]);
  const [coverageList, setCoverageList] = useState<
    Array<{ label: string; metrics: BufferCoverageMetrics }>
  >([]);
  const [coverageStatus, setCoverageStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [coverageError, setCoverageError] = useState<string | null>(null);
  

  const parseRadiusInput = (value: string) => {
    const normalized = value.replace(",", ".");
    const numeric = Number.parseFloat(normalized);
    return numeric;
  };
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Limpar fullscreen quando componente desmontar
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fechar sidebar quando sair do fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      setSidebarOpen(false);
    }
  }, [isFullscreen]);

  const handleMarkerSelect = (point: MapPoint) => {
    setSelectedPoints((prev) => {
      const exists = prev.find((p) => p.id === point.id);
      if (exists) {
        return prev.filter((p) => p.id !== point.id);
      }
      return [...prev, point];
    });

    if (onMarkerClick) {
      onMarkerClick(point);
    }
  };

  useEffect(() => {
    const calculateCoverage = async () => {
      if (selectedPoints.length < 2) {
        console.info("[buffers] menos de 2 pontos selecionados, resetando cobertura");
        setCoverageList([]);
        setCoverageStatus("idle");
        setCoverageError(null);
        setBuffers([]);
        return;
      }

      if (!radiusKm || Number.isNaN(radiusKm) || radiusKm <= 0) {
        console.warn("[buffers] raio inválido", { radiusKm });
        setCoverageStatus("error");
        setCoverageError("Informe um raio valido em km.");
        setCoverageList([]);
        setBuffers([]);
        return;
      }

      setCoverageStatus("loading");
      setCoverageError(null);

      try {
        const generated = selectedPoints.map((point) => {
          const turfPointFeature = turfPoint([point.lng, point.lat]);
          const buffer = turfBuffer(turfPointFeature, radiusKm, { units: "kilometers", steps: 256 });
          return { point, buffer: buffer as Feature<Polygon | MultiPolygon> };
        });

        setBuffers(generated);
        console.info("[buffers] buffers gerados", {
          radiusKm,
          count: generated.length,
          points: generated.map((g) => ({ name: g.point.name, lat: g.point.lat, lng: g.point.lng })),
        });

        const pairPromises: Array<Promise<{ label: string; metrics: BufferCoverageMetrics } | null>> =
          [];
        for (let i = 0; i < generated.length; i += 1) {
          for (let j = i + 1; j < generated.length; j += 1) {
            const pairLabel = `${generated[i].point.name} - ${generated[j].point.name}`;
            pairPromises.push(
              (async () => {
                try {
                  const metrics = await fetchBufferCoverage(generated[i].buffer, generated[j].buffer);
                  console.info("[buffers] métricas via API", { pairLabel, metrics });
                  return { label: pairLabel, metrics };
                } catch (apiError) {
                  try {
                    const metrics = calculateBufferCoverage(
                      generated[i].buffer,
                      generated[j].buffer,
                    );
                    console.info("[buffers] métricas via cálculo local", { pairLabel, metrics, apiError });
                    return { label: pairLabel, metrics };
                  } catch (calcError) {
                    console.error("Erro ao calcular cobertura localmente:", calcError);
                    return null;
                  }
                }
              })(),
            );
          }
        }

        const results = await Promise.all(pairPromises);
        const filtered = results.filter(
          (item): item is { label: string; metrics: BufferCoverageMetrics } => Boolean(item),
        );

        if (filtered.length === 0) {
          setCoverageStatus("error");
          setCoverageError("Nao foi possivel calcular a cobertura dos buffers.");
          setCoverageList([]);
          return;
        }

        console.info("[buffers] resultados finais", filtered);
        setCoverageList(filtered);
        setCoverageStatus("ok");
      } catch (err) {
        setCoverageStatus("error");
        setCoverageError("Nao foi possivel calcular a cobertura dos buffers.");
        console.error("Erro ao calcular cobertura de buffers:", err);
      }
    };

    calculateCoverage();
  }, [selectedPoints, radiusKm]);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  const formatArea = (value: number) => {
    const km2 = value / 1_000_000;
    return `${km2.toFixed(2)} km²`;
  };


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
        <SkeletonMap showControls={true} />
      </MapWrapper>
    );
  }

  return (
    <>
      <MapWrapper className={className} $isFullscreen={isFullscreen}>
        {/* Bot+-o de fullscreen - sempre vis+-vel */}
        <FullscreenButton
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </FullscreenButton>

        {/* Bot+-o de filtros - apenas no fullscreen */}
        {isFullscreen && filters && onFiltersChange && (
          <FilterToggleButton onClick={toggleSidebar} aria-label="Abrir filtros">
            <Filter size={20} />
          </FilterToggleButton>
        )}

        {/* Filtros normais - apenas quando n+-o est+- em fullscreen */}
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
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          maxBounds={[
            [-85.05, -180],
            [85.05, 180],
          ]}
          maxBoundsViscosity={1.0}
          preferCanvas={false}
          fadeAnimation={true}
          zoomAnimation={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            noWrap={false}
            updateWhenZooming={true}
            updateWhenIdle={false}
            updateInterval={200}
            keepBuffer={4}
            tileSize={256}
            zoomOffset={0}
            errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />

          <TileLayerFix />
          <MapCenter points={points} />

          {buffers.map(({ buffer }, index) => {
            const colors = ["#2563eb", "#dc2626", "#16a34a", "#f59e0b", "#9333ea", "#0891b2"];
            const color = colors[index % colors.length];
            return (
              <GeoJSON
                key={index}
                data={buffer}
                style={{
                  color,
                  weight: 2,
                  fillColor: color,
                  fillOpacity: 0.15,
                }}
              />
            );
          })}

          <MarkerClusterGroup>
            {points.map((point) => (
              <MapMarker key={point.id} point={point} onClick={handleMarkerSelect} />
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        <CoveragePanel>
          <CoverageTitle>Analise de cobertura de buffers</CoverageTitle>
          <CoverageSubtitle>Selecione dois ou mais pontos no mapa para comparar sobreposicao.</CoverageSubtitle>

          <RadiusInput
            type="number"
            min="0.1"
            step="0.1"
            value={radiusKm}
            onChange={(event) => setRadiusKm(parseRadiusInput(event.target.value))}
            placeholder="Raio do buffer (km)"
          />

          <SelectedList>
            {selectedPoints.length === 0 && (
              <SelectedItem>
                <span>Nenhum ponto selecionado.</span>
                <span style={{ color: "#6b7280", fontSize: "12px" }}>Clique em marcadores para adicionar.</span>
              </SelectedItem>
            )}
            {selectedPoints.map((point, index) => (
              <SelectedItem key={point.id}>
                <span>
                  Buffer {index + 1}: {point.name}
                </span>
                <span style={{ color: "#6b7280", fontSize: "12px" }}>
                  {point.type.toUpperCase()} - {point.lat.toFixed(2)}, {point.lng.toFixed(2)}
                </span>
              </SelectedItem>
            ))}
          </SelectedList>

          <CoverageStatus $status={coverageStatus}>
            <StatusDot $status={coverageStatus} />
            {coverageStatus === "loading" && "Calculando cobertura..."}
            {coverageStatus === "ok" && "Cobertura calculada com sucesso."}
            {coverageStatus === "idle" && "Selecione ao menos dois pontos para comparar."}
            {coverageStatus === "error" && (coverageError || "Erro ao calcular cobertura.")}
          </CoverageStatus>

          {coverageList.length > 0 && (
            <TicketList>
              {coverageList.map((item) => (
                <CoverageTicket
                  key={item.label}
                  item={item}
                  formatPercent={formatPercent}
                  formatArea={formatArea}
                />
              ))}
            </TicketList>
          )}


        </CoveragePanel>
      </MapWrapper>

      {/* Sidebar de filtros no fullscreen */}
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





