import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Database,
  Filter,
  Search,
  BookOpen,
  ChevronDown,
  Target,
  Users,
  FileText,
} from "lucide-react";
import { CsvExportButton } from "../components/CsvExportButton";
import furnasLogo from "../../img/furnas/carbon_budget_p_m.jpg";

const FurnasSPAContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
`;

const Sidebar = styled.aside<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "280px")};
  background: #196d95;
  backdrop-filter: blur(10px);
  border-right: 1px solid #d1d5db;
  padding: 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;
  transition: width 0.3s ease;
  top: 0;
  left: 0;

  /* Scrollbar customizada para evitar flicker */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(173, 216, 230, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(173, 216, 230, 0.5);
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(173, 216, 230, 0.3) transparent;

  @media (max-width: 1024px) {
    width: ${({ $collapsed }) => ($collapsed ? "80px" : "240px")};
  }

  @media (max-width: 768px) {
    width: ${({ $collapsed }) => ($collapsed ? "0" : "100%")};
    position: fixed;
    left: ${({ $collapsed }) => ($collapsed ? "-100%" : "0")};
    transition: left 0.3s ease;
  }
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  background: #196d95;
  padding: 0.5rem ${({ $collapsed }) => ($collapsed ? "0.5rem" : "1rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
`;

const SidebarLogo = styled.div<{ $collapsed: boolean }>`
  padding: 1rem ${({ $collapsed }) => ($collapsed ? "0.5rem" : "1rem")};
  text-align: ${({ $collapsed }) => ($collapsed ? "center" : "left")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(173, 216, 230, 0.1);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LogoContainer = styled.div<{ $collapsed: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ClickIndicator = styled.div<{ $collapsed: boolean }>`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: rgba(93, 173, 226, 0.9);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: ${({ $collapsed }) => ($collapsed ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const LogoImage = styled.img<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "100%" : "35%")};
  height: auto;
  filter: contrast(1.1) brightness(1.05);
  transition: width 0.3s ease;
  margin: 0 auto;
  display: block;

  @media (max-width: 1024px) {
    width: ${({ $collapsed }) => ($collapsed ? "100%" : "30%")};
  }
`;

const SidebarMenu = styled.nav`
  padding: 0 1rem 1rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.a<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem ${({ $collapsed }) => ($collapsed ? "0.5rem" : "1rem")};
  margin: 0.25rem 0;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  position: relative;

  &:hover {
    background: rgba(173, 216, 230, 0.2);
    color: white;
    transform: translateX(4px);
  }

  &.active {
    background: rgba(93, 173, 226, 0.3);
    color: white;
  }

  ${({ $collapsed }) =>
    $collapsed &&
    `
    /* Tooltip removido */
  `}
`;

const DropdownContainer = styled.div`
  position: relative;
  margin: 0.25rem 0;
`;

const DropdownButton = styled.button<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem ${({ $collapsed }) => ($collapsed ? "0.5rem" : "1rem")};
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  background: none;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "space-between")};
  width: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    background: rgba(173, 216, 230, 0.2);
    color: white;
    transform: translateX(4px);
  }

  ${({ $collapsed }) =>
    $collapsed &&
    `
    /* Tooltip removido */
  `}
`;

const DropdownMenu = styled.div<{ $isOpen: boolean; $collapsed: boolean }>`
  position: ${({ $collapsed }) => ($collapsed ? "fixed" : "absolute")};
  ${({ $collapsed }) =>
    $collapsed
      ? `
    left: 90px;
    top: 50%;
    transform: translateY(-50%);
  `
      : `
    left: 0;
    top: 100%;
  `}
  background: #196d95;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(25, 109, 149, 0.3);
  min-width: ${({ $collapsed }) => ($collapsed ? "140px" : "150px")};
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen, $collapsed }) =>
    $isOpen
      ? $collapsed
        ? "translateY(-50%)"
        : "translateY(0)"
      : $collapsed
        ? "translateY(-50%) translateX(-10px)"
        : "translateY(-10px)"};
  transition: all 0.3s ease;
  border: 1px solid rgba(173, 216, 230, 0.3);
`;

const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  text-align: left;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: background 0.2s ease;
  border-radius: 0;
  font-size: 0.9rem;

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    background: rgba(173, 216, 230, 0.2);
    color: white;
  }
`;

const MenuIcon = styled.span<{ $collapsed: boolean }>`
  margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "0.75rem")};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "280px")};
  padding: 2rem;
  max-width: calc(100vw - ${({ $collapsed }) => ($collapsed ? "80px" : "280px")});
  overflow-x: visible;
  transition:
    margin-left 0.3s ease,
    max-width 0.3s ease;

  @media (max-width: 1024px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "240px")};
    max-width: ${({ $collapsed }) => ($collapsed ? "calc(100vw - 80px)" : "calc(100vw - 240px)")};
  }

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
  }
`;

const Section = styled.section`
  background: #ffffff;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  color: #000000;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MapPlaceholder = styled.div`
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 4rem 2rem;
  margin: 2rem 0;
  color: #64748b;
  text-align: center;
`;

const ControlsSection = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 100%;
`;

const DateRangeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DateRangeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const DateRangeSeparator = styled.span`
  color: #6b7280;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const ControlSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ClearButton = styled.button`
  background: white;
  border: 2px solid #9ca3af;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #6b7280;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #64748b;
`;

const ErrorContainer = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #dc2626;
  text-align: center;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  justify-items: center;
  align-items: start;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  /* INPE no topo centralizado */
  & > :nth-child(1) {
    grid-column: 2 / 4;
    max-width: 300px;
    margin: 0 auto;
  }

  /* Base - 4 cards distribuídos */
  & > :nth-child(2) {
    grid-column: 1;
  }

  & > :nth-child(3) {
    grid-column: 2;
  }

  & > :nth-child(4) {
    grid-column: 3;
  }

  & > :nth-child(5) {
    grid-column: 4;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
    
    & > * {
      grid-column: 1 !important;
    }
  }
`;

const ParticipantCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #196d95;
  }
`;

const ParticipantLogo = styled.img`
  max-width: 160px;
  max-height: 100px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: grayscale(0.1) contrast(1.1) brightness(1.05);
  transition: all 0.3s ease;
  cursor: pointer;

  ${ParticipantCard}:hover & {
    filter: grayscale(0) contrast(1.2) brightness(1.1);
    transform: scale(1.05);
  }
`;

const ParticipantName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ParticipantLink = styled.a`
  color: #196d95;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #0f4c75;
    text-decoration: underline;
  }

  /* Quando envolve apenas a logo, não aplicar decoração */
  img + & {
    margin-top: 0.5rem;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  th,
  td {
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
    min-width: 200px;
    min-height: 35px;
    transition: all 0.2s ease;
    width: auto;
  }

  td {
    padding: 0.6rem 1rem;
  }

  th {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
    position: sticky;
    top: 0;
    z-index: 10;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    height: 50px;
    padding: 0.8rem 1rem;
  }

  td {
    font-size: 1rem;
    color: #374151;
    height: 35px;
  }

  tr:hover {
    background: #f3f4f6;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }

  tr:nth-child(even):hover {
    background: #f3f4f6;
  }
`;

function FurnasSPAPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-dropdown]")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const [filters, setFilters] = useState({
    startDate: "2006-01-01", // Período do projeto Furnas
    endDate: "2013-12-31",
    limit: 10,
    reservatorio: "", // Filtro por reservatório
    sortOrder: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    // Simular busca de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: "2006-01-01",
      endDate: "2013-12-31",
      limit: 10,
      reservatorio: "",
      sortOrder: "desc",
    });
  };

  return (
    <FurnasSPAContainer>
      <Sidebar $collapsed={sidebarCollapsed}>
        <SidebarHeader $collapsed={sidebarCollapsed}></SidebarHeader>

        <SidebarLogo
          $collapsed={sidebarCollapsed}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <LogoContainer $collapsed={sidebarCollapsed}>
            <LogoImage src={furnasLogo} alt="Logo Furnas" $collapsed={sidebarCollapsed} />
            <ClickIndicator $collapsed={sidebarCollapsed}>!</ClickIndicator>
          </LogoContainer>
        </SidebarLogo>

        <SidebarMenu>
          {/* Dropdown de Navegação Global */}
          <DropdownContainer data-dropdown>
            <DropdownButton
              onClick={() => {
                if (sidebarCollapsed) {
                  setSidebarCollapsed(false);
                  setIsDropdownOpen(true);
                } else {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              $collapsed={sidebarCollapsed}
            >
              {!sidebarCollapsed && "Navegação"}
              <ChevronDown size={16} />
            </DropdownButton>

            <DropdownMenu
              $isOpen={isDropdownOpen && !sidebarCollapsed}
              $collapsed={sidebarCollapsed}
            >
              <DropdownItem
                onClick={() => {
                  navigate("/");
                  setIsDropdownOpen(false);
                }}
              >
                Início
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  navigate("/sima");
                  setIsDropdownOpen(false);
                }}
              >
                SIMA
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  navigate("/balcar");
                  setIsDropdownOpen(false);
                }}
              >
                BALCAR
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>

          {/* Separador visual */}
          {!sidebarCollapsed && (
            <div
              style={{
                height: "1px",
                background: "rgba(255, 255, 255, 0.2)",
                margin: "1rem 0",
              }}
            />
          )}

          {/* Links Locais do Projeto */}
          <MenuItem href="#conteudo" className="active" $collapsed={sidebarCollapsed}>
            <MenuIcon $collapsed={sidebarCollapsed}>
              <FileText size={16} />
            </MenuIcon>
            {!sidebarCollapsed && "Conteúdo"}
          </MenuItem>
          <MenuItem href="/furnas/panorama" $collapsed={sidebarCollapsed}>
            <MenuIcon $collapsed={sidebarCollapsed}>
              <Target size={16} />
            </MenuIcon>
            {!sidebarCollapsed && "Panorama"}
          </MenuItem>
          <MenuItem href="#mapa" $collapsed={sidebarCollapsed}>
            <MenuIcon $collapsed={sidebarCollapsed}>
              <MapPin size={16} />
            </MenuIcon>
            {!sidebarCollapsed && "Mapa Interativo"}
          </MenuItem>
          <MenuItem href="#dados" $collapsed={sidebarCollapsed}>
            <MenuIcon $collapsed={sidebarCollapsed}>
              <Database size={16} />
            </MenuIcon>
            {!sidebarCollapsed && "Banco de Dados"}
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent $collapsed={sidebarCollapsed}>
        {/* Seção Objetivos Gerais */}
        <Section id="conteudo">
          <SectionTitle>
            <Target size={40} />
            Objetivos Gerais
          </SectionTitle>
          <SectionSubtitle>
            Metas principais do projeto Balanço de Carbono em Reservatórios Hidrelétricos
          </SectionSubtitle>

          <SectionText>
            <strong>• Determinar as emissões de gases de efeito estufa:</strong> gás carbônico,
            metano e óxido nitroso, dos reservatórios de FURNAS Centrais Elétricas S.A.;
          </SectionText>

          <SectionText>
            <strong>• Identificar as rotas do ciclo do carbono:</strong> nesses reservatórios e os
            fatores ambientais envolvidos;
          </SectionText>

          <SectionText>
            <strong>• Avaliar a influência dos fatores:</strong> morfológicos, morfométricos,
            biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;
          </SectionText>

          <SectionText>
            <strong>• Determinar o padrão de emissão existente:</strong> anteriormente à construção
            de reservatórios;
          </SectionText>

          <SectionText>
            <strong>• Elaborar um modelo espacial e temporal:</strong> de emissão de gases para
            reservatórios implantados em ambientes de Cerrado.
          </SectionText>
        </Section>

        {/* Seção Introdução */}
        <Section>
          <SectionTitle>
            <BookOpen size={40} />
            Introdução
          </SectionTitle>
          <SectionSubtitle>Contexto científico e regulatório do projeto</SectionSubtitle>

          <SectionText>
            A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode causar
            severas consequências ambientais em escalas regionais e global, tendendo a afetar mais
            os países em desenvolvimento, localizados em baixas latitudes, do que os países do
            hemisfério Norte.
          </SectionText>

          <SectionText>
            O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima,
            comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem como
            das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás carbônico,
            metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o primeiro passo na
            busca de medidas mitigadoras.
          </SectionText>

          <SectionText>
            A partir da última década, a comunidade científica tem questionado se os reservatórios
            destinados à geração hidrelétrica contribuem substancialmente para o aumento do efeito
            estufa. Assim, tornam-se necessárias investigações nessa área. Além disso, é importante
            que o setor elétrico nacional verifique as opções disponíveis para redução das emissões
            de gases de efeito estufa por unidade de energia gerada, de modo que possa se qualificar
            para o mercado mundial das Reduções Certificadas de Emissão.
          </SectionText>

          <SectionText>
            O presente projeto constitui a etapa inicial na realização do balanço de carbono de
            FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das usinas
            hidrelétricas poderão ser comparadas às emissões produzidas pela geração termelétrica e,
            então, contrastadas com o carbono fixado por meio dos projetos de reflorestamento da
            Empresa.
          </SectionText>

          <SectionText>
            Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um
            investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de
            eletricidade, em pesquisa e desenvolvimento no setor elétrico. Os procedimentos para os
            projetos são determinados pela{" "}
            <a 
              href="https://www.gov.br/aneel/pt-br" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "#196d95", 
                textDecoration: "underline",
                fontWeight: "600"
              }}
            >
              Agência Nacional de Energia Elétrica (ANEEL)
            </a>.
          </SectionText>

          <SectionText>
            <strong>Gerente do Projeto:</strong> André Carlos Prates Cimbleris
            <br />
            <strong>Telefone:</strong> (21)2528-5436
          </SectionText>
        </Section>

        {/* Seção Participantes */}
        <Section>
          <SectionTitle>
            <Users size={40} />
            Participantes
          </SectionTitle>
          <SectionSubtitle>
            Instituições parceiras no projeto Balanço de Carbono
          </SectionSubtitle>

          <ParticipantsGrid>
            {/* INPE no topo centralizado */}
            <ParticipantCard>
              <ParticipantLink 
                href="https://www.gov.br/inpe/pt-br" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ParticipantLogo 
                  src="/img/furnas/inpe_logo_participante.jpg" 
                  alt="Instituto Nacional de Pesquisas Espaciais" 
                />
              </ParticipantLink>
              <ParticipantName>Instituto Nacional de Pesquisas Espaciais</ParticipantName>
            </ParticipantCard>

            {/* Base - 4 participantes */}
            <ParticipantCard>
              <ParticipantLink 
                href="https://www.furnas.com.br/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ParticipantLogo 
                  src="/img/furnas/furnaslogo_participante.jpg" 
                  alt="FURNAS Centrais Elétricas S.A." 
                />
              </ParticipantLink>
              <ParticipantName>FURNAS Centrais Elétricas S.A.</ParticipantName>
            </ParticipantCard>

            <ParticipantCard>
              <ParticipantLogo 
                src="/img/furnas/logo_ufjf_participante.gif" 
                alt="Universidade Federal de Juiz de Fora" 
              />
              <ParticipantName>Universidade Federal de Juiz de Fora</ParticipantName>
            </ParticipantCard>

            <ParticipantCard>
              <ParticipantLink 
                href="https://coppe.ufrj.br/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ParticipantLogo 
                  src="/img/furnas/coppe_participante.jpg" 
                  alt="UFRJ - Programas de Pós-graduação de Engenharia" 
                />
              </ParticipantLink>
              <ParticipantName>UFRJ - Programas de Pós-graduação de Engenharia</ParticipantName>
            </ParticipantCard>

            <ParticipantCard>
              <ParticipantLink 
                href="https://www.iie.com.br/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ParticipantLogo 
                  src="/img/furnas/iiega_logo_participante.jpg" 
                  alt="Instituto Internacional de Ecologia e Gerenciamento Ambiental" 
                />
              </ParticipantLink>
              <ParticipantName>Instituto Internacional de Ecologia e Gerenciamento Ambiental</ParticipantName>
            </ParticipantCard>
          </ParticipantsGrid>
        </Section>

        {/* Seção Mapa */}
        <Section id="mapa">
          <SectionTitle>
            <MapPin size={40} />
            Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>Reservatórios estudados no projeto Balanço de Carbono</SectionSubtitle>

          <MapPlaceholder>
            <MapPin size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h3>Mapa Interativo dos Reservatórios</h3>
            <p>
              Visualização geográfica dos reservatórios hidrelétricos estudados no projeto,
              incluindo dados de localização, características ambientais e resultados das campanhas
              científicas.
            </p>
          </MapPlaceholder>
        </Section>

        {/* Seção Banco de Dados */}
        <Section id="dados">
          <SectionTitle>
            <Database size={40} />
            Banco de Dados
          </SectionTitle>
          <SectionSubtitle>
            Consulte e visualize os dados coletados nas campanhas científicas
          </SectionSubtitle>

          <ControlsSection>
            <ControlsGrid>
              <DateRangeGroup>
                <ControlLabel>Período</ControlLabel>
                <DateRangeContainer>
                  <DateRangeInput
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                  <DateRangeSeparator>até</DateRangeSeparator>
                  <DateRangeInput
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </DateRangeContainer>
              </DateRangeGroup>
              <ControlGroup>
                <ControlLabel>Reservatório</ControlLabel>
                <ControlSelect
                  value={filters.reservatorio}
                  onChange={(e) => setFilters({ ...filters, reservatorio: e.target.value })}
                >
                  <option value="">Todos os reservatórios</option>
                  <option value="furnas">Furnas</option>
                  <option value="itumbiara">Itumbiara</option>
                  <option value="embarcacao">Embarcação</option>
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Registros por página</ControlLabel>
                <ControlSelect
                  value={filters.limit}
                  onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Ordenação</ControlLabel>
                <ControlSelect
                  value={filters.sortOrder}
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                >
                  <option value="desc">Mais recente → Mais antigo</option>
                  <option value="asc">Mais antigo → Mais recente</option>
                </ControlSelect>
              </ControlGroup>
            </ControlsGrid>

            <ActionButtons>
              <SearchButton onClick={handleSearch} disabled={loading}>
                <Search size={20} />
                {loading ? "Buscando..." : "Buscar Dados"}
              </SearchButton>
              <ClearButton onClick={handleClearFilters}>
                <Filter size={20} />
                Limpar Filtros
              </ClearButton>
              <CsvExportButton data={[]} filename="dados_furnas.csv" />
            </ActionButtons>
          </ControlsSection>

          {error && (
            <ErrorContainer>
              <strong>Erro ao carregar dados:</strong> {error}
            </ErrorContainer>
          )}

          {loading ? (
            <LoadingContainer>
              <Search size={24} style={{ marginRight: "0.5rem" }} />
              Carregando dados das campanhas científicas...
            </LoadingContainer>
          ) : (
            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Reservatório</th>
                    <th>Data</th>
                    <th>CH₄ (mg/m²/d)</th>
                    <th>CO₂ (mg/m²/d)</th>
                    <th>N₂O (mg/m²/d)</th>
                    <th>Temperatura (°C)</th>
                    <th>Profundidade (m)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}
                    >
                      Selecione os filtros e clique em "Buscar Dados" para visualizar os resultados
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
            </TableContainer>
          )}
        </Section>
      </MainContent>
    </FurnasSPAContainer>
  );
}

export default FurnasSPAPage;
