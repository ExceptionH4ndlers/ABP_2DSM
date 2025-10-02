import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Database,
  ChevronDown,
  Target,
  FileText,
  BookOpen,
  BarChart3,
  Users,
} from "lucide-react";
import furnasLogo from "../../img/furnas/carbon_budget_p_m.jpg";

type ActiveItemKey =
  | "conteudo"
  | "panorama"
  | "metodologia"
  | "resultados"
  | "participantes"
  | "mapa"
  | "dados";

export type FurnasSidebarProps = {
  collapsed: boolean;
  setCollapsed: (next: boolean) => void;
  activeItem?: ActiveItemKey;
};

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

const MenuItem = styled.button<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem ${({ $collapsed }) => ($collapsed ? "0.5rem" : "1rem")};
  margin: 0.25rem 0;
  color: rgba(255, 255, 255, 0.8);
  background: none;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  position: relative;
  cursor: pointer;
  width: 100%;
  text-align: left;
  &:hover {
    background: rgba(173, 216, 230, 0.2);
    color: white;
    transform: translateX(4px);
  }
  &.active {
    background: rgba(93, 173, 226, 0.3);
    color: white;
  }
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
`;

const DropdownMenu = styled.div<{ $isOpen: boolean; $collapsed: boolean }>`
  position: ${({ $collapsed }) => ($collapsed ? "fixed" : "absolute")};
  ${({ $collapsed }) =>
    $collapsed ? `left: 90px; top: 50%; transform: translateY(-50%);` : `left: 0; top: 100%;`}
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

export function FurnasSidebar({
  collapsed,
  setCollapsed,
  activeItem = "conteudo",
}: FurnasSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isOnMainPage = location.pathname === "/furnas";

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

  // Scroll automático para seções quando a página carrega com hash
  useEffect(() => {
    if (isOnMainPage && location.hash) {
      const elementId = location.hash.substring(1); // Remove o #
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Pequeno delay para garantir que a página carregou
      }
    }
  }, [isOnMainPage, location.hash]);

  return (
    <Sidebar $collapsed={collapsed}>
      <SidebarHeader $collapsed={collapsed}></SidebarHeader>

      <SidebarLogo $collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}>
        <LogoContainer $collapsed={collapsed}>
          <LogoImage src={furnasLogo} alt="Logo Furnas" $collapsed={collapsed} />
          <ClickIndicator $collapsed={collapsed}>!</ClickIndicator>
        </LogoContainer>
      </SidebarLogo>

      <SidebarMenu>
        <DropdownContainer data-dropdown>
          <DropdownButton
            onClick={() => {
              if (collapsed) {
                setCollapsed(false);
                setIsDropdownOpen(true);
              } else {
                setIsDropdownOpen(!isDropdownOpen);
              }
            }}
            $collapsed={collapsed}
          >
            {!collapsed && "Navegação"}
            <ChevronDown size={16} />
          </DropdownButton>

          <DropdownMenu $isOpen={isDropdownOpen && !collapsed} $collapsed={collapsed}>
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

        {!collapsed && (
          <div
            style={{ height: "1px", background: "rgba(255, 255, 255, 0.2)", margin: "1rem 0" }}
          />
        )}

        <MenuItem
          onClick={() => navigate("/furnas")}
          className={activeItem === "conteudo" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <FileText size={16} />
          </MenuIcon>
          {!collapsed && "Conteúdo Principal"}
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/furnas/panorama")}
          className={activeItem === "panorama" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <Target size={16} />
          </MenuIcon>
          {!collapsed && "Panorama"}
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/furnas/metodologia")}
          className={activeItem === "metodologia" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <BookOpen size={16} />
          </MenuIcon>
          {!collapsed && "Metodologia"}
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/furnas/resultados")}
          className={activeItem === "resultados" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <BarChart3 size={16} />
          </MenuIcon>
          {!collapsed && "Resultados"}
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/furnas/participantes")}
          className={activeItem === "participantes" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <Users size={16} />
          </MenuIcon>
          {!collapsed && "Participantes"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isOnMainPage) {
              // Se já está na página principal, faz scroll para a seção
              const mapaElement = document.getElementById("mapa");
              if (mapaElement) {
                mapaElement.scrollIntoView({ behavior: "smooth" });
              }
            } else {
              // Se está em outra página, navega para a página principal com hash
              navigate("/furnas#mapa");
            }
          }}
          className={activeItem === "mapa" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <MapPin size={16} />
          </MenuIcon>
          {!collapsed && "Mapa Interativo"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isOnMainPage) {
              // Se já está na página principal, faz scroll para a seção
              const dadosElement = document.getElementById("dados");
              if (dadosElement) {
                dadosElement.scrollIntoView({ behavior: "smooth" });
              }
            } else {
              // Se está em outra página, navega para a página principal com hash
              navigate("/furnas#dados");
            }
          }}
          className={activeItem === "dados" ? "active" : ""}
          $collapsed={collapsed}
        >
          <MenuIcon $collapsed={collapsed}>
            <Database size={16} />
          </MenuIcon>
          {!collapsed && "Banco de Dados"}
        </MenuItem>
      </SidebarMenu>
    </Sidebar>
  );
}

export default FurnasSidebar;
