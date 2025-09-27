import styled from "styled-components";
import { Target, TrendingUp, Map, ArrowLeft, Users, MapPin, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoFurnas from "../../img/logoProjetoFurnas.jpg";

const FurnasContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Header = styled.header`
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  padding: 2rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const MainContent = styled.main`
  padding: 4rem 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DescriptionSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const DescriptionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

const DescriptionText = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ObjectivesSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const ObjectivesTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const ObjectivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ObjectiveCard = styled.div`
  background: #f0fdf4;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #dcfce7;
`;

const ObjectiveIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
`;

const ObjectiveTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 1rem;
`;

const ObjectiveText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const InfoSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: #f0f9ff;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #bae6fd;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
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

const InfoLabel = styled.div`
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const AccessSection = styled.section`
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
`;

const AccessTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const AccessText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const AccessButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

function FurnasPage() {
  const navigate = useNavigate();

  const objectives = [
    {
      icon: <Target size={24} />,
      title: "Determinação de Emissões",
      description: "Determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das hidrelétricas"
    },
    {
      icon: <LogoImage src={logoFurnas} alt="Furnas" style={{ width: 60, height: 60 }} />,
      title: "Ciclo do Carbono",
      description: "Identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais envolvidos"
    },
    {
      icon: <LogoImage src={logoFurnas} alt="Furnas" style={{ width: 60, height: 60 }} />,
      title: "Avaliação de Fatores",
      description: "Avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Padrão de Emissão",
      description: "Determinar o padrão de emissão existente, anteriormente à construção de reservatórios"
    },
    {
      icon: <Map size={24} />,
      title: "Modelo Espacial",
      description: "Elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados em ambientes de cerrado"
    }
  ];

  const projectInfo = [
    {
      icon: <Users size={24} />,
      label: "Participantes",
      value: "FURNAS, IIE, INPE, UFJF, UFRJ/COPPE"
    },
    {
      icon: <MapPin size={24} />,
      label: "Campanhas",
      value: "79 campanhas em reservatórios de Furnas"
    },
    {
      icon: <BookOpen size={24} />,
      label: "Interfaces",
      value: "Água-sedimento, coluna d'água e água-atmosfera"
    }
  ];

  return (
    <FurnasContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            Voltar ao Portal
          </BackButton>
          <HeaderInfo>
            <HeaderTitle>Balanço de Carbono nos Reservatórios de Furnas</HeaderTitle>
            <HeaderSubtitle>
              Projeto desenvolvido pelo INPE em cooperação com UFRJ, UFJF e IIE para determinação de emissões de gases de efeito estufa nos reservatórios das hidrelétricas de Furnas Centrais Elétricas S.A.
            </HeaderSubtitle>
          </HeaderInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        <ContentWrapper>
          <DescriptionSection>
            <DescriptionTitle>Sobre o Projeto</DescriptionTitle>
            <DescriptionText>
              Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos 
              Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas 
              in situ de equipes que tinham como objetivo obter dados para determinar as emissões de 
              gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das 
              hidrelétricas, identificar as rotas do ciclo do carbono nesses reservatórios e os 
              fatores ambientais envolvidos.
            </DescriptionText>
          </DescriptionSection>

          <ObjectivesSection>
            <ObjectivesTitle>Objetivos do Projeto</ObjectivesTitle>
            <ObjectivesGrid>
              {objectives.map((objective, index) => (
                <ObjectiveCard key={index}>
                  <ObjectiveIcon>{objective.icon}</ObjectiveIcon>
                  <ObjectiveTitle>{objective.title}</ObjectiveTitle>
                  <ObjectiveText>{objective.description}</ObjectiveText>
                </ObjectiveCard>
              ))}
            </ObjectivesGrid>
          </ObjectivesSection>

          <InfoSection>
            <InfoTitle>Informações do Projeto</InfoTitle>
            <InfoGrid>
              {projectInfo.map((info, index) => (
                <InfoCard key={index}>
                  <InfoIcon>{info.icon}</InfoIcon>
                  <InfoLabel>{info.label}</InfoLabel>
                  <InfoValue>{info.value}</InfoValue>
                </InfoCard>
              ))}
            </InfoGrid>
          </InfoSection>

          <AccessSection>
            <AccessTitle>Acesso aos Dados</AccessTitle>
            <AccessText>
              Os dados do Projeto Balanço de Carbono estão disponíveis através de nossa plataforma web, 
              permitindo consultas personalizadas, visualização em tabelas dinâmicas e mapas interativos.
            </AccessText>
            <AccessButton onClick={() => navigate("/furnas/dados")}>
              <LogoImage src={logoFurnas} alt="Furnas" style={{ width: 32, height: 32, marginRight: "0.5rem" }} />
              Acessar Dados do Projeto
            </AccessButton>
          </AccessSection>
        </ContentWrapper>
      </MainContent>
    </FurnasContainer>
  );
}

export default FurnasPage;
