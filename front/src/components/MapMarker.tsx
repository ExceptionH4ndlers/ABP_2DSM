import { Marker, Popup } from "react-leaflet";
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

interface MapMarkerProps {
  point: MapPoint;
  onClick?: (point: MapPoint) => void;
  isSelected?: boolean;
}

export default function MapMarker({ point, onClick, isSelected = false }: MapMarkerProps) {
  const getMarkerIcon = (type: "sima" | "furnas" | "balcar", selected: boolean) => {
    const colors = {
      sima: "#2563eb",
      furnas: "#16a34a",
      balcar: "#ea580c",
    };

    const letters = {
      sima: "S",
      furnas: "F",
      balcar: "B",
    };

    const baseColor = colors[type];
    const bgColor = selected ? "#f97316" : baseColor;
    const size = selected ? 40 : 32;
    const borderWidth = selected ? 3 : 2;
    const shadow = selected
      ? "0 0 0 4px rgba(249, 115, 22, 0.35), 0 4px 12px rgba(0,0,0,0.45)"
      : "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)";

    return L.divIcon({
      html: `<div style="
        background-color: ${bgColor} !important;
        color: white !important;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: ${borderWidth}px solid white;
        box-shadow: ${shadow};
        position: relative;
        z-index: 1000;
        transition: all 0.2s ease;
      ">${letters[type]}</div>`,
      className: "custom-marker-icon",
      iconSize: L.point(size, size, true),
      iconAnchor: L.point(size / 2, size / 2, true),
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

  const handleMarkerClick = () => {
    if (onClick) {
      onClick(point);
    }
  };

  return (
    <Marker
      position={[point.lat, point.lng]}
      icon={getMarkerIcon(point.type, isSelected)}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      <Popup>
        <PopupContent>
          <PopupHeader>
            <PopupIcon type={point.type}>
              <MapPin size={16} />
            </PopupIcon>
            <div>
              <PopupTitle>{point.name}</PopupTitle>
              <PopupSubtitle>{getTypeLabel(point.type)}</PopupSubtitle>
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
