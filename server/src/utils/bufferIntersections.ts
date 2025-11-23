import { Feature, Polygon, MultiPolygon } from "geojson";
import { area, cleanCoords, rewind, truncate, simplify } from "@turf/turf";

// polygon-clipping não tem typings em formato GeoJSON
// -> importamos como any para evitar conflito de tipos
const polygonClipping: any = require("polygon-clipping");

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

// ------------------------------------------------------------
// Helpers básicos
// ------------------------------------------------------------

const toPercentage = (part: number, total: number) => (total > 0 ? (part / total) * 100 : 0);

/**
 * Normaliza a geometria em WGS84:
 * - clona
 * - simplifica levemente
 * - trunca decimais
 * - corrige winding order
 * - remove coordenadas repetidas
 */
function prepareGeometry(geom: BufferGeometry): BufferGeometry {
  const cloned: BufferGeometry = JSON.parse(JSON.stringify(geom));

  const simplified = simplify(cloned as any, {
    tolerance: 0.00001, // ~1m perto do equador
    highQuality: true,
    mutate: false,
  }) as BufferGeometry;

  const truncated = truncate(simplified as any, {
    precision: 6,
    mutate: false,
  }) as BufferGeometry;

  const rewound = rewind(truncated as any, { mutate: false }) as BufferGeometry;

  const cleaned = cleanCoords(rewound as any, {
    mutate: false,
  }) as BufferGeometry;

  return cleaned;
}

/**
 * Converte Feature<Polygon | MultiPolygon> para coordenadas de MultiPolygon
 * compatíveis com polygon-clipping:
 * - Polygon  -> MultiPolygon com 1 polígono
 * - MultiPolygon -> mantém como está
 */
function toMultiPolygonCoords(feature: BufferGeometry): number[][][][] {
  const geom = feature.geometry;

  if (geom.type === "Polygon") {
    // Polygon: Position[][]
    // MultiPolygon: Position[][][]
    return [geom.coordinates];
  }

  return geom.coordinates;
}

/**
 * Fecha o ring caso último ponto ≠ primeiro
 */
function closeRing(ring: number[][]): number[][] {
  if (!ring.length) return ring;
  const [x1, y1] = ring[0];
  const [x2, y2] = ring[ring.length - 1];
  if (x1 !== x2 || y1 !== y2) {
    ring.push([x1, y1]);
  }
  return ring;
}

/**
 * Garante que todos os rings do multipolygon estão fechados
 */
function normalizeMultiPolygonCoords(mp: number[][][][]): number[][][][] {
  return mp.map((poly) => poly.map((ring) => closeRing([...ring])));
}

/**
 * Interseção robusta usando polygon-clipping.
 * Recebe coordenadas de MultiPolygon (não Feature).
 * Retorna Feature<MultiPolygon> ou null.
 */
function intersectAccurate(mpA: number[][][][], mpB: number[][][][]): Feature<MultiPolygon> | null {
  try {
    const result = polygonClipping.intersection(mpA, mpB);

    if (!result || !Array.isArray(result) || result.length === 0) {
      return null;
    }

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: result as number[][][][],
      },
    };
  } catch (err) {
    console.error("[bufferCoverage] polygon-clipping.intersection error:", err);
    return null;
  }
}

/**
 * União usando polygon-clipping (para fallback do cálculo de interseção)
 */
function unionAccurate(mpA: number[][][][], mpB: number[][][][]): Feature<MultiPolygon> | null {
  try {
    const result = polygonClipping.union(mpA, mpB);

    if (!result || !Array.isArray(result) || result.length === 0) {
      return null;
    }

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: result as number[][][][],
      },
    };
  } catch (err) {
    console.error("[bufferCoverage] polygon-clipping.union error:", err);
    return null;
  }
}

// ------------------------------------------------------------
// Função principal
// ------------------------------------------------------------

export function calculateBufferCoverage(
  bufferA: BufferGeometry,
  bufferB: BufferGeometry,
): BufferCoverageMetrics {
  // 1) Normalizar geometria em WGS84
  const preparedA = prepareGeometry(bufferA);
  const preparedB = prepareGeometry(bufferB);

  // 2) Calcular áreas individuais (m²) – Turf.area já lida com lat/lon
  const areaA = Math.max(area(preparedA as any), 0);
  const areaB = Math.max(area(preparedB as any), 0);

  // 3) Converter para MultiPolygon plain coords para o polygon-clipping
  const mpA = normalizeMultiPolygonCoords(toMultiPolygonCoords(preparedA));
  const mpB = normalizeMultiPolygonCoords(toMultiPolygonCoords(preparedB));

  // 4) Interseção
  let intersectionArea = 0;
  const intersectionFeature = intersectAccurate(mpA, mpB);

  if (intersectionFeature) {
    intersectionArea = Math.max(area(intersectionFeature as any), 0);
  }

  // 5) União e fallback: se interseção veio 0, tentamos via união
  let unionArea = Math.max(areaA + areaB - intersectionArea, 0);

  if (intersectionArea === 0) {
    const unionFeature = unionAccurate(mpA, mpB);
    if (unionFeature) {
      unionArea = Math.max(area(unionFeature as any), 0);
      intersectionArea = Math.max(areaA + areaB - unionArea, 0);
    }
  }

  // 6) Áreas exclusivas
  const aExclusiveArea = Math.max(areaA - intersectionArea, 0);
  const bExclusiveArea = Math.max(areaB - intersectionArea, 0);

  // 7) Monta métricas finais
  return {
    areaA,
    areaB,
    intersectionArea,
    aExclusiveArea,
    bExclusiveArea,
    aExclusivePercentage: toPercentage(aExclusiveArea, areaA),
    bExclusivePercentage: toPercentage(bExclusiveArea, areaB),
    aOverlapPercentage: toPercentage(intersectionArea, areaA),
    bOverlapPercentage: toPercentage(intersectionArea, areaB),
    unionArea,
    overlapOnUnionPercentage: toPercentage(intersectionArea, unionArea),
  };
}
