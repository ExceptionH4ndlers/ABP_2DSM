import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import type { MapPoint } from "../hooks/useMapData";
import { createStationPopupHTML } from "../utils/popupUtils";

// Importar CSS do clustering
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface MarkerClusterGroupProps {
  children?: React.ReactNode;
  points?: MapPoint[];
}


export default function MarkerClusterGroup({ points }: MarkerClusterGroupProps) {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const pointsHashRef = useRef<string>("");

  // Criar cluster group uma única vez
  useEffect(() => {
    if (!map || clusterRef.current) return;

    try {
      clusterRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          let size = "small";
          let color = "#3b82f6";

          if (count > 20) {
            size = "large";
            color = "#1d4ed8";
          } else if (count > 10) {
            size = "medium";
            color = "#2563eb";
          }

          return L.divIcon({
            html: `<div style="
              background-color: ${color};
              color: white;
              border-radius: 50%;
              width: ${size === "large" ? "40px" : size === "medium" ? "35px" : "30px"};
              height: ${size === "large" ? "40px" : size === "medium" ? "35px" : "30px"};
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: ${size === "large" ? "14px" : size === "medium" ? "12px" : "10px"};
              border: 2px solid white;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            ">${count}</div>`,
            className: "custom-cluster-icon",
            iconSize: L.point(40, 40, true),
          });
        },
      });

      map.addLayer(clusterRef.current);
    } catch (error) {
      console.error("Erro ao criar cluster group:", error);
    }

    return () => {
      if (clusterRef.current && map) {
        try {
          clusterRef.current.clearLayers();
          map.removeLayer(clusterRef.current);
        } catch {
          // Ignorar erros na limpeza
        }
        clusterRef.current = null;
        markersRef.current = [];
      }
    };
  }, [map]);

  // Processar pontos
  useEffect(() => {
    if (!clusterRef.current) return;

    if (!points || !Array.isArray(points) || points.length === 0) {
      if (markersRef.current.length > 0) {
        try {
          clusterRef.current.clearLayers();
          markersRef.current = [];
          pointsHashRef.current = "";
        } catch {
          // Ignorar erros
        }
      }
      return;
    }

    // Limitar a 200 marcadores para evitar sobrecarga
    const limitedPoints = points.slice(0, 200);

    // Criar hash simples dos pontos
    const pointsHash = limitedPoints
      .map((p) => `${p.id || ""}-${Math.round(p.lat * 1000)}-${Math.round(p.lng * 1000)}`)
      .join("|");

    // Só atualizar se mudou
    if (pointsHash === pointsHashRef.current) {
      return;
    }

    pointsHashRef.current = pointsHash;

    // Limpar marcadores anteriores
    try {
      if (markersRef.current.length > 0) {
        clusterRef.current.clearLayers();
      }
      markersRef.current = [];
    } catch {
      // Ignorar erros
    }

    // Criar ícone uma única vez
    const icon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Criar marcadores com limite de tempo
    const markersToAdd: L.Marker[] = [];
    const startTime = Date.now();
    const MAX_PROCESSING_TIME = 100; // 100ms máximo

    for (const point of limitedPoints) {
      // Verificar timeout para evitar travamento
      if (Date.now() - startTime > MAX_PROCESSING_TIME) {
        console.warn("Tempo de processamento excedido, limitando marcadores");
        break;
      }

      if (
        typeof point.lat !== "number" ||
        typeof point.lng !== "number" ||
        isNaN(point.lat) ||
        isNaN(point.lng) ||
        point.lat < -90 ||
        point.lat > 90 ||
        point.lng < -180 ||
        point.lng > 180
      ) {
        continue;
      }

      try {
        const marker = L.marker([point.lat, point.lng], { icon });

        // Adicionar popup estilizado ao marcador
        const popupContent = createStationPopupHTML(point);
        marker.bindPopup(popupContent, {
          className: "station-popup",
          maxWidth: 600,
          closeButton: true,
          autoPan: true,
          offset: [0, -10],
        });

        markersToAdd.push(marker);
      } catch {
        // Ignorar erros silenciosamente
      }
    }

    // Adicionar todos de uma vez
    if (markersToAdd.length > 0 && clusterRef.current) {
      try {
        clusterRef.current.addLayers(markersToAdd);
        markersRef.current = markersToAdd;
      } catch (error) {
        console.error("Erro ao adicionar marcadores:", error);
      }
    }
  }, [points]);

  return null;
}
