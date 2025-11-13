import { useState } from "react";
import styled from "styled-components";
import { MapPin, Navigation, Layers } from "lucide-react";
import { useMapData } from "../../hooks/useMapData";
import InteractiveMap from "../InteractiveMap";

const SectionContainer = styled.section`
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  position: relative;

  ${({ theme }) => theme.media.sm} {
    padding: 5rem 1.5rem;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 6rem 2rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.sm} {
    margin-bottom: 3.5rem;
  }

  ${({ theme }) => theme.media.lg} {
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #166534;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #22c55e, #16a34a);
    border-radius: 2px;
  }

  ${({ theme }) => theme.media.sm} {
    font-size: 2.6rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  ${({ theme }) => theme.media.sm} {
    font-size: 1.1rem;
  }
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem 1.25rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcfce7;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.md} {
    padding: 3rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2.5rem;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #dcfce7;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(34, 197, 94, 0.15);
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #166534;
  margin: 0;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`;

const ReservoirsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ReservoirCard = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #dcfce7;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #dcfce7;
  }
`;

const ReservoirIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const ReservoirName = styled.div`
  font-weight: 600;
  color: #166534;
  margin-bottom: 0.5rem;
`;

const ReservoirLocation = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

function MapasSection() {
  // Hook para dados do mapa - todos os tipos
  const {
    mapPoints,
    loading: mapLoading,
    error: mapError,
  } = useMapData({
    showSima: true,
    showFurnas: true,
    showBalcar: true,
  });

  const [mapFilters, setMapFilters] = useState({
    showSima: true,
    showFurnas: true,
    showBalcar: true,
  });

  return (
    <SectionContainer id="mapas">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Mapas Interativos</SectionTitle>
          <SectionSubtitle>
            Visualize a localização geográfica dos dados coletados nos reservatórios
          </SectionSubtitle>
        </SectionHeader>

        <MapContainer>
          <InteractiveMap
            points={mapPoints}
            loading={mapLoading}
            error={mapError}
            filters={mapFilters}
            onFiltersChange={setMapFilters}
            onMarkerClick={(point) => {
              console.log("Ponto clicado:", point);
              // Aqui você pode adicionar lógica para mostrar detalhes
            }}
          />

          <FeaturesGrid>
            <FeatureCard>
              <FeatureHeader>
                <FeatureIcon>
                  <MapPin size={24} />
                </FeatureIcon>
                <FeatureTitle>Localização Precisa</FeatureTitle>
              </FeatureHeader>
              <FeatureDescription>
                Visualize a localização exata de cada estação de monitoramento e reservatório com
                coordenadas geográficas precisas.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureHeader>
                <FeatureIcon>
                  <Navigation size={24} />
                </FeatureIcon>
                <FeatureTitle>Navegação Interativa</FeatureTitle>
              </FeatureHeader>
              <FeatureDescription>
                Navegue pelo mapa com zoom, pan e seleção de áreas específicas para análise
                detalhada dos dados.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureHeader>
                <FeatureIcon>
                  <Layers size={24} />
                </FeatureIcon>
                <FeatureTitle>Camadas de Dados</FeatureTitle>
              </FeatureHeader>
              <FeatureDescription>
                Ative e desative diferentes camadas de dados para visualizar parâmetros específicos
                e períodos de tempo.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>

          <div style={{ marginTop: "3rem" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#166534",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Reservatórios Monitorados
            </h3>
            <ReservoirsList>
              <ReservoirCard>
                <ReservoirIcon>
                  <MapPin size={20} />
                </ReservoirIcon>
                <ReservoirName>Furnas</ReservoirName>
                <ReservoirLocation>Minas Gerais</ReservoirLocation>
              </ReservoirCard>

              <ReservoirCard>
                <ReservoirIcon>
                  <MapPin size={20} />
                </ReservoirIcon>
                <ReservoirName>Água Vermelha</ReservoirName>
                <ReservoirLocation>São Paulo</ReservoirLocation>
              </ReservoirCard>

              <ReservoirCard>
                <ReservoirIcon>
                  <MapPin size={20} />
                </ReservoirIcon>
                <ReservoirName>Emborcação</ReservoirName>
                <ReservoirLocation>Minas Gerais</ReservoirLocation>
              </ReservoirCard>

              <ReservoirCard>
                <ReservoirIcon>
                  <MapPin size={20} />
                </ReservoirIcon>
                <ReservoirName>Jaguara</ReservoirName>
                <ReservoirLocation>Minas Gerais</ReservoirLocation>
              </ReservoirCard>

              <ReservoirCard>
                <ReservoirIcon>
                  <MapPin size={20} />
                </ReservoirIcon>
                <ReservoirName>Luiz Carlos Barreto</ReservoirName>
                <ReservoirLocation>Minas Gerais</ReservoirLocation>
              </ReservoirCard>

              <ReservoirCard>
                <ReservoirIcon>
                  <MapPin size={20} />
                </ReservoirIcon>
                <ReservoirName>Mascarenhas de Moraes</ReservoirName>
                <ReservoirLocation>Minas Gerais</ReservoirLocation>
              </ReservoirCard>
            </ReservoirsList>
          </div>
        </MapContainer>
      </SectionContent>
    </SectionContainer>
  );
}

export default MapasSection;
