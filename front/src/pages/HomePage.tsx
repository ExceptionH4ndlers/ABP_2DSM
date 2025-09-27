import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoSima from "../../img/logoSima.png";
import logoFurnas from "../../img/logoProjetoFurnas.jpg";
import logoBalcar from "../../img/logoBalcar.png";
import logoInpe from "../../img/inpe-removebg-preview.png";
import logoDsr from "../../img/images-removebg-preview.png";

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;


const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  background: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  text-align: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: #3b82f6;

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProjectIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const LogoImage = styled.img`
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  object-fit: contain;
  filter: 
    contrast(1.05) 
    brightness(1.02) 
    drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08));
  transition: all 0.3s ease;
  
  &:hover {
    filter: 
      contrast(1.08) 
      brightness(1.05) 
      drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
    transform: scale(1.02);
  }
`;

const InstitutionalSection = styled.section`
  background: white;
  padding: 3rem 2rem;
  border-top: 1px solid #e2e8f0;
`;

const InstitutionalContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const InstitutionalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const InstitutionalLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;

  ${({ theme }) => theme.media.mobile} {
    gap: 2rem;
  }
`;

const InstitutionalLogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(226, 232, 240, 0.5);

  &:hover {
    border-color: rgba(59, 130, 246, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
    transform: translateY(-2px);
  }
`;

const InstitutionalLogoImage = styled.img`
  height: 80px;
  width: auto;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  object-fit: contain;
  filter: 
    contrast(1.05) 
    brightness(1.02) 
    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.mobile} {
    height: 60px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
`;

const ProjectDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProjectLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-weight: 600;
  transition: color 0.2s ease;

  ${ProjectCard}:hover & {
    color: #1d4ed8;
  }
`;



function HomePage() {
  const navigate = useNavigate();

  const projects = [
    {
      id: "sima",
      title: "SIMA",
      description: "Sistema pioneiro de monitoramento contínuo com plataformas autônomas ancoradas. Coleta automática de 12+ parâmetros ambientais com transmissão via satélite em tempo real.",
      icon: <LogoImage src={logoSima} alt="SIMA" style={{ width: 80, height: 80 }} />,
      color: "#3b82f6"
    },
    {
      id: "furnas",
      title: "Balanço de Carbono",
      description: "79 campanhas científicas em reservatórios de Furnas para quantificar emissões de CH₄, CO₂ e N₂O. Desenvolvimento de modelo espacial para ambientes de cerrado.",
      icon: <LogoImage src={logoFurnas} alt="Furnas" style={{ width: 80, height: 80 }} />,
      color: "#22c55e"
    },
    {
      id: "balcar",
      title: "BALCAR",
      description: "Estudo das rotas do ciclo do carbono em interfaces água-sedimento, coluna d'água e água-atmosfera. Análise de fatores morfológicos e biogeoquímicos.",
      icon: <LogoImage src={logoBalcar} alt="BALCAR" style={{ width: 80, height: 80 }} />,
      color: "#06b6d4"
    }
  ];

  const handleProjectClick = (projectId: string) => {
    if (projectId === 'sima') {
      navigate('/sima');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      navigate(`/${projectId}`);
    }
  };

  return (
    <HomeContainer>

      <ProjectsSection>
        <SectionContent>
          <SectionHeader>
            <SectionTitle>Projetos Científicos</SectionTitle>
            <SectionSubtitle>
              Três projetos pioneiros desenvolvidos pelo INPE em parceria com UFRJ, UFJF, IIE e Furnas Centrais Elétricas S.A. para compreender o impacto ambiental dos reservatórios hidrelétricos no Brasil.
            </SectionSubtitle>
          </SectionHeader>

          <ProjectsGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
                <ProjectIcon>{project.icon}</ProjectIcon>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLink>
                  Acessar dados <ArrowRight size={16} />
                </ProjectLink>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </SectionContent>
      </ProjectsSection>

      <InstitutionalSection>
        <InstitutionalContent>
          <InstitutionalTitle>Desenvolvido pelo Instituto Nacional de Pesquisas Espaciais</InstitutionalTitle>
          <InstitutionalLogos>
            <InstitutionalLogoLink 
              href="https://www.gov.br/inpe/pt-br" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Site oficial do INPE"
            >
              <InstitutionalLogoImage src={logoInpe} alt="INPE - Instituto Nacional de Pesquisas Espaciais" />
            </InstitutionalLogoLink>
            <InstitutionalLogoLink 
              href="http://www.dsr.inpe.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Divisão de Sensoriamento Remoto - INPE"
            >
              <InstitutionalLogoImage src={logoDsr} alt="DSR - Divisão de Sensoriamento Remoto do INPE" />
            </InstitutionalLogoLink>
          </InstitutionalLogos>
        </InstitutionalContent>
      </InstitutionalSection>
    </HomeContainer>
  );
}

export default HomePage;
