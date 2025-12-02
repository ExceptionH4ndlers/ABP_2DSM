// src/components/InteractiveMap.tsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import { Maximize2, Minimize2 } from "lucide-react";
import type { MapPoint } from "../hooks/useMapData";
import SkeletonMap from "./skeletons/SkeletonMap";
import StationPopup from "./StationPopup";

// Importar CSS do Leaflet
import "leaflet/dist/leaflet.css";

// Fix para ícones do Leaflet no React
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

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

  /* Esconder tiles brancos/erros */
  .leaflet-tile-container img[src=""],
  .leaflet-tile-container img:not([src]),
  .leaflet-error-tile {
    display: none !important;
    opacity: 0 !important;
  }

  /* Estilização dos popups do Leaflet */
  .leaflet-popup-content-wrapper {
    border-radius: 20px !important;
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
    overflow: visible !important;
    background: transparent !important;
  }

  .leaflet-popup-content {
    margin: 0 !important;
    padding: 0 !important;
    width: auto !important;
    min-width: 200px !important;
    max-width: none !important;
    line-height: 1.5 !important;
  }

  .station-popup .leaflet-popup-content-wrapper {
    background: transparent !important;
    padding: 0 !important;
  }

  .station-popup .leaflet-popup-content {
    margin: 0 !important;
    padding: 0 !important;
    width: auto !important;
    max-width: none !important;
  }

  .station-popup .leaflet-popup-content > div {
    max-width: none !important;
    width: max-content !important;
    min-width: 200px !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    overflow: visible !important;
  }

  .station-popup .leaflet-popup-content > div > div:first-child {
    overflow: visible !important;
    max-width: none !important;
  }

  .station-popup .leaflet-popup-content > div > div:first-child > div:last-child {
    max-width: none !important;
    overflow: visible !important;
  }

  .station-popup .leaflet-popup-content > div > div:first-child > div:last-child > h3 {
    max-width: none !important;
    overflow: visible !important;
    text-overflow: clip !important;
  }

  .station-popup .leaflet-popup-content-wrapper {
    position: relative !important;
  }

  .station-popup .leaflet-popup-close-button {
    display: none !important;
  }

  .leaflet-popup-tip {
    background: white !important;
    border: 2px solid #e2e8f0 !important;
    border-top: none !important;
    border-right: none !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .leaflet-popup-close-button {
    width: 28px !important;
    height: 28px !important;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 18px !important;
    font-weight: bold !important;
    color: rgba(255, 255, 255, 0.9) !important;
    background: rgba(0, 0, 0, 0.2) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.2s ease !important;
    z-index: 1000 !important;
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    line-height: 1 !important;
    text-decoration: none !important;
  }

  .leaflet-popup-close-button:hover {
    background: rgba(0, 0, 0, 0.4) !important;
    color: white !important;
    transform: scale(1.1) !important;
  }

  .station-popup {
    border-radius: 20px !important;
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

const FullscreenButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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


// Componente para atualizar tamanho do mapa quando entrar/sair do fullscreen
function MapSizeUpdater({ isFullscreen }: { isFullscreen: boolean }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map, isFullscreen]);

  return null;
}

interface InteractiveMapProps {
  points?: MapPoint[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export default function InteractiveMap({
  points = [],
  loading = false,
  error = null,
  className,
}: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsFullscreen(false);
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

  // Limitar a 50 marcadores
  const limitedPoints = Array.isArray(points) ? points.slice(0, 50) : [];

  return (
    <MapWrapper className={className} $isFullscreen={isFullscreen}>
      <FullscreenButton
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
      >
        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </FullscreenButton>

      <MapContainer
        key={isFullscreen ? "fullscreen" : "normal"}
        center={[-15, -50]}
        zoom={isFullscreen ? 4 : 5}
        minZoom={isFullscreen ? 4 : 3}
        maxZoom={18}
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
        worldCopyJump={false}
      >
        <MapSizeUpdater isFullscreen={isFullscreen} />
        
        {/* Basemap Satélite */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
          maxNativeZoom={18}
          noWrap={true}
          keepBuffer={10}
          updateWhenZooming={true}
          updateWhenIdle={true}
        />

        {/* Camada de labels: Ruas, cidades, estados */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
          maxNativeZoom={18}
          opacity={0.7}
          noWrap={true}
          keepBuffer={10}
          updateWhenZooming={true}
          updateWhenIdle={true}
        />

        {/* Marcadores */}
        {limitedPoints.map((point) => {
          if (
            typeof point.lat !== "number" ||
            typeof point.lng !== "number" ||
            isNaN(point.lat) ||
            isNaN(point.lng)
          ) {
            return null;
          }

          return (
            <Marker key={point.id || `${point.lat}-${point.lng}`} position={[point.lat, point.lng]}>
              <Popup className="station-popup" maxWidth={600} closeButton={true} autoPan={true}>
                <StationPopup point={point} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </MapWrapper>
  );
}
