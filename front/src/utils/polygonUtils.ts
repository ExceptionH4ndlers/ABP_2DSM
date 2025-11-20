// src/utils/polygonUtils.ts
import type { MapPoint } from "../hooks/useMapData";
import { point as turfPoint, polygon as turfPolygon, booleanPointInPolygon } from "@turf/turf";

export type LatLngTuple = [number, number]; // [lat, lng]

export interface PolygonSelection {
  polygonIndex: number;
  points: MapPoint[];
}

/**
 * Converte um polígono [ [lat,lng], ... ] em um Polygon GeoJSON [ [lng,lat], ... ]
 */
function toTurfPolygonCoords(poly: LatLngTuple[]): [number, number][][] {
  if (poly.length < 3) return [[]];

  const ring: [number, number][] = poly.map(([lat, lng]) => [lng, lat]);
  const first = ring[0];
  const last = ring[ring.length - 1];

  if (first[0] !== last[0] || first[1] !== last[1]) {
    ring.push([first[0], first[1]]);
  }

  return [ring];
}

/**
 * Retorna estações agrupadas por polígono.
 */
export function getStationsByPolygon(
  polygons: LatLngTuple[][],
  points: MapPoint[],
): PolygonSelection[] {
  const result: PolygonSelection[] = [];

  polygons.forEach((poly, index) => {
    if (poly.length < 3) return;

    const coords = toTurfPolygonCoords(poly);
    const polyFeature = turfPolygon(coords);

    const inside: MapPoint[] = [];

    points.forEach((pt) => {
      const ptFeature = turfPoint([pt.lng, pt.lat]);
      if (booleanPointInPolygon(ptFeature, polyFeature)) {
        inside.push(pt);
      }
    });

    if (inside.length > 0) {
      result.push({ polygonIndex: index, points: inside });
    }
  });

  return result;
}

