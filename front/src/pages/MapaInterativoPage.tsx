import styled from "styled-components";
import { Filter } from "lucide-react";

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
    max-width: 100%;
  }
`;

const PageTitle = styled.h2`
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.75rem;
  }
`;

const PageSubtitle = styled.p`
  color: #475569;
  text-align: center;
  margin: 0 0 1.5rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.9rem;
    margin: 0 0 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 70vh;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1.5rem;
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem;
    padding: 0;
  }
`;

const DataPanel = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.colors.card.shadow};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(30, 64, 175, 0.2);
    border-color: rgba(30, 64, 175, 0.25);
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 1.25rem;
    border-radius: 16px;
    margin: 0;
    box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);

    &:hover {
      transform: none;
      box-shadow: 0 4px 20px rgba(30, 64, 175, 0.15);
    }
  }
`;

const FilterButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  margin-bottom: 1.5rem;
  min-height: 44px;
  min-width: 100px;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0.875rem 1.25rem;
    min-height: 48px;
    font-size: 0.9rem;
    margin-left: 0;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: center;

    &:hover {
      transform: none;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(5px);
  min-width: 300px;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.8rem;
    border-radius: 8px;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 12px;

  ${({ theme }) => theme.media.mobile} {
    border-radius: 8px;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;

  ${({ theme }) => theme.media.mobile} {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 0.875rem;
  white-space: nowrap;

  ${({ theme }) => theme.media.mobile} {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(249, 250, 251, 0.5);
  }
`;

const MapPanel = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.colors.card.shadow};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(30, 64, 175, 0.2);
    border-color: rgba(30, 64, 175, 0.25);
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 1.25rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);

    &:hover {
      transform: none;
      box-shadow: 0 4px 20px rgba(30, 64, 175, 0.15);
    }
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #f0f0f0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
  flex: 1;

  ${({ theme }) => theme.media.mobile} {
    min-height: 300px;
    border-radius: 6px;
  }
`;

const MapPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
  z-index: 1;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
  }
`;

const MapMarker = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: scale(1.2);
    background: #dc2626;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #ef4444;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 16px;
    height: 16px;
    border: 2px solid white;

    &::after {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid #ef4444;
      bottom: -6px;
    }
  }
`;

const MapLabel = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  pointer-events: none;
  transform: translate(-50%, -100%);
  margin-top: -5px;
  z-index: 3;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }
`;

function MapaInterativoPage() {
  return (
    <PageContainer>
      <MainContent>
        <PageTitle>Mapa Interativo</PageTitle>
        <PageSubtitle>Visualize as estações e registros no mapa</PageSubtitle>

        <ContentGrid>
          <DataPanel>
            <FilterButton>
              <Filter size={16} />
              Filtro
            </FilterButton>

            <TableWrapper>
              <DataTable>
                <thead>
                  <tr>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>Data e Hora</TableHeader>
                    <TableHeader>Temp</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>123</TableCell>
                    <TableCell>22:10</TableCell>
                    <TableCell>22°</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>124</TableCell>
                    <TableCell>23:10</TableCell>
                    <TableCell>21°</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>125</TableCell>
                    <TableCell>00:10</TableCell>
                    <TableCell>20°</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>126</TableCell>
                    <TableCell>01:10</TableCell>
                    <TableCell>19°</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>127</TableCell>
                    <TableCell>02:10</TableCell>
                    <TableCell>18°</TableCell>
                  </TableRow>
                </tbody>
              </DataTable>
            </TableWrapper>
          </DataPanel>

          <MapPanel>
            <MapContainer>
              <MapPlaceholder>
                Mapa Interativo
                <br />
                <small>Visualização dos dados de monitoramento</small>
              </MapPlaceholder>

              {/* Marcadores simulados */}
              <MapMarker x={30} y={40} />
              <MapLabel x={30} y={40}>
                Estação 1
              </MapLabel>

              <MapMarker x={60} y={30} />
              <MapLabel x={60} y={30}>
                Estação 2
              </MapLabel>

              <MapMarker x={45} y={60} />
              <MapLabel x={45} y={60}>
                Estação 3
              </MapLabel>

              <MapMarker x={75} y={50} />
              <MapLabel x={75} y={50}>
                Estação 4
              </MapLabel>
            </MapContainer>
          </MapPanel>
        </ContentGrid>
      </MainContent>
    </PageContainer>
  );
}

export default MapaInterativoPage;
