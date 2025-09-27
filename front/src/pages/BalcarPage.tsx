import styled from "styled-components";
import { ArrowLeft, Activity, Thermometer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoBalcar from "../../img/logoBalcar.png";

const BalcarContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Header = styled.header`
  background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
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

const FocusAreasSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const FocusAreasTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const FocusAreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FocusAreaCard = styled.div`
  background: #f0fdfa;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #ccfbf1;
`;

const FocusAreaIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
`;

const FocusAreaTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f766e;
  margin-bottom: 1rem;
`;

const FocusAreaText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const ParametersSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const ParametersTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const ParametersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ParameterCard = styled.div`
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #bae6fd;
`;

const ParameterIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const ParameterName = styled.div`
  font-weight: 600;
  color: #0891b2;
  margin-bottom: 0.5rem;
`;

const ParameterValue = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const AccessSection = styled.section`
  background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
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

const LogoImage = styled.img`
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  object-fit: contain;
  filter: contrast(1.05) brightness(1.02) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08));
  transition: all 0.3s ease;

  &:hover {
    filter: contrast(1.08) brightness(1.05) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
    transform: scale(1.02);
  }
`;

function BalcarPage() {
  const navigate = useNavigate();

  const focusAreas = [
    {
      icon: <LogoImage src={logoBalcar} alt="BALCAR" style={{ width: 60, height: 60 }} />,
      title: "Interface Água-Sedimento",
      description:
        "Monitoramento dos processos de troca entre a coluna d'água e os sedimentos do fundo, incluindo fluxos de gases e concentrações de carbono e nutrientes.",
    },
    {
      icon: <LogoImage src={logoBalcar} alt="BALCAR" style={{ width: 60, height: 60 }} />,
      title: "Coluna d'Água",
      description:
        "Análise vertical dos parâmetros físicos, químicos e biológicos da água, incluindo produção primária, metabolismo bacteriano e concentrações de nutrientes.",
    },
    {
      icon: <Activity size={24} />,
      title: "Interface Água-Atmosfera",
      description:
        "Estimativa de fluxos de gases de efeito estufa na interface água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.",
    },
  ];

  const parameters = [
    { name: "CH₄ (Metano)", value: "mg/m²/h" },
    { name: "CO₂ (Dióxido de Carbono)", value: "mg/m²/h" },
    { name: "N₂O (Óxido Nitroso)", value: "mg/m²/h" },
    { name: "Temperatura da Água", value: "°C" },
    { name: "Temperatura do Ar", value: "°C" },
    { name: "pH", value: "unidade" },
    { name: "Profundidade", value: "m" },
    { name: "Altitude", value: "m" },
    { name: "Velocidade do Vento", value: "m/s" },
    { name: "Produção Primária", value: "mg C/m³/h" },
    { name: "Metabolismo Bacteriano", value: "mg C/m³/h" },
    { name: "Taxa de Sedimentação", value: "mg C/m²/dia" },
  ];

  return (
    <BalcarContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            Voltar ao Portal
          </BackButton>
          <HeaderInfo>
            <HeaderTitle>Projeto BALCAR</HeaderTitle>
            <HeaderSubtitle>
              Emissões de Gases de Efeito Estufa em Reservatórios de Centrais Hidrelétricas -
              Projeto desenvolvido pelo INPE
            </HeaderSubtitle>
          </HeaderInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        <ContentWrapper>
          <DescriptionSection>
            <DescriptionTitle>Sobre o Projeto BALCAR</DescriptionTitle>
            <DescriptionText>
              O Projeto BALCAR (Emissões de Gases de Efeito Estufa em Reservatórios de Centrais
              Hidrelétricas) é desenvolvido pelo INPE e concentra-se na coleta de dados limnológicos
              e meteorológicos para subsidiar estudos sobre o balanço de carbono nos reservatórios
              de Furnas. Os dados coletados incluem parâmetros na interface água-sedimento, coluna
              d'água e interface água-atmosfera, com o objetivo de determinar as emissões de GEE e
              entender os processos envolvidos no ciclo do carbono nesses ambientes.
            </DescriptionText>
          </DescriptionSection>

          <FocusAreasSection>
            <FocusAreasTitle>Áreas de Foco</FocusAreasTitle>
            <FocusAreasGrid>
              {focusAreas.map((area, index) => (
                <FocusAreaCard key={index}>
                  <FocusAreaIcon>{area.icon}</FocusAreaIcon>
                  <FocusAreaTitle>{area.title}</FocusAreaTitle>
                  <FocusAreaText>{area.description}</FocusAreaText>
                </FocusAreaCard>
              ))}
            </FocusAreasGrid>
          </FocusAreasSection>

          <ParametersSection>
            <ParametersTitle>Parâmetros Monitorados</ParametersTitle>
            <DescriptionText>
              O projeto BALCAR monitora diversos parâmetros ambientais relacionados às emissões de
              gases de efeito estufa e aos processos do ciclo do carbono em reservatórios
              hidrelétricos.
            </DescriptionText>

            <ParametersGrid>
              {parameters.map((param, index) => (
                <ParameterCard key={index}>
                  <ParameterIcon>
                    <Thermometer size={20} />
                  </ParameterIcon>
                  <ParameterName>{param.name}</ParameterName>
                  <ParameterValue>{param.value}</ParameterValue>
                </ParameterCard>
              ))}
            </ParametersGrid>
          </ParametersSection>

          <AccessSection>
            <AccessTitle>Acesso aos Dados</AccessTitle>
            <AccessText>
              Os dados do Projeto BALCAR estão disponíveis através de nossa plataforma web,
              permitindo consultas personalizadas, visualização em gráficos e exportação em CSV.
            </AccessText>
            <AccessButton onClick={() => navigate("/balcar/dados")}>
              <LogoImage
                src={logoBalcar}
                alt="BALCAR"
                style={{ width: 32, height: 32, marginRight: "0.5rem" }}
              />
              Acessar Dados do BALCAR
            </AccessButton>
          </AccessSection>
        </ContentWrapper>
      </MainContent>
    </BalcarContainer>
  );
}

export default BalcarPage;
