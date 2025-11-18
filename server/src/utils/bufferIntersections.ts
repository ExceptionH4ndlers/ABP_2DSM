import { Feature, MultiPolygon, Polygon } from "geojson";
import { area, cleanCoords, intersect, truncate } from "@turf/turf";

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

const prepareGeometry = (geom: BufferGeometry): BufferGeometry => {
  const truncated = truncate(geom, { precision: 6, mutate: true });
  return cleanCoords(truncated, { mutate: true }) as BufferGeometry;
};

/**
 * Given two buffer polygons, calculates how much of each one is overlapped by the other
 * and how much area remains exclusive to each buffer.
 */
export function calculateBufferCoverage(
  bufferA: BufferGeometry,
  bufferB: BufferGeometry
): BufferCoverageMetrics {
  const preparedA = prepareGeometry(bufferA);
  const preparedB = prepareGeometry(bufferB);

  const areaA = Math.max(area(preparedA as any), 0);
  const areaB = Math.max(area(preparedB as any), 0);

  let intersectionArea = 0;
  try {
    const intersectionFeature = intersect(preparedA as any, preparedB as any) as
      | Feature<Polygon | MultiPolygon>
      | null;
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
