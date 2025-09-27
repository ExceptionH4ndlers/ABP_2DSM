import styled from "styled-components";
import { Target, Clock, Satellite, Activity, Shield, MapPin, Database, Filter, Search } from "lucide-react";
import { CsvExportButton } from "../components/CsvExportButton";
import type { SimaData } from "../utils/csvParser";
import estruturaSima1 from "../../img/sima/estrutura_sima1.png";
import estruturaSima2 from "../../img/sima/estrutura_sima2.png";
import funcionamentoSima from "../../img/sima/funcionamento_sima.png";
import sondaSima from "../../img/sima/sonda_sima.png";
import simaLogo from "../../img/sima/sima_spa_logo-removebg-preview.png";

const SimaSPAContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
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
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CompactText = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: #64748b;
  line-height: 1.6;
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

const FilterButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ControlsSection = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
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

const ControlInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ControlSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
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

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
  }

  tr:hover {
    background: #f8fafc;
  }
`;

const ProblemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ProblemItem = styled.li`
  background: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 8px 8px 0;
`;

const SupportList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SupportItem = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  color: #374151;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #3b82f6;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const StructureImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 12px;
  margin-bottom: 1rem;
  object-fit: cover;
  object-position: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const FuncionamentoImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1rem;
  object-fit: contain;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  font-style: italic;
`;

const ContentWithImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
  margin-top: 2rem;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitleWithLogo = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SmallLogo = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
`;


// Dados mock para demonstração
const mockData: SimaData[] = [
  {
    idsima: 1,
    idestacao: "31966",
    datahora: "2024-01-15T10:00:00Z",
    tempar: 25.5,
    ur: 65.2
  },
  {
    idsima: 2,
    idestacao: "31966",
    datahora: "2024-01-15T11:00:00Z",
    tempar: 26.1,
    ur: 63.8
  },
  {
    idsima: 3,
    idestacao: "31966",
    datahora: "2024-01-15T12:00:00Z",
    tempar: 27.3,
    ur: 61.5
  }
];

function SimaSPAPage() {
  const features = [
    {
      icon: <Clock size={24} />,
      title: "Sistema Autônomo Fundeado",
      description: "Sistema autônomo fundeado com sensores, eletrônica de armazenamento, bateria e antena de transmissão para coleta contínua de dados."
    },
    {
      icon: <Satellite size={24} />,
      title: "Transmissão via Satélite",
      description: "Dados coletados em intervalos pré-programados são transmitidos via satélite e armazenados na estação de coleta."
    },
    {
      icon: <Activity size={24} />,
      title: "Acesso em Tempo Real",
      description: "Portal permite acesso aos dados transmitidos por satélite poucas horas após a coleta, fornecendo ferramenta poderosa para gerenciamento ambiental."
    }
  ];


  const supportInstitutions = [
    "CEPEL", "Chesf", "CNPq", "Eletronorte", "FAPESP", "Furnas Centrais Elétricas"
  ];

  return (
    <SimaSPAContainer>
      <MainContent>
        {/* Seção Sobre o SIMA */}
        <Section id="home">
          <SectionTitleWithLogo>
            <SmallLogo src={simaLogo} alt="Logo SIMA" />
          </SectionTitleWithLogo>
          <SectionSubtitle>
            Sistema Integrado de Monitoramento Ambiental
          </SectionSubtitle>

          <SectionText>
            O SIMA (Sistema Integrado de Monitoramento Ambiental) é um conjunto de hardware e software 
            desenhado para a coleta de dados e o monitoramento em tempo real de processos da hidrosfera. 
            Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado, onde são instalados 
            sensores, eletrônica de armazenamento, bateria e antena de transmissão.
          </SectionText>

          <SectionText>
            Os dados coletados em intervalo de tempo pré-programado são transmitidos via satélite e 
            também armazenados na estação de coleta, sendo que os dados armazenados são aqueles obtidos 
            com maior frequência. Este portal permite o acesso aos dados transmitidos por satélite 
            poucas horas após a coleta. A associação destas componentes fornece uma poderosa ferramenta 
            que pode ser empregada no gerenciamento e controle ambiental de recursos hídricos.
          </SectionText>
        </Section>

        {/* Seção Motivação */}
        <Section>
          <SectionTitle>
            <Activity size={40} />
            Motivação do SIMA
          </SectionTitle>
          
          <ProblemsList>
            <ProblemItem>
              Sistemas aquáticos são muito dinâmicos e podem sofrer mudanças significativas em questão de horas.
            </ProblemItem>
            <ProblemItem>
              A logística necessária para amostrar adequadamente os sistemas aquáticos em estudo é complexa e cara.
            </ProblemItem>
            <ProblemItem>
              Há necessidade de dados em tempo real para a tomada de decisões.
            </ProblemItem>
          </ProblemsList>
        </Section>

        {/* Seção Estrutura do SIMA */}
        <Section>
          <SectionTitle>
            <Shield size={40} />
            Estrutura do SIMA
          </SectionTitle>
          <SectionText>
            O SIMA é formado por uma plataforma que em alguns modelos pode ser uma bóia toroidal 
            (foto abaixo e à esquerda) ou uma estrutura maior (foto abaixo e à direita). No centro 
            da plataforma existe uma torre onde são afixados os painéis solares, sensores meteorológicos 
            e antena. No vão central um compartimento abriga a eletrônica do sistema, baterias e 
            transmissor de satélite. Os sensores submersos são conectados à eletrônica por cabos.
          </SectionText>
          
          <ImagesContainer>
            <ImageWrapper>
              <StructureImage src={estruturaSima1} alt="Estrutura SIMA - Bóia Toroidal" />
              <ImageCaption>Bóia Toroidal</ImageCaption>
            </ImageWrapper>
            <ImageWrapper>
              <StructureImage src={estruturaSima2} alt="Estrutura SIMA - Estrutura Maior" />
              <ImageCaption>Estrutura Maior</ImageCaption>
            </ImageWrapper>
          </ImagesContainer>
        </Section>

        {/* Seção Modo de Funcionamento */}
        <Section>
          <SectionTitle>
            <Clock size={40} />
            Modo de Funcionamento
          </SectionTitle>
          
          <SectionText>
            <strong>Coleta e transmissão dos dados:</strong> circuitos analógicas e digitais são responsáveis por comandar o conjunto de sensores, variáveis de engenharia e ativar o transmissor de satélite.
          </SectionText>
          
          <SectionText>
            <strong>Amostragem:</strong> a cada hora cheia um novo conjunto completo de dados é armazenado em um buffer de memória. Após enchimento dos oito buffers, o conjunto mais antigo é descartado.
          </SectionText>
          
          <SectionText>
            <strong>Esquema de transmissão:</strong> a cada 90 segundos, um dos oito buffers é transmitido em esquema de carrossel. A transmissão é executada independente de existir satélite para receber os dados.
          </SectionText>
          
          <SectionText>
            <strong>Recepção dos dados:</strong> as unidades do INPE de Cuiabá - MT e Alcântara - MA recebem os dados dos satélites e em seguida transmitem para a unidade de Natal - RN, onde os dados são processados para filtrar falhas na transmissão e para posterior envio para a DSR (Divisão de Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde os dados são decodificados, processados e armazenados.
          </SectionText>
          
          <SectionText>
            <strong>Distribuição dos dados:</strong> este portal é usado para a consulta e visualização dos dados armazenados.
          </SectionText>
          
          <SectionText>
            <strong>Armazenamento interno:</strong> alguns SIMAs possuem a capacidade de armazenar as coletas para posterior download por um técnico in situ, ou seja, estes dados não são transmitidos por satélite. Neste caso as coletas são realizadas a cada 10 minutos.
          </SectionText>
          
          <ImageWrapper style={{ marginTop: '2rem' }}>
            <FuncionamentoImage src={funcionamentoSima} alt="Modo de Funcionamento do SIMA" />
            <ImageCaption>Diagrama do Modo de Funcionamento</ImageCaption>
          </ImageWrapper>
        </Section>

        {/* Seção Dados Coletados */}
        <Section>
          <SectionTitle>
            <Database size={40} />
            Dados Coletados
          </SectionTitle>
          <SectionText>
            O SIMA coleta algumas variáveis ambientais a partir de sensores colocados acima da linha d'água 
            (temperatura do ar, pressão atmosférica, direção e intensidade de ventos, radiação solar incidente 
            e refletida) e abaixo da linha d'água (amônia, nitrato, clorofila, condutividade, direção e 
            intensidade da corrente, oxigênio dissolvido, pH e temperatura em diferentes profundidades).
          </SectionText>
        </Section>

        {/* Seção História */}
        <Section>
          <SectionTitle>
            <Clock size={40} />
            História
          </SectionTitle>
          <SectionText>
            O SIMA foi desenvolvido em uma parceria entre a Universidade do Vale do Paraíba e o INPE. 
            A partir de 1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através de uma 
            parceria com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um protótipo do SIMA, 
            que ficou fundeado em águas do litoral do Rio de Janeiro durante um ano e os dados coletados 
            foram disponibilizados pelo Programa Nacional de Bóia.
          </SectionText>
          <SectionText>
            Os dados coletados neste período foram comparados com dados in situ, o que confirmou o bom 
            desempenho do sistema.
          </SectionText>
        </Section>

        {/* Seção Problemas */}
        <Section>
          <SectionTitle>
            <Shield size={40} />
            Problemas Observados
          </SectionTitle>
          
          <SectionText>
            <strong>Sensores:</strong> Por características específicas de alguns ambientes aquáticos, 
            os sensores podem se degradar rapidamente, tornando os dados inválidos. Veja como exemplo 
            a foto abaixo tirada da sonda do SIMA fundeado no reservatório de Funil, no momento de 
            uma atividade de calibração.
          </SectionText>
          
          <SectionText>
            <strong>Satélite:</strong> O SIMA faz uma leitura de parâmetros a cada hora, ou seja, 
            24 leituras por dia. Acontece que nem sempre são recebidas todas as leituras, pois o 
            sistema necessita de satélites para completar a transmissão e por questão de posicionamento 
            da constelação de satélites, algumas localidades terrestres não são atendidas com a 
            frequência necessária para completar todas as transmissões.
          </SectionText>
          
           <ImageWrapper style={{ marginTop: '2rem' }}>
             <FuncionamentoImage src={sondaSima} alt="Sonda SIMA no Reservatório de Funil" />
             <ImageCaption>Sonda SIMA no Reservatório de Funil durante calibração</ImageCaption>
           </ImageWrapper>
        </Section>

        {/* Seção Apoio */}
        <Section>
          <SectionTitle>
            <Target size={40} />
            Apoio Institucional
          </SectionTitle>
          <SectionText>
            Ao longo da existência deste sistema, os fundos para a compra e manutenção dos 
            sistemas de coleta e recursos computacionais foram fornecidos pelas seguintes 
            instituições:
          </SectionText>
          <SupportList>
            <SupportItem>
              <a href="https://www.cepel.br/" target="_blank" rel="noopener noreferrer">
                CEPEL
              </a>
            </SupportItem>
            <SupportItem>Chesf</SupportItem>
            <SupportItem>
              <a href="https://www.gov.br/cnpq/pt-br" target="_blank" rel="noopener noreferrer">
                CNPq
              </a>
            </SupportItem>
            <SupportItem>Eletronorte</SupportItem>
            <SupportItem>
              <a href="https://fapesp.br/" target="_blank" rel="noopener noreferrer">
                FAPESP
              </a>
            </SupportItem>
            <SupportItem>
              <a href="https://www.furnas.com.br/" target="_blank" rel="noopener noreferrer">
                Furnas Centrais Elétricas
              </a>
            </SupportItem>
          </SupportList>
        </Section>

        {/* Seção Mapa */}
        <Section id="mapa">
          <SectionTitle>
            <MapPin size={40} />
            Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>
            Visualize a localização das estações SIMA e dados coletados em tempo real
          </SectionSubtitle>

          <MapPlaceholder>
            <MapPin size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>Mapa Interativo</h3>
            <p>Esta seção será implementada com um mapa interativo mostrando:</p>
            <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '1rem auto' }}>
              <li>Localização das estações SIMA</li>
              <li>Dados em tempo real</li>
              <li>Filtros por período e parâmetros</li>
              <li>Visualização de séries temporais</li>
            </ul>
          </MapPlaceholder>
          
          <FilterButton>
            <Filter size={20} />
            Configurar Filtros
          </FilterButton>
        </Section>

        {/* Seção Tabelas */}
        <Section id="dados">
          <SectionTitle>
            <Database size={40} />
            Banco de Dados
          </SectionTitle>
          <SectionSubtitle>
            Consulte e visualize os dados coletados pelo SIMA em formato de tabelas
          </SectionSubtitle>

          <ControlsSection>
            <ControlsGrid>
              <ControlGroup>
                <ControlLabel>Data Início</ControlLabel>
                <ControlInput type="date" />
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Data Fim</ControlLabel>
                <ControlInput type="date" />
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Estação</ControlLabel>
                <ControlSelect>
                  <option value="">Todas as estações</option>
                  <option value="31966">Estação 31966</option>
                  <option value="31967">Estação 31967</option>
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Parâmetro</ControlLabel>
                <ControlSelect>
                  <option value="">Todos os parâmetros</option>
                  <option value="tempar">Temperatura do Ar</option>
                  <option value="ur">Umidade Relativa</option>
                </ControlSelect>
              </ControlGroup>
            </ControlsGrid>
            
            <ActionButtons>
              <ActionButton>
                <Search size={20} />
                Buscar Dados
              </ActionButton>
              <SecondaryButton>
                <Filter size={20} />
                Limpar Filtros
              </SecondaryButton>
              <CsvExportButton 
                data={mockData}
                filename="dados_sima.csv"
              />
            </ActionButtons>
          </ControlsSection>

          <TableContainer>
            <StyledTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estação</th>
                  <th>Data/Hora</th>
                  <th>Temperatura Ar (°C)</th>
                  <th>Umidade Relativa (%)</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item) => (
                  <tr key={item.idsima}>
                    <td>{item.idsima}</td>
                    <td>{item.idestacao}</td>
                    <td>{new Date(item.datahora).toLocaleString('pt-BR')}</td>
                    <td>{item.tempar?.toFixed(1) || "-"}</td>
                    <td>{item.ur?.toFixed(1) || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
        </Section>
      </MainContent>
    </SimaSPAContainer>
  );
}

export default SimaSPAPage;
