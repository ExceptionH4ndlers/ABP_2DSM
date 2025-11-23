import type { Feature, MultiPolygon, Polygon } from "geojson";
import {
  area,
  booleanIntersects,
  cleanCoords,
  intersect,
  rewind,
  simplify,
  truncate,
  union,
} from "@turf/turf";

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
  const truncated = truncate(geom, { precision: 6, mutate: false }) as BufferGeometry;
  const rewound = rewind(truncated, { mutate: false }) as BufferGeometry;
  const cleaned = cleanCoords(rewound, { mutate: false }) as BufferGeometry;
  return cleaned;
};

const tryIntersect = (a: BufferGeometry, b: BufferGeometry) => {
  // Turf aceita Feature diretamente, mas os tipos TypeScript são restritivos
  // Usamos 'any' para contornar a restrição de tipos, já que sabemos que funciona em runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result = intersect(a as any, b as any) as Feature<Polygon | MultiPolygon> | null;
  if (result) return result;

  if (booleanIntersects(a, b)) {
    const simpleA = simplify(a, { tolerance: 0.001, mutate: false }) as BufferGeometry;
    const simpleB = simplify(b, { tolerance: 0.001, mutate: false }) as BufferGeometry;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result = intersect(simpleA as any, simpleB as any) as Feature<Polygon | MultiPolygon> | null;
  }

  return result;
};

/**
 * Dado dois buffers (GeoJSON), calcula a sobreposição e a parcela exclusiva de cada um.
 */
export function calculateBufferCoverage(
  bufferA: BufferGeometry,
  bufferB: BufferGeometry,
): BufferCoverageMetrics {
  const preparedA = prepareGeometry(bufferA);
  const preparedB = prepareGeometry(bufferB);

  const areaA = Math.max(area(preparedA), 0);
  const areaB = Math.max(area(preparedB), 0);

  let intersectionArea = 0;
  const overlaps = booleanIntersects(preparedA, preparedB);
  try {
    const intersectionFeature = tryIntersect(preparedA, preparedB);
    intersectionArea = intersectionFeature ? Math.max(area(intersectionFeature), 0) : 0;
    // Logs detalhados para depuração
    console.debug("[buffers] intersect", {
      areaA,
      areaB,
      intersectionArea,
      hasIntersection: Boolean(intersectionFeature),
    });
  } catch (err) {
    console.error("[buffers] erro no intersect", err);
    intersectionArea = 0;
  }

  // Fallback: se há sobreposição (bbox) mas não houve interseção explícita, tenta via inclusão-exclusão com union.
  if (intersectionArea === 0 && overlaps) {
    try {
      // Turf aceita Feature diretamente, mas os tipos TypeScript são restritivos
      // Usamos 'any' para contornar a restrição de tipos, já que sabemos que funciona em runtime
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const merged = union(preparedA as any, preparedB as any) as Feature<
        Polygon | MultiPolygon
      > | null;
      if (merged) {
        const areaUnion = Math.max(area(merged), 0);
        const viaUnion = Math.max(areaA + areaB - areaUnion, 0);
        intersectionArea = viaUnion;
        console.debug("[buffers] intersect via union fallback", {
          areaA,
          areaB,
          areaUnion,
          intersectionArea,
        });
      }
    } catch (err) {
      console.error("[buffers] erro no fallback union", err);
    }
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
