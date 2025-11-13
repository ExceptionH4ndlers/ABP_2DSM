import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import { Maximize2, Minimize2, Filter } from "lucide-react";
import type { MapPoint, MapFilters } from "../hooks/useMapData";
import MapMarker from "./MapMarker";
import MapFiltersComponent from "./MapFilters";
import MarkerClusterGroup from "./MarkerClusterGroup";
import SkeletonMap from "./skeletons/SkeletonMap";

// Importar CSS do Leaflet
import "leaflet/dist/leaflet.css";

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
    /* Remover margens/padding e ocupar toda a largura do wrapper */
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* Garantir que o botão de fechar não provoque deslocamento visual */
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

// Componente para forçar atualização de tiles e prevenir áreas cinzas
function TileLayerFix() {
  const map = useMap();

  React.useEffect(() => {
    // Forçar redesenho dos tiles quando o mapa for movido ou zoom mudar
    const forceUpdate = () => {
      map.invalidateSize();
      // Pequeno delay para garantir que os tiles sejam recarregados
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
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
        {/* Botão de fullscreen - sempre visível */}
        <FullscreenButton
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </FullscreenButton>

        {/* Botão de filtros - apenas no fullscreen */}
        {isFullscreen && filters && onFiltersChange && (
          <FilterToggleButton onClick={toggleSidebar} aria-label="Abrir filtros">
            <Filter size={20} />
          </FilterToggleButton>
        )}

        {/* Filtros normais - apenas quando não está em fullscreen */}
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

          <MarkerClusterGroup>
            {points.map((point) => (
              <MapMarker key={point.id} point={point} onClick={onMarkerClick} />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
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
