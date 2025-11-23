// src/components/MapClickHandler.tsx
import { useMapEvents } from "react-leaflet";

interface MapClickHandlerProps {
  drawing: boolean;
  onAddPoint: (latlng: { lat: number; lng: number }) => void;
}

export function MapClickHandler({ drawing, onAddPoint }: MapClickHandlerProps) {
  useMapEvents({
    click(e) {
      if (!drawing) return;

      const target = e.originalEvent.target as HTMLElement | null;

      // Evita capturar cliques em marcadores revelados / shapes interativos
      if (target?.closest(".revealed-station-marker") || target?.closest(".leaflet-interactive")) {
        return;
      }

      onAddPoint(e.latlng);
    },
  });

  return null;
}
