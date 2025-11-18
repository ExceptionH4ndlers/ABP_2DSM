import type { Feature, MultiPolygon, Polygon } from "geojson";
import { area, intersect } from "@turf/turf";

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

const toPercentage = (part: number, total: number) => (total > 0 ? (part / total) * 100 : 0);

/**
 * Dado dois buffers (GeoJSON), calcula a sobreposição e a parcela exclusiva de cada um.
 */
export function calculateBufferCoverage(
  bufferA: BufferGeometry,
  bufferB: BufferGeometry
): BufferCoverageMetrics {
  const areaA = Math.max(area(bufferA as any), 0);
  const areaB = Math.max(area(bufferB as any), 0);

  let intersectionArea = 0;
  try {
    const intersectionFeature = intersect(bufferA as any, bufferB as any);
    intersectionArea = intersectionFeature ? Math.max(area(intersectionFeature as any), 0) : 0;
  } catch {
    intersectionArea = 0;
  }

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
