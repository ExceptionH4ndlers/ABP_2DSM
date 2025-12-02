import type { MapPoint } from "../hooks/useMapData";

// Função para escapar HTML
function escapeHtml(text: string): string {
  if (typeof window === "undefined" || !document) {
    // Fallback para ambientes sem DOM (SSR)
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function createStationPopupHTML(point: MapPoint): string {
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

  const getGradient = (type: "sima" | "furnas" | "balcar") => {
    switch (type) {
      case "sima":
        return "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
      case "furnas":
        return "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
      case "balcar":
        return "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
      default:
        return "linear-gradient(135deg, #64748b 0%, #475569 100%)";
    }
  };

  const stationName = escapeHtml(point.name || "Estação");
  const typeLabel = escapeHtml(getTypeLabel(point.type));

  return `<div style="min-width: 200px; max-width: 450px; width: auto; background: white; border-radius: 20px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1); border: 2px solid #e2e8f0; overflow: hidden; margin: 0; padding: 0; position: relative;">
      <div style="background: ${getGradient(point.type)}; padding: 16px 50px 16px 18px; color: white; display: flex; align-items: flex-start; gap: 12px; position: relative;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 2px solid rgba(255, 255, 255, 0.3);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div style="flex: 1; min-width: 0; overflow: visible; word-break: break-word;">
          <h3 style="font-size: 16px; font-weight: 700; margin: 0 0 4px 0; color: white; word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; line-height: 1.4; white-space: normal;">${stationName}</h3>
          <p style="font-size: 12px; margin: 0; color: rgba(255, 255, 255, 0.9); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${typeLabel}</p>
        </div>
      </div>
      <div style="padding: 16px 18px; background: #f8fafc;">
        <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
            Localização
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-family: 'Courier New', 'Monaco', monospace; color: #1e293b;">
              <span style="font-weight: 600; color: #64748b; min-width: 30px; font-size: 11px;">Lat:</span>
              <span style="color: #1e293b; font-weight: 500;">${formatCoordinate(point.lat, true)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-family: 'Courier New', 'Monaco', monospace; color: #1e293b;">
              <span style="font-weight: 600; color: #64748b; min-width: 30px; font-size: 11px;">Lng:</span>
              <span style="color: #1e293b; font-weight: 500;">${formatCoordinate(point.lng, false)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

