import styled from "styled-components";
import { MapPin, Navigation } from "lucide-react";
import type { MapPoint } from "../hooks/useMapData";

const PopupContainer = styled.div`
  min-width: 200px;
  max-width: 280px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
  overflow: hidden;
  position: relative;
  padding: 0;
  margin: 0;
`;

const PopupHeader = styled.div<{ $type: "sima" | "furnas" | "balcar" }>`
  background: ${(props) => {
    switch (props.$type) {
      case "sima":
        return "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
      case "furnas":
        return "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
      case "balcar":
        return "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
      default:
        return "linear-gradient(135deg, #64748b 0%, #475569 100%)";
    }
  }};
  padding: 16px 18px;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const HeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const StationName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StationType = styled.p`
  font-size: 12px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PopupBody = styled.div`
  padding: 16px 18px;
  background: #f8fafc;
`;

const CoordinatesSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e2e8f0;
`;

const CoordinatesLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const CoordinatesValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CoordinateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: "Courier New", "Monaco", monospace;
  color: #1e293b;
`;

const CoordinateLabel = styled.span`
  font-weight: 600;
  color: #64748b;
  min-width: 30px;
  font-size: 11px;
`;

const CoordinateValue = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

interface StationPopupProps {
  point: MapPoint;
}

export default function StationPopup({ point }: StationPopupProps) {
  const getTypeLabel = (type: "sima" | "furnas" | "balcar") => {
    switch (type) {
      case "sima":
        return "Estação SIMA";
      case "furnas":
        return "Reservatório Furnas";
      case "balcar":
        return "Reservatório BALCAR";
      default:
        return "Estação";
    }
  };

  const formatCoordinate = (coord: number, isLat: boolean) => {
    const direction = isLat ? (coord >= 0 ? "N" : "S") : coord >= 0 ? "E" : "W";
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  return (
    <PopupContainer>
      <PopupHeader $type={point.type}>
        <IconWrapper>
          <MapPin size={20} />
        </IconWrapper>
        <HeaderContent>
          <StationName>{point.name || "Estação"}</StationName>
          <StationType>{getTypeLabel(point.type)}</StationType>
        </HeaderContent>
      </PopupHeader>
      <PopupBody>
        <CoordinatesSection>
          <CoordinatesLabel>
            <Navigation size={12} />
            Localização
          </CoordinatesLabel>
          <CoordinatesValue>
            <CoordinateRow>
              <CoordinateLabel>Lat:</CoordinateLabel>
              <CoordinateValue>{formatCoordinate(point.lat, true)}</CoordinateValue>
            </CoordinateRow>
            <CoordinateRow>
              <CoordinateLabel>Lng:</CoordinateLabel>
              <CoordinateValue>{formatCoordinate(point.lng, false)}</CoordinateValue>
            </CoordinateRow>
          </CoordinatesValue>
        </CoordinatesSection>
      </PopupBody>
    </PopupContainer>
  );
}

