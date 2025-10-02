import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Database,
  ChevronDown,
  Target,
  FileText,
} from "lucide-react";
import furnasLogo from "../../img/furnas/carbon_budget_p_m.jpg";

const FurnasPanoramaContainer = styled.div`
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

function FurnasPanoramaPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fechar dropdown quando clicar fora (mesmo comportamento do SPA)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
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

  return (
    <FurnasPanoramaContainer>
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
          <MenuItem href="#conteudo" $collapsed={sidebarCollapsed}>
            <MenuIcon $collapsed={sidebarCollapsed}>
              <FileText size={16} />
            </MenuIcon>
            {!sidebarCollapsed && "Conteúdo"}
          </MenuItem>
          <MenuItem href="/furnas/panorama" className="active" $collapsed={sidebarCollapsed}>
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
        {/* Seção Panorama */}
        <Section>
          <SectionTitle>
            <Target size={40} />
            Panorama
          </SectionTitle>
          <SectionSubtitle>
            Visão geral do projeto Balanço de Carbono
          </SectionSubtitle>
          <SectionText>
            Esta seção será desenvolvida com conteúdo específico sobre o panorama do projeto.
          </SectionText>
        </Section>
      </MainContent>
    </FurnasPanoramaContainer>
  );
}

export default FurnasPanoramaPage;
