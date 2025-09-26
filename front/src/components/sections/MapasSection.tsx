import styled from "styled-components";
import { MapPin, Navigation, Layers, Globe } from "lucide-react";

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  position: relative;

  ${({ theme }) => theme.media.mobile} {
    padding: 4rem 1rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
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

  ${({ theme }) => theme.media.mobile} {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.1rem;
  }
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcfce7;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 2rem 1rem;
    border-radius: 20px;
  }
`;

const MapPlaceholder = styled.div`
  height: 500px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #22c55e;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(34,197,94,0.2)"/><circle cx="80" cy="30" r="2" fill="rgba(34,197,94,0.2)"/><circle cx="50" cy="70" r="2" fill="rgba(34,197,94,0.2)"/><circle cx="30" cy="80" r="2" fill="rgba(34,197,94,0.2)"/></svg>');
    opacity: 0.5;
  }
`;

const MapContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
`;

const MapIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1.5rem;
`;

const MapTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 0.5rem;
`;

const MapDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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
          <MapPlaceholder>
            <MapContent>
              <MapIcon>
                <Globe size={40} />
              </MapIcon>
              <MapTitle>Mapa Interativo</MapTitle>
              <MapDescription>
                Visualização geográfica dos reservatórios e estações de monitoramento
              </MapDescription>
            </MapContent>
          </MapPlaceholder>

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
