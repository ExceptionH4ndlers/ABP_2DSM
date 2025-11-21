export interface Coordinate {
  lat: number;
  lng: number;
}

export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][]; // [[[lng, lat], ...]]
}

export interface GeoJSONLineString {
  type: "LineString";
  coordinates: number[][]; // [[lng, lat], ...]
}

export type GeoJSONGeometry = GeoJSONPoint | GeoJSONPolygon | GeoJSONLineString;

export interface GeoJSONFeature {
  type: "Feature";
  geometry: GeoJSONGeometry;
  properties?: Record<string, unknown>;
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Limites geográficos do Brasil
const BRAZIL_BOUNDS = {
  minLat: -33.75,
  maxLat: 5.27,
  minLng: -73.99,
  maxLng: -32.43,
};

export class GeospatialTransformer {
  /**
   * Converte coordenadas lat/lng para GeoJSON Point
   */
  static coordinateToGeoJSONPoint(lat: number, lng: number): GeoJSONPoint {
    return {
      type: "Point",
      coordinates: [lng, lat],
    };
  }

  /**
   * Converte GeoJSON Point para coordenadas lat/lng
   */
  static geoJSONPointToCoordinate(point: GeoJSONPoint): Coordinate {
    return {
      lat: point.coordinates[1],
      lng: point.coordinates[0],
    };
  }

  /**
   * Converte array de coordenadas para GeoJSON Polygon
   */
  static coordinatesToGeoJSONPolygon(coordinates: Coordinate[]): GeoJSONPolygon {
    if (coordinates.length < 3) {
      throw new Error("Um polígono precisa de pelo menos 3 coordenadas");
    }

    // Garantir que o polígono está fechado (primeiro ponto = último ponto)
    const closedCoords = [...coordinates];
    const first = closedCoords[0];
    const last = closedCoords[closedCoords.length - 1];
    if (first.lat !== last.lat || first.lng !== last.lng) {
      closedCoords.push(first);
    }

    const ring = closedCoords.map((coord) => [coord.lng, coord.lat]);
    return {
      type: "Polygon",
      coordinates: [ring],
    };
  }

  /**
   * Converte GeoJSON Polygon para array de coordenadas
   */
  static geoJSONPolygonToCoordinates(polygon: GeoJSONPolygon): Coordinate[] {
    if (polygon.coordinates.length === 0) {
      return [];
    }

    const ring = polygon.coordinates[0];
    return ring.map((coord) => ({
      lng: coord[0],
      lat: coord[1],
    }));
  }

  /**
   * Converte array de coordenadas para GeoJSON LineString
   */
  static coordinatesToGeoJSONLineString(coordinates: Coordinate[]): GeoJSONLineString {
    if (coordinates.length < 2) {
      throw new Error("Uma LineString precisa de pelo menos 2 coordenadas");
    }

    return {
      type: "LineString",
      coordinates: coordinates.map((coord) => [coord.lng, coord.lat]),
    };
  }

  /**
   * Converte GeoJSON LineString para array de coordenadas
   */
  static geoJSONLineStringToCoordinates(lineString: GeoJSONLineString): Coordinate[] {
    return lineString.coordinates.map((coord) => ({
      lng: coord[0],
      lat: coord[1],
    }));
  }

  /**
   * Valida se coordenadas estão dentro dos limites do Brasil
   */
  static isValidBrazilianCoordinate(lat: number, lng: number): boolean {
    return (
      lat >= BRAZIL_BOUNDS.minLat &&
      lat <= BRAZIL_BOUNDS.maxLat &&
      lng >= BRAZIL_BOUNDS.minLng &&
      lng <= BRAZIL_BOUNDS.maxLng
    );
  }

  /**
   * Valida um objeto Coordinate
   */
  static validateCoordinate(coord: Coordinate): boolean {
    return (
      typeof coord.lat === "number" &&
      typeof coord.lng === "number" &&
      !isNaN(coord.lat) &&
      !isNaN(coord.lng) &&
      coord.lat >= -90 &&
      coord.lat <= 90 &&
      coord.lng >= -180 &&
      coord.lng <= 180
    );
  }

  /**
   * Valida e filtra coordenadas dentro dos limites do Brasil
   */
  static filterBrazilianCoordinates(coordinates: Coordinate[]): Coordinate[] {
    return coordinates.filter((coord) => this.isValidBrazilianCoordinate(coord.lat, coord.lng));
  }

  /**
   * Calcula distância Haversine entre duas coordenadas (em km)
   */
  static calculateHaversineDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Converte graus para radianos
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Converte coordenadas WGS84 para SIRGAS2000 (aproximação)
   * Nota: Esta é uma conversão simplificada. Para precisão total,
   * use bibliotecas especializadas como proj4
   */
  static wgs84ToSirgas2000(lat: number, lng: number): { lat: number; lng: number } {
    // SIRGAS2000 e WGS84 são muito próximos no Brasil
    // Diferença média é de cerca de 0.1-0.2 metros
    // Para a maioria dos casos, pode-se considerar iguais
    // Esta função retorna os mesmos valores como placeholder
    // Para conversão precisa, use biblioteca proj4
    return { lat, lng };
  }

  /**
   * Converte coordenadas SIRGAS2000 para WGS84 (aproximação)
   */
  static sirgas2000ToWgs84(lat: number, lng: number): { lat: number; lng: number } {
    // Mesma observação da função anterior
    return { lat, lng };
  }

  /**
   * Cria um GeoJSON Feature a partir de coordenadas e propriedades
   */
  static createFeature(
    geometry: GeoJSONGeometry,
    properties?: Record<string, unknown>,
  ): GeoJSONFeature {
    return {
      type: "Feature",
      geometry,
      properties: properties || {},
    };
  }

  /**
   * Cria um GeoJSON FeatureCollection a partir de múltiplas features
   */
  static createFeatureCollection(features: GeoJSONFeature[]): GeoJSONFeatureCollection {
    return {
      type: "FeatureCollection",
      features,
    };
  }

  /**
   * Encontra o centro (centroide) de um polígono
   */
  static calculatePolygonCentroid(coordinates: Coordinate[]): Coordinate {
    if (coordinates.length === 0) {
      throw new Error("Polígono vazio");
    }

    let sumLat = 0;
    let sumLng = 0;

    coordinates.forEach((coord) => {
      sumLat += coord.lat;
      sumLng += coord.lng;
    });

    return {
      lat: sumLat / coordinates.length,
      lng: sumLng / coordinates.length,
    };
  }

  /**
   * Calcula a área aproximada de um polígono usando fórmula de Shoelace (em km²)
   */
  static calculatePolygonArea(coordinates: Coordinate[]): number {
    if (coordinates.length < 3) {
      return 0;
    }

    // Fechar o polígono se necessário
    const closed = [...coordinates];
    if (
      closed[0].lat !== closed[closed.length - 1].lat ||
      closed[0].lng !== closed[closed.length - 1].lng
    ) {
      closed.push(closed[0]);
    }

    let area = 0;
    const n = closed.length - 1;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area +=
        this.toRadians(closed[i].lng) *
        (Math.sin(this.toRadians(closed[j].lat)) - Math.sin(this.toRadians(closed[i].lat)));
    }

    area = Math.abs(area * 6371 * 6371) / 2;
    return area;
  }

  /**
   * Normaliza coordenadas para garantir que estão no formato correto
   */
  static normalizeCoordinate(lat: number | string, lng: number | string): Coordinate | null {
    const latNum = typeof lat === "string" ? parseFloat(lat) : lat;
    const lngNum = typeof lng === "string" ? parseFloat(lng) : lng;

    if (isNaN(latNum) || isNaN(lngNum)) {
      return null;
    }

    return {
      lat: latNum,
      lng: lngNum,
    };
  }

  /**
   * Formata coordenadas para string legível
   */
  static formatCoordinate(coord: Coordinate, precision: number = 6): string {
    return `${coord.lat.toFixed(precision)}, ${coord.lng.toFixed(precision)}`;
  }

  /**
   * Converte Coordenada (interface do projeto) para Coordinate
   */
  static coordenadaToCoordinate(coord: { lat: number; lng: number }): Coordinate {
    return {
      lat: coord.lat,
      lng: coord.lng,
    };
  }

  /**
   * Converte Coordinate para Coordenada (interface do projeto)
   */
  static coordinateToCoordenada(coord: Coordinate): { lat: number; lng: number } {
    return {
      lat: coord.lat,
      lng: coord.lng,
    };
  }
}
