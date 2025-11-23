import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import { MapPin, Calendar, Map } from "lucide-react";
import type { MapPoint } from "../hooks/useMapData";

const PopupContent = styled.div`
  min-width: 250px;
  max-width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: white;
    z-index: 1;
  }
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 16px 16px 8px 16px;
  border-bottom: 1px solid #e2e8f0;
`;

const PopupIcon = styled.div<{ type: "sima" | "furnas" | "balcar" }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${(props) => {
    switch (props.type) {
      case "sima":
        return "linear-gradient(135deg, #3b82f6, #1d4ed8)";
      case "furnas":
        return "linear-gradient(135deg, #22c55e, #16a34a)";
      case "balcar":
        return "linear-gradient(135deg, #f97316, #ea580c)";
      default:
        return "#64748b";
    }
  }};
`;

const PopupTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const PopupSubtitle = styled.p`
  font-size: 12px;
  color: #64748b;
  margin: 0;
`;

const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px 16px 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #374151;
  min-width: 80px;
`;

const InfoValue = styled.span`
  color: #64748b;
`;

const Coordinates = styled.div`
  background: #f8fafc;
  border-radius: 6px;
  padding: 8px;
  font-family: "Courier New", monospace;
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
`;

const PeriodInfo = styled.div`
  background: #f0fdf4;
  border-radius: 6px;
  padding: 8px;
  margin-top: 8px;
`;

const PeriodText = styled.div`
  font-size: 12px;
  color: #166534;
  font-weight: 500;
`;

const ActionButton = styled.button`
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #2563eb;
  }

  &:active {
    transform: translateY(1px);
  }
`;

interface RevealedStationMarkerProps {
  point: MapPoint;
  isHighlighted?: boolean;
  shouldOpenPopup?: boolean;
}

function RevealedStationMarkerInner({
  point,
  isHighlighted = false,
  shouldOpenPopup = false,
}: RevealedStationMarkerProps) {
  const map = useMap();
  const markerRef = React.useRef<L.Marker>(null);

  React.useEffect(() => {
    if (shouldOpenPopup && markerRef.current) {
      markerRef.current.openPopup();
      map.setView([point.lat, point.lng], Math.max(map.getZoom(), 12));
    }
  }, [shouldOpenPopup, map, point.lat, point.lng]);

  const getMarkerIcon = (isHighlighted: boolean) => {
    // Esfera perfeita - cor dourada para estações reveladas
    const size = isHighlighted ? 24 : 20; // Tamanho maior e mais visível
    const color = isHighlighted ? "#f59e0b" : "#f97316"; // Dourado quando destacada
    const borderWidth = 3; // Borda mais espessa para melhor visibilidade

    return L.divIcon({
      html: `<div style="
        background-color: ${color} !important;
        border-radius: 50% !important;
        width: ${size}px !important;
        height: ${size}px !important;
        border: ${borderWidth}px solid white !important;
        box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3), 0 3px 10px rgba(0, 0, 0, 0.4) !important;
        position: relative !important;
        z-index: 1000 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
      "></div>`,
      className: "revealed-station-marker",
      iconSize: L.point(size + borderWidth * 2, size + borderWidth * 2, true),
      iconAnchor: L.point((size + borderWidth * 2) / 2, (size + borderWidth * 2) / 2, true),
    });
  };

  const formatCoordinates = (lat: number, lng: number) => {
    const latDir = lat >= 0 ? "N" : "S";
    const lngDir = lng >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(6)}°${latDir}, ${Math.abs(lng).toFixed(6)}°${lngDir}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const getTypeLabel = (type: "sima" | "furnas" | "balcar") => {
    switch (type) {
      case "sima":
        return "Estação SIMA";
      case "furnas":
        return "Reservatório Furnas";
      case "balcar":
        return "Reservatório BALCAR";
      default:
        return "Ponto de Monitoramento";
    }
  };

  return (
    <Marker position={[point.lat, point.lng]} icon={getMarkerIcon(isHighlighted)} ref={markerRef}>
      <Popup>
        <PopupContent>
          <PopupHeader>
            <PopupIcon type={point.type}>
              <MapPin size={16} />
            </PopupIcon>
            <div>
              <PopupTitle>{point.name}</PopupTitle>
              <PopupSubtitle>{getTypeLabel(point.type)} • Revelada</PopupSubtitle>
            </div>
          </PopupHeader>

          <PopupInfo>
            {point.description && (
              <InfoRow>
                <InfoLabel>Descrição:</InfoLabel>
                <InfoValue>{point.description}</InfoValue>
              </InfoRow>
            )}

            {point.type === "sima" && point.data && "idhexadecimal" in point.data && (
              <>
                {point.data.idhexadecimal && (
                  <InfoRow>
                    <InfoLabel>ID Hex:</InfoLabel>
                    <InfoValue>{point.data.idhexadecimal}</InfoValue>
                  </InfoRow>
                )}
              </>
            )}

            <Coordinates>{formatCoordinates(point.lat, point.lng)}</Coordinates>

            {point.period && (
              <PeriodInfo>
                <InfoRow>
                  <Calendar size={14} />
                  <PeriodText>
                    {point.period.start && `Início: ${formatDate(point.period.start)}`}
                    {point.period.end && ` • Fim: ${formatDate(point.period.end)}`}
                    {!point.period.end && " • Ativo"}
                  </PeriodText>
                </InfoRow>
              </PeriodInfo>
            )}
          </PopupInfo>

          <ActionButton
            onClick={() =>
              window.open(`https://www.google.com/maps?q=${point.lat},${point.lng}`, "_blank")
            }
          >
            <Map size={14} style={{ marginRight: "8px" }} />
            Ver no Google Maps
          </ActionButton>
        </PopupContent>
      </Popup>
    </Marker>
  );
}

export default function RevealedStationMarker(props: RevealedStationMarkerProps) {
  return <RevealedStationMarkerInner {...props} />;
}
