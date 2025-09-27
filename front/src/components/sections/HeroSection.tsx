import styled from "styled-components";
import { ArrowDown } from "lucide-react";

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M0,50 Q25,25 50,50 T100,50" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/></pattern></defs><rect width="100%" height="100%" fill="url(%23waves)"/></svg>');
    opacity: 0.3;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
    min-height: 80vh;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.1;

  ${({ theme }) => theme.media.tablet} {
    font-size: 3rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;


const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: bounce 2s infinite;
  cursor: pointer;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  ${({ theme }) => theme.media.mobile} {
    bottom: 1rem;
  }
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("sima");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroContainer id="home">
      <HeroContent>
        <HeroTitle>Portal de Dados Limnológicos</HeroTitle>
        <HeroSubtitle>
          Acesso integrado aos dados de monitoramento ambiental dos reservatórios de Furnas Centrais Elétricas S.A. através dos projetos SIMA, Balanço de Carbono e BALCAR
        </HeroSubtitle>

      </HeroContent>

      <ScrollIndicator onClick={scrollToNext}>
        <ScrollText>Explore os dados</ScrollText>
        <ArrowDown size={20} />
      </ScrollIndicator>
    </HeroContainer>
  );
}

export default HeroSection;
