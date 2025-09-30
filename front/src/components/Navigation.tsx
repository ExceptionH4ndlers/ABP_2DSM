import { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu, X, ChevronDown } from "lucide-react";

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
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 1rem;
    height: 60px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.1rem;
    gap: 0.5rem;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;

  ${({ theme }) => theme.media.mobile} {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${({ theme }) => theme.media.tablet} {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
    gap: 0;
  }
`;

const NavLink = styled.a<{ isActive?: boolean }>`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  background: ${({ isActive }) => (isActive ? "rgba(255, 255, 255, 0.2)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-radius: 0;

    &:hover {
      transform: none;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
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

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  z-index: 1001;

  ${({ theme }) => theme.media.tablet} {
    position: static;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 0;
    border-radius: 0;
  }
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  ${({ theme }) => theme.media.tablet} {
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    justify-content: center;
    padding: 1rem;
    border-radius: 0;
  }
`;

const ChevronIcon = styled(ChevronDown)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sima", "balanco-carbono", "balcar", "dashboard"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <NavigationContainer>
      <NavContent>
        <Logo>
          <LogoIcon>INPE</LogoIcon>
          Portal Limnologia
        </Logo>

        <NavLinks isOpen={isMobileMenuOpen}>
          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            isActive={activeSection === "home"}
          >
            Início
          </NavLink>

          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("sima");
            }}
            isActive={activeSection === "sima"}
          >
            SIMA
          </NavLink>

          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("balanco-carbono");
            }}
            isActive={activeSection === "balanco-carbono"}
          >
            Balanço de Carbono
          </NavLink>

          <NavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("balcar");
            }}
            isActive={activeSection === "balcar"}
          >
            BALCAR
          </NavLink>

          <Dropdown isOpen={dropdownOpen}>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              Dados
              <ChevronIcon isOpen={dropdownOpen} size={16} />
            </DropdownButton>
            <DropdownContent isOpen={dropdownOpen}>
              <DropdownItem
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("dashboard");
                  setDropdownOpen(false);
                }}
              >
                Dashboard Interativo
              </DropdownItem>
              <DropdownItem
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("mapas");
                  setDropdownOpen(false);
                }}
              >
                Mapas Interativos
              </DropdownItem>
              <DropdownItem
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("graficos");
                  setDropdownOpen(false);
                }}
              >
                Gráficos Temporais
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </NavContent>
    </NavigationContainer>
  );
}

export default Navigation;
