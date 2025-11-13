import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Map,
  Database,
  Target,
  BookOpen,
  FileText,
  Users,
} from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NavigationContainer = styled.nav`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  ${({ theme }) => theme.media.md} {
    padding: 0 2rem;
    height: 70px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;

  ${({ theme }) => theme.media.md} {
    font-size: 1.25rem;
    gap: 0.75rem;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
  z-index: 900;

  ${({ theme }) => theme.media.md} {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  color: white;
  text-decoration: none;
  font-weight: 500;
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 0;
  transition: all 0.2s ease;
  background: ${({ $isActive }) => ($isActive ? "rgba(255, 255, 255, 0.2)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${({ theme }) => theme.media.md} {
    width: auto;
    padding: 0.5rem 1rem;
    border-radius: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{ $isActive?: boolean }>`
  background: ${({ $isActive }) => ($isActive ? "rgba(255, 255, 255, 0.2)" : "transparent")};
  border: none;
  color: white;
  font-weight: 500;
  padding: 1rem;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${({ theme }) => theme.media.md} {
    width: auto;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    justify-content: flex-start;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  margin-top: 0.5rem;

  ${({ theme }) => theme.media.md} {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 1000;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-10px)")};
    transition: all 0.2s ease;
    border: 1px solid #e2e8f0;
    display: block;
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.75rem 2rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${({ theme }) => theme.media.md} {
    color: #374151;
    padding: 0.75rem 1rem;
    border-radius: 0;

    &:first-child {
      border-radius: 12px 12px 0 0;
    }

    &:last-child {
      border-radius: 0 0 12px 12px;
    }

    &:hover {
      background: #f3f4f6;
    }
  }
`;

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isSimaDropdownOpen, setIsSimaDropdownOpen] = useState(false);
  const [isBalcarDropdownOpen, setIsBalcarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeSection = location.pathname === "/" ? "home" : location.pathname.substring(1);
  const isSimaActive = activeSection.startsWith("sima");

  const isBalcarActive = activeSection.startsWith("balcar");

  // Títulos específicos para cada página
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Portal Limnológico";
      case "/sima":
        return "SIMA - Portal de Dados Hidrológicos";
      case "/furnas":
        return "Balanço de Carbono - Furnas";
      case "/balcar":
        return "BALCAR - Balanço de Carbono";
      default:
        return "Portal Limnológico";
    }
  };

  const navigateToSection = (path: string) => {
    if (path.startsWith("/sima")) {
      // rota dedicada de publicações do SIMA
      if (path === "/sima/publicacoes") {
        navigate(path);
        setIsMobileMenuOpen(false);
        setIsSimaDropdownOpen(false);
        setIsBalcarDropdownOpen(false);
        return;
      }
      const sectionId = path.replace("/sima", "").replace("-", "");

      // Se já estamos na página SIMA, apenas fazer scroll
      if (location.pathname === "/sima") {
        if (sectionId === "home" || sectionId === "") {
          // Para home, ir para a seção "Sobre o SIMA"
          const element = document.getElementById("home");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else if (sectionId === "equipe") {
          const element = document.getElementById("equipe");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else {
        // Se não estamos na página SIMA, navegar primeiro
        navigate("/sima");
        setTimeout(() => {
          if (sectionId === "home" || sectionId === "") {
            // Para home ou navegação geral, ir para o topo da página
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (sectionId === "equipe") {
            const element = document.getElementById("equipe");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          } else if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, 100);
      }
    } else {
      // Navegação com âncoras para BALCAR
      if (path.startsWith("/balcar") && path.includes("-")) {
        const sectionId = path.replace("/balcar", "").replace("-", "");
        if (location.pathname === "/balcar") {
          if (sectionId === "home" || sectionId === "") {
            const element = document.getElementById("home");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          } else {
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          navigate("/balcar");
          setTimeout(() => {
            if (sectionId === "home" || sectionId === "") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              const element = document.getElementById(sectionId);
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      } else {
        navigate(path);
        // Para Furnas, garantir que vá para o topo da página
        if (path === "/furnas") {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 100);
        }
      }
    }
    setIsMobileMenuOpen(false);
    setIsSimaDropdownOpen(false);
    setIsBalcarDropdownOpen(false);
  };

  const handleSimaDropdownToggle = () => {
    setIsSimaDropdownOpen(!isSimaDropdownOpen);
    setIsBalcarDropdownOpen(false);
  };

  const handleBalcarDropdownToggle = () => {
    setIsBalcarDropdownOpen(!isBalcarDropdownOpen);
    setIsSimaDropdownOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSimaDropdownOpen(false);
        setIsBalcarDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavigationContainer>
      <NavContent>
        <NavContentWrapper>
          <Logo>{getPageTitle()}</Logo>
        </NavContentWrapper>

        <NavLinks $isOpen={isMobileMenuOpen}>
          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection("/");
            }}
            $isActive={activeSection === "home"}
          >
            Início
          </NavLink>

          <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={handleSimaDropdownToggle} $isActive={isSimaActive}>
              SIMA
              <ChevronDown size={16} />
            </DropdownButton>
            <DropdownMenu $isOpen={isSimaDropdownOpen}>
              <DropdownItem onClick={() => navigateToSection("/sima")}>
                <Home size={16} />
                Home
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/sima-equipe")}>
                <Users size={16} />
                Equipe
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/sima/publicacoes")}>
                <BookOpen size={16} />
                Publicações
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/sima-apoio")}>
                <Target size={16} />
                Apoio Institucional
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/sima-mapa")}>
                <Map size={16} />
                Mapa
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/sima-dados")}>
                <Database size={16} />
                Banco de Dados
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>

          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection("/furnas");
            }}
            $isActive={activeSection === "furnas"}
          >
            Balanço de Carbono
          </NavLink>

          <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={handleBalcarDropdownToggle} $isActive={isBalcarActive}>
              BALCAR
              <ChevronDown size={16} />
            </DropdownButton>
            <DropdownMenu $isOpen={isBalcarDropdownOpen}>
              <DropdownItem onClick={() => navigateToSection("/balcar")}>
                <Home size={16} />
                Home
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/balcar/descricao")}>
                <FileText size={16} />
                Descrição
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/balcar/publicacoes")}>
                <BookOpen size={16} />
                Publicações
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/balcar-equipe")}>
                <Users size={16} />
                Equipe
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/balcar-mapa")}>
                <Map size={16} />
                Mapa Interativo
              </DropdownItem>
              <DropdownItem onClick={() => navigateToSection("/balcar-dados")}>
                <Database size={16} />
                Banco de Dados
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        </NavLinks>

        <ButtonGroup>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "6px",
            }}
            title={theme === "light" ? "Modo Escuro" : "Modo Claro"}
          >
            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </ButtonGroup>
      </NavContent>
    </NavigationContainer>
  );
}

export default Navigation;
