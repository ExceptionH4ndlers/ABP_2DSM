import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import type { MapPoint, MapFilters } from '../hooks/useMapData';
import MapMarker from './MapMarker';
import MapFiltersComponent from './MapFilters';
import MarkerClusterGroup from './MarkerClusterGroup';

// Importar CSS do Leaflet
import 'leaflet/dist/leaflet.css';

// Fix para ícones do Leaflet no React
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapWrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;

  ${({ theme }) => theme.media.mobile} {
    height: 400px;
  }

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 16px;
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  border-radius: 16px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #64748b;
  font-weight: 500;
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

interface MapCenterProps {
  points: MapPoint[];
}

function MapCenter({ points }: MapCenterProps) {
  const map = useMap();

  React.useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(
        points.map(point => [point.lat, point.lng])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      // Centro do Brasil
      map.setView([-15, -50], 5);
    }
  }, [map, points]);

  return null;
}

interface InteractiveMapProps {
  points: MapPoint[];
  loading?: boolean;
  error?: string | null;
  showControls?: boolean;
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
  showControls = true,
  onMarkerClick,
  className,
  filters,
  onFiltersChange,
  filtersOpen,
  onFiltersOpenChange
}: InteractiveMapProps) {
  const [internalShowFilters, setInternalShowFilters] = useState(false);
  const showFilters = filtersOpen ?? internalShowFilters;
  const setShowFilters = (open: boolean) => {
    if (onFiltersOpenChange) onFiltersOpenChange(open);
    else setInternalShowFilters(open);
  };

  if (error) {
    return (
      <MapWrapper className={className}>
        <ErrorMessage>{error}</ErrorMessage>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper className={className}>
      {loading && (
        <LoadingOverlay>
          <LoadingText>Carregando mapa...</LoadingText>
        </LoadingOverlay>
      )}
      
      {showFilters && filters && onFiltersChange && (
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
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        
        <MapCenter points={points} />
        
        <MarkerClusterGroup>
          {points.map((point) => (
            <MapMarker
              key={point.id}
              point={point}
              onClick={onMarkerClick}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </MapWrapper>
  );
}
