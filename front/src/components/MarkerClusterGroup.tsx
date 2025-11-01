import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";

// Importar CSS do clustering
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface MarkerClusterGroupProps {
  children: React.ReactNode;
}

export default function MarkerClusterGroup({ children }: MarkerClusterGroupProps) {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!clusterRef.current) {
      // Criar cluster group com configurações customizadas
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
    }

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
        clusterRef.current = null;
      }
    };
  }, [map]);

  // Renderizar children dentro do cluster group
  return <>{children}</>;
}
