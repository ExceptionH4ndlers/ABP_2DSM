import { Feature, Polygon, MultiPolygon, Position } from "geojson";
import {
  area,
  booleanIntersects,
  cleanCoords,
  rewind,
  simplify,
  truncate,
  union,
} from "@turf/turf";

// polygon-clipping NÃO usa GeoJSON tipado, então importamos como ANY
const polygonClipping: any = require("polygon-clipping");

import proj4 from "proj4";

// -----------------------------------------------------------------------------
// UTM 22S (SP) - projeção métrica
// -----------------------------------------------------------------------------
proj4.defs(
  "EPSG:31982",
  "+proj=utm +zone=22 +south +ellps=GRS80 +units=m +no_defs"
);

const toUTM = proj4("EPSG:4326", "EPSG:31982");

// -----------------------------------------------------------------------------
// Tipos
// -----------------------------------------------------------------------------
export type BufferGeometry = Feature<Polygon | MultiPolygon>;

export type BufferCoverageMetrics = {
  areaA: number;
  areaB: number;
  intersectionArea: number;
  aOverlapPercentage: number;
  bOverlapPercentage: number;
  aExclusiveArea: number;
  bExclusiveArea: number;
  aExclusivePercentage: number;
  bExclusivePercentage: number;
  unionArea: number;
  overlapOnUnionPercentage: number;
};

// -----------------------------------------------------------------------------
// Percentual
// -----------------------------------------------------------------------------
const toPercentage = (part: number, total: number) =>
  total > 0 ? (part / total) * 100 : 0;

// -----------------------------------------------------------------------------
// Projeção
// -----------------------------------------------------------------------------
function projectCoords(coords: any[]): any[] {
  return coords.map((c) =>
    Array.isArray(c[0]) ? projectCoords(c) : toUTM.forward(c)
  );
}

function projectFeature(
  feature: BufferGeometry
): Feature<Polygon | MultiPolygon> {
  const cloned = structuredClone(feature);
  cloned.geometry.coordinates = projectCoords(
    cloned.geometry.coordinates as any[]
  );
  return cloned;
}

// -----------------------------------------------------------------------------
// Normalização
// -----------------------------------------------------------------------------
function prepareGeometry(
  geom: Feature<Polygon | MultiPolygon>
): Feature<Polygon | MultiPolygon> {
  const truncated = truncate(geom as any, { precision: 6, mutate: false });
  const rewound = rewind(truncated as any, { mutate: false });
  const cleaned = cleanCoords(rewound as any, { mutate: false });
  return cleaned as Feature<Polygon | MultiPolygon>;
}

// -----------------------------------------------------------------------------
// Converter tudo para MultiPolygon (necessário para polygon-clipping)
// -----------------------------------------------------------------------------
function asMultiPolygon(
  feature: Feature<Polygon | MultiPolygon>
): Position[][][] {
  if (feature.geometry.type === "Polygon") {
    return [feature.geometry.coordinates]; // MultiPolygon compatível
  }

  return feature.geometry.coordinates;
}

// -----------------------------------------------------------------------------
// Interseção REAL com polygon-clipping (SEM TypeScript interferindo)
// -----------------------------------------------------------------------------
function intersectAccurate(
  a: Feature<Polygon | MultiPolygon>,
  b: Feature<Polygon | MultiPolygon>
): Feature<MultiPolygon> | null {
  try {
    const polyA = asMultiPolygon(a);
    const polyB = asMultiPolygon(b);

    const result = polygonClipping.intersection(polyA, polyB);

    if (!result || result.length === 0) return null;

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: result as Position[][][],
      },
    };
  } catch (err) {
    console.error("polygon-clipping intersection error", err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 🚀 Função principal
// -----------------------------------------------------------------------------
export function calculateBufferCoverage(
  bufferA: BufferGeometry,
  bufferB: BufferGeometry
): BufferCoverageMetrics {
  // 1 - Projeção
  const projectedA = projectFeature(bufferA);
  const projectedB = projectFeature(bufferB);

  // 2 - Preparar
  const preparedA = prepareGeometry(projectedA);
  const preparedB = prepareGeometry(projectedB);

  // 3 - Áreas individuais
  const areaA = area(preparedA as any);
  const areaB = area(preparedB as any);

  // 4 - Interseção real
  const intersection = intersectAccurate(preparedA, preparedB);
  let intersectionArea = intersection ? area(intersection as any) : 0;

  // 5 - Fallback A + B − Union (caso encostem mas não intersectem)
  if (intersectionArea === 0 && booleanIntersects(preparedA as any, preparedB as any)) {
    try {
      const merged = union(preparedA as any, preparedB as any);
      if (merged) {
        const unionArea = area(merged as any);
        intersectionArea = Math.max(areaA + areaB - unionArea, 0);
      }
    } catch {}
  }

  // 6 - Exclusões
  const aExclusiveArea = Math.max(areaA - intersectionArea, 0);
  const bExclusiveArea = Math.max(areaB - intersectionArea, 0);
  const unionArea = Math.max(areaA + areaB - intersectionArea, 0);

  return {
    areaA,
    areaB,
    intersectionArea,
    aOverlapPercentage: toPercentage(intersectionArea, areaA),
    bOverlapPercentage: toPercentage(intersectionArea, areaB),
    aExclusiveArea,
    bExclusiveArea,
    aExclusivePercentage: toPercentage(aExclusiveArea, areaA),
    bExclusivePercentage: toPercentage(bExclusiveArea, areaB),
    unionArea,
    overlapOnUnionPercentage: toPercentage(intersectionArea, unionArea),
  };
}
