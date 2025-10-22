import { useState, useEffect } from 'react';

interface EstacaoSima {
  idestacao: string;
  idhexadecimal: string;
  rotulo: string;
  lat: number;
  lng: number;
  inicio: string;
  fim?: string;
}

interface Reservatorio {
  idReservatorio: string;
  nome: string;
  lat: string;
  lng: string;
}

interface SimaApiResponse {
  data: EstacaoSima[];
}

interface ReservatorioApiResponse {
  data: Reservatorio[];
}

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'sima' | 'furnas' | 'balcar';
  data?: EstacaoSima | Reservatorio;
  description?: string;
  period?: {
    start: string;
    end?: string;
  };
}

export interface MapFilters {
  showSima: boolean;
  showFurnas: boolean;
  showBalcar: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  region?: string;
}

export function useMapData(filters: MapFilters = {
  showSima: true,
  showFurnas: true,
  showBalcar: true
}) {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const points: MapPoint[] = [];

        // Buscar dados SIMA (estações)
        if (filters.showSima) {
          try {
            // Usar sempre URL absoluta para funcionar no Docker
            const simaResponse = await fetch('http://localhost:3001/sima/estacao/map');
            if (simaResponse.ok) {
              const simaData: SimaApiResponse = await simaResponse.json();
              const simaPoints: MapPoint[] = simaData.data
                .filter((estacao: EstacaoSima) => estacao.lat && estacao.lng)
                .map((estacao: EstacaoSima) => ({
                  id: `sima-${estacao.idestacao}`,
                  name: estacao.rotulo || `Estação ${estacao.idhexadecimal}`,
                  lat: estacao.lat,
                  lng: estacao.lng,
                  type: 'sima' as const,
                  data: estacao,
                  description: `Estação SIMA ${estacao.idhexadecimal}`,
                  period: {
                    start: estacao.inicio,
                    end: estacao.fim || undefined
                  }
                }));
              points.push(...simaPoints);
            }
          } catch (err) {
            console.warn('Erro ao buscar dados SIMA:', err);
          }
        }

        // Buscar dados Furnas (reservatórios)
        if (filters.showFurnas) {
          try {
            const furnasResponse = await fetch('http://localhost:3001/furnas/reservatorio/all');
            if (furnasResponse.ok) {
              const furnasData: ReservatorioApiResponse = await furnasResponse.json();
              const furnasPoints: MapPoint[] = furnasData.data
                .filter((reservatorio: Reservatorio) => reservatorio.lat && reservatorio.lng)
                .map((reservatorio: Reservatorio) => ({
                  id: `furnas-${reservatorio.idReservatorio}`,
                  name: reservatorio.nome,
                  lat: parseFloat(reservatorio.lat),
                  lng: parseFloat(reservatorio.lng),
                  type: 'furnas' as const,
                  data: reservatorio,
                  description: `Reservatório Furnas`
                }));
              points.push(...furnasPoints);
            }
          } catch (err) {
            console.warn('Erro ao buscar dados Furnas:', err);
          }
        }

        // Buscar dados BALCAR (reservatórios)
        if (filters.showBalcar) {
          try {
            const balcarResponse = await fetch('http://localhost:3001/balcar/reservatorio/all');
            if (balcarResponse.ok) {
              const balcarData: ReservatorioApiResponse = await balcarResponse.json();
              const balcarPoints: MapPoint[] = balcarData.data
                .filter((reservatorio: Reservatorio) => reservatorio.lat && reservatorio.lng)
                .map((reservatorio: Reservatorio) => ({
                  id: `balcar-${reservatorio.idReservatorio}`,
                  name: reservatorio.nome,
                  lat: parseFloat(reservatorio.lat),
                  lng: parseFloat(reservatorio.lng),
                  type: 'balcar' as const,
                  data: reservatorio,
                  description: `Reservatório BALCAR`
                }));
              points.push(...balcarPoints);
            }
          } catch (err) {
            console.warn('Erro ao buscar dados BALCAR:', err);
          }
        }

        // Aplicar filtros adicionais
        let filteredPoints = points;

        if (filters.dateRange?.start && filters.dateRange?.end) {
          filteredPoints = filteredPoints.filter(point => {
            if (point.type === 'sima' && point.period?.start) {
              const pointStart = new Date(point.period.start);
              const filterStart = new Date(filters.dateRange!.start);
              const filterEnd = new Date(filters.dateRange!.end);
              if (isNaN(pointStart.getTime()) || isNaN(filterStart.getTime()) || isNaN(filterEnd.getTime())) {
                return true;
              }
              return pointStart >= filterStart && pointStart <= filterEnd;
            }
            return true;
          });
        }

        if (filters.region) {
          filteredPoints = filteredPoints.filter(() => {
            // Implementar filtro por região baseado nas coordenadas
            // Por enquanto, retorna todos os pontos
            return true;
          });
        }

        setMapPoints(filteredPoints);
      } catch (err) {
        setError('Erro ao carregar dados do mapa');
        console.error('Erro ao buscar dados do mapa:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, [filters.showSima, filters.showFurnas, filters.showBalcar, filters.dateRange, filters.region]);

  return {
    mapPoints,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      // Trigger re-fetch by updating a dependency
    }
  };
}
