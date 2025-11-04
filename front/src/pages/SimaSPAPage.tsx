import { useState } from "react";
import styled from "styled-components";
import {
  Target,
  Clock,
  Activity,
  Shield,
  MapPin,
  Database,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Waves,
  Zap,
  Gauge,
  Eye,
  Droplet,
  TestTube,
  Navigation,
  Battery,
  CloudRain,
  AlertCircle,
  Users,
} from "lucide-react";
import { useSimaApi } from "../hooks/useSimaApi";
import { useEstacoes } from "../hooks/useEstacoes";
import { useMapData } from "../hooks/useMapData";
import { ExportCsvButton } from "../components/ExportCsvButton";
import { CsvExportModal } from "../components/CsvExportModal";
import InteractiveMap from "../components/InteractiveMap";
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
  overflow-x: visible;
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

// Shared team layout (matching BALCAR)
const GroupTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 1rem 0 0.75rem 0;
`;

const TeamGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const TeamGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem 1rem;
`;

const PersonItem = styled.li`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
`;

const PersonName = styled.span`
  color: #111827;
  font-weight: 600;
`;

const NameLink = styled.a`
  color: #111827;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PersonMeta = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const InstitutionTag = styled.span`
  font-weight: 600;
  color: #374151;
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
    border-color: #3b82f6;
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
    border-color: #3b82f6;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
`;

const ActionButton = styled.button`
  background: #6b7280;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  flex: 1;
  min-width: 150px;

  &:hover {
    background: #4b5563;
    border-color: #6b7280;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchButton = styled(ActionButton)`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
  color: #ffffff;

  &:hover {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  }
`;

const ClearButton = styled(ActionButton)`
  background: white;
  border-color: #9ca3af;
  color: #374151;

  &:hover {
    background: #f9fafb;
    border-color: #6b7280;
  }
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

  /* Colunas fixas com fundo branco */
  th:nth-child(1),
  td:nth-child(1) {
    position: sticky;
    background: white;
    z-index: 5;
    border-right: 1px solid #e5e7eb;
  }

  th:nth-child(2),
  td:nth-child(2) {
    position: sticky;
    background: white;
    z-index: 5;
    border-right: 1px solid #e5e7eb;
  }

  th:nth-child(3),
  td:nth-child(3) {
    position: sticky;
    background: white;
    z-index: 5;
    border-right: 1px solid #e5e7eb;
  }

  th:nth-child(1),
  th:nth-child(2),
  th:nth-child(3) {
    font-weight: 600;
  }

  /* Removidas cores por categoria; manter apenas zebra/hover */
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
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

const PaginationInfo = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const SectionTitleWithLogo = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

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

// Função auxiliar para formatar valores
const formatValue = (value: number | null | undefined, decimals: number = 1) => {
  if (value === null || value === undefined) return "-";
  return value.toFixed(decimals);
};

function SimaSPAPage() {
  const { data, loading, error, pagination, fetchData } = useSimaApi();
  const { estacoes } = useEstacoes();

  // Hook para dados do mapa - apenas SIMA
  const {
    mapPoints,
    loading: mapLoading,
    error: mapError,
  } = useMapData({
    showSima: true,
    showFurnas: false,
    showBalcar: false,
  });

  const [mapFilters, setMapFilters] = useState({
    showSima: true,
    showFurnas: false,
    showBalcar: false,
  });

  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "2004-01-12", // Menor data disponível no banco SIMA
    endDate: "2016-12-03", // Maior data disponível no banco SIMA
    limit: 10,
    estacao: "", // Filtro por estação
    sortOrder: "desc", // Ordenação: "asc" (mais antigo → mais recente) ou "desc" (mais recente → mais antigo)
  });

  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  // Estado para publicações
  // filtros de publicações não são usados nesta página
  // desativado nesta página
  // const [publicationFilters, setPublicationFilters] = useState({ searchTerm: "", selectedCategories: [] as string[] });

  // Filtrar publicações
  // filtros de publicações movidos para página dedicada

  // Função para alternar categoria
  // const toggleCategory = (_category: string) => undefined;

  // Função para limpar filtros
  // const clearPublicationFilters = () => undefined;

  // Função para buscar datas específicas de uma estação
  const updateDatesForStation = async (estacao: string) => {
    // Atualizar a estação primeiro
    setFilters((prev) => ({
      ...prev,
      estacao: estacao,
    }));

    // Se for "todas as estações", usar as datas gerais
    if (!estacao) {
      setFilters((prev) => ({
        ...prev,
        startDate: "2004-01-12", // Data mais antiga geral
        endDate: "2016-12-03", // Data mais recente geral
        estacao: estacao,
      }));
      return;
    }

    try {
      // Buscar dados da estação específica para obter as datas
      const response = await fetch(
        `http://localhost:3001/sima/all?page=1&limit=1000&startDate=2004-01-01&endDate=2017-12-31&estacao=${estacao}`,
      );

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          // Encontrar a data mais antiga e mais recente
          const dates = result.data.map((item: { datahora: string }) => new Date(item.datahora));
          const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())));
          const maxDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())));

          // Atualizar os filtros com as novas datas
          setFilters((prev) => ({
            ...prev,
            startDate: minDate.toISOString().split("T")[0],
            endDate: maxDate.toISOString().split("T")[0],
          }));
        }
      }
    } catch (error) {
      console.error("Erro ao buscar datas da estação:", error);
    }
  };

  // Carregamento manual apenas quando clicar em "Buscar Dados"

  const handleSearch = () => {
    fetchData({
      page: 1,
      limit: filters.limit,
      startDate: filters.startDate,
      endDate: filters.endDate,
      estacao: filters.estacao || undefined,
      sortOrder: filters.sortOrder,
    });
  };

  const handlePageChange = (newPage: number) => {
    fetchData({
      page: newPage,
      limit: filters.limit,
      startDate: filters.startDate,
      endDate: filters.endDate,
      estacao: filters.estacao || undefined,
      sortOrder: filters.sortOrder,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: "2004-01-12", // Menor data disponível no banco SIMA
      endDate: "2016-12-03", // Maior data disponível no banco SIMA
      limit: 10,
      estacao: "",
      sortOrder: "desc",
    });
  };

        <ClearButton onClick={handleClearFilters}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    style={{ width: '20px', height: '20px', marginRight: '8px' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9m-9 6h9m-9 6h9M4.5 6h.008v.008H4.5V6zm0 6h.008v.008H4.5V12zm0 6h.008v.008H4.5V18z"
    />
  </svg>
  Limpar Filtros
</ClearButton>

  const handleExportCsv = () => {
    setIsCsvModalOpen(true);
  };

  // Lista de estações disponíveis no banco SIMA (agora dinâmica)
  const estacoesOptions = [
    { value: "", label: "Todas as estações" },
    ...estacoes.map((estacao) => ({
      value: estacao.idestacao,
      label: estacao.rotulo,
    })),
  ];
  return (
    <SimaSPAContainer>
      <MainContent>
        {/* Seção Sobre o SIMA */}
        <Section id="home">
          <SectionTitleWithLogo>
            <SmallLogo src={simaLogo} alt="Logo SIMA" />
          </SectionTitleWithLogo>
          <SectionSubtitle style={{ textAlign: "center" }}>
            Sistema Integrado de Monitoramento Ambiental
          </SectionSubtitle>

          <SectionText>
            O SIMA (Sistema Integrado de Monitoramento Ambiental) é um conjunto de hardware e
            software desenhado para a coleta de dados e o monitoramento em tempo real de processos
            da hidrosfera. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado,
            onde são instalados sensores, eletrônica de armazenamento, bateria e antena de
            transmissão.
          </SectionText>

          <SectionText>
            Os dados coletados em intervalo de tempo pré-programado são transmitidos via satélite e
            também armazenados na estação de coleta, sendo que os dados armazenados são aqueles
            obtidos com maior frequência. Este portal permite o acesso aos dados transmitidos por
            satélite poucas horas após a coleta. A associação destas componentes fornece uma
            poderosa ferramenta que pode ser empregada no gerenciamento e controle ambiental de
            recursos hídricos.
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
              Sistemas aquáticos são muito dinâmicos e podem sofrer mudanças significativas em
              questão de horas.
            </ProblemItem>
            <ProblemItem>
              A logística necessária para amostrar adequadamente os sistemas aquáticos em estudo é
              complexa e cara.
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
            da plataforma existe uma torre onde são afixados os painéis solares, sensores
            meteorológicos e antena. No vão central um compartimento abriga a eletrônica do sistema,
            baterias e transmissor de satélite. Os sensores submersos são conectados à eletrônica
            por cabos.
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
            <strong>Coleta e transmissão dos dados:</strong> circuitos analógicas e digitais são
            responsáveis por comandar o conjunto de sensores, variáveis de engenharia e ativar o
            transmissor de satélite.
          </SectionText>

          <SectionText>
            <strong>Amostragem:</strong> a cada hora cheia um novo conjunto completo de dados é
            armazenado em um buffer de memória. Após enchimento dos oito buffers, o conjunto mais
            antigo é descartado.
          </SectionText>

          <SectionText>
            <strong>Esquema de transmissão:</strong> a cada 90 segundos, um dos oito buffers é
            transmitido em esquema de carrossel. A transmissão é executada independente de existir
            satélite para receber os dados.
          </SectionText>

          <SectionText>
            <strong>Recepção dos dados:</strong> as unidades do INPE de Cuiabá - MT e Alcântara - MA
            recebem os dados dos satélites e em seguida transmitem para a unidade de Natal - RN,
            onde os dados são processados para filtrar falhas na transmissão e para posterior envio
            para a DSR (Divisão de Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde
            os dados são decodificados, processados e armazenados.
          </SectionText>

          <SectionText>
            <strong>Distribuição dos dados:</strong> este portal é usado para a consulta e
            visualização dos dados armazenados.
          </SectionText>

          <SectionText>
            <strong>Armazenamento interno:</strong> alguns SIMAs possuem a capacidade de armazenar
            as coletas para posterior download por um técnico in situ, ou seja, estes dados não são
            transmitidos por satélite. Neste caso as coletas são realizadas a cada 10 minutos.
          </SectionText>

          <ImageWrapper style={{ marginTop: "2rem" }}>
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
            O SIMA coleta algumas variáveis ambientais a partir de sensores colocados acima da linha
            d'água (temperatura do ar, pressão atmosférica, direção e intensidade de ventos,
            radiação solar incidente e refletida) e abaixo da linha d'água (amônia, nitrato,
            clorofila, condutividade, direção e intensidade da corrente, oxigênio dissolvido, pH e
            temperatura em diferentes profundidades).
          </SectionText>
        </Section>

        {/* Seção História */}
        <Section>
          <SectionTitle>
            <Clock size={40} />
            História
          </SectionTitle>
          <SectionText>
            O SIMA foi desenvolvido em uma parceria entre a Universidade do Vale do Paraíba e o
            INPE. A partir de 1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através
            de uma parceria com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um
            protótipo do SIMA, que ficou fundeado em águas do litoral do Rio de Janeiro durante um
            ano e os dados coletados foram disponibilizados pelo Programa Nacional de Bóia.
          </SectionText>
          <SectionText>
            Os dados coletados neste período foram comparados com dados in situ, o que confirmou o
            bom desempenho do sistema.
          </SectionText>
        </Section>

        {/* Seção Problemas */}
        <Section>
          <SectionTitle>
            <Shield size={40} />
            Problemas Observados
          </SectionTitle>

          <SectionText>
            <strong>Sensores:</strong> Por características específicas de alguns ambientes
            aquáticos, os sensores podem se degradar rapidamente, tornando os dados inválidos. Veja
            como exemplo a foto abaixo tirada da sonda do SIMA fundeado no reservatório de Funil, no
            momento de uma atividade de calibração.
          </SectionText>

          <SectionText>
            <strong>Satélite:</strong> O SIMA faz uma leitura de parâmetros a cada hora, ou seja, 24
            leituras por dia. Acontece que nem sempre são recebidas todas as leituras, pois o
            sistema necessita de satélites para completar a transmissão e por questão de
            posicionamento da constelação de satélites, algumas localidades terrestres não são
            atendidas com a frequência necessária para completar todas as transmissões.
          </SectionText>

          <ImageWrapper style={{ marginTop: "2rem" }}>
            <FuncionamentoImage src={sondaSima} alt="Sonda SIMA no Reservatório de Funil" />
            <ImageCaption>Sonda SIMA no Reservatório de Funil durante calibração</ImageCaption>
          </ImageWrapper>
        </Section>

        {/* Seção Equipe (layout igual ao BALCAR) */}
        <Section id="equipe">
          <SectionTitle>
            <Users size={40} />
            Equipe
          </SectionTitle>

          <TeamGroup>
            <GroupTitle>Coordenação</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/2691497637313274"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  José Luiz Stech
                </NameLink>
                <PersonMeta>
                  Coordenação • <InstitutionTag>INPE</InstitutionTag> • stech@dsr.inpe.br
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7939379291404418"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enner Herenio de Alcântara
                </NameLink>
                <PersonMeta>Coordenação</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Colaboradores</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/5535667070825818"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  André Carlos Prates Cimbleris
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/8150880476098677"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arcilan Trevenzoli Assireu
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7642043789034070"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Artur Luiz da Costa da Silva
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7466500214796269"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Augusto Cesar Fonseca Saraiva
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/1596449770636962"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cláudio Clemente Faria Barbosa
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/4775535537651746"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donato Seiji Abe
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/9857505876280820"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Evlyn Márcia Leão de Moraes Novo
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/0567809153346429"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fábio Roland
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/3852581196429739"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  João Antônio Lorenzzetti
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/0030922264947314"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jorge Machado Damazio
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/4155308755013168"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Marco Aurélio dos Santos
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/8471974730664804"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maria Elvira Piñeiro Maceira
                </NameLink>
                <PersonMeta>Colaboradora</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/5149356080083086"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nelson Luís da Costa Dias
                </NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Desenvolvimento do Sistema de Coleta de Dados</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>Neuron Eletrônica</PersonName>
                <PersonMeta>Desenvolvimento</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Manutenção do Sistema de Coleta de Dados</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>Alexandre Donizetti da Silva</PersonName>
                <PersonMeta>Neuron Eletrônica</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/4915211809920432"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Carlos Alberto Sampaio de Araújo
                </NameLink>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
              <PersonItem>
                <PersonName>Geraldo Orlando Mendes</PersonName>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7596795539833144"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Joaquim Antônio Dionísio Leão
                </NameLink>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/6286335301335965"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vitor Bruno
                </NameLink>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Gerente de Rede do Portal</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>João Benedito Diehl</PersonName>
                <PersonMeta>Gerente de Rede</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>
        </Section>

        {/* Publicações movidas para página dedicada /sima/publicacoes */}

        {/* Seção Apoio */}
        <Section id="apoio">
          <SectionTitle>
            <Target size={40} />
            Apoio Institucional
          </SectionTitle>
          <SectionText>
            Ao longo da existência deste sistema, os fundos para a compra e manutenção dos sistemas
            de coleta e recursos computacionais foram fornecidos pelas seguintes instituições:
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

        {/* Seção Mapa - agora antes do Banco de Dados */}
        <Section id="mapa">
          <SectionTitle>
            <MapPin size={40} />
            Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>
            Visualize a localização das estações SIMA e dados coletados em tempo real
          </SectionSubtitle>

          <InteractiveMap
            points={mapPoints}
            loading={mapLoading}
            error={mapError}
            filters={mapFilters}
            onFiltersChange={setMapFilters}
            filtersOpen={filtersPanelOpen}
            onFiltersOpenChange={setFiltersPanelOpen}
            onMarkerClick={(point) => {
              console.log("Marker clicked:", point);
              // Aqui você pode adicionar lógica para mostrar detalhes da estação
            }}
          />

          <FilterButton onClick={() => setFiltersPanelOpen(true)}>
            <Filter size={20} />
            Configurar Filtros
          </FilterButton>
        </Section>

        {/* Seção Banco de Dados - Mesmo modelo do mapa */}
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
                <ControlLabel>Estação</ControlLabel>
                <ControlSelect
                  value={filters.estacao}
                  onChange={(e) => updateDatesForStation(e.target.value)}
                >
                  {estacoesOptions.map((estacao) => (
                    <option key={estacao.value} value={estacao.value}>
                      {estacao.label}
                    </option>
                  ))}
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
              <ExportCsvButton
                data={data}
                filename="dados_sima.csv"
                onClick={handleExportCsv}
                disabled={loading}
              />
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
              Carregando dados...
            </LoadingContainer>
          ) : (
            <>
              <TableContainer>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>
                        <Database size={18} /> ID
                      </th>
                      <th>
                        <MapPin size={18} /> Estação
                      </th>
                      <th>
                        <Clock size={18} /> Data/Hora
                      </th>
                      <th>
                        <Activity size={18} /> Reg. No
                      </th>
                      <th>
                        <TestTube size={18} /> Amostras
                      </th>
                      <th>
                        <Navigation size={18} /> Proa Mag
                      </th>
                      <th>
                        <Wind size={18} /> Vento Dir. (°)
                      </th>
                      <th>
                        <Wind size={18} /> Vento Vel. (m/s)
                      </th>
                      <th>
                        <Wind size={18} /> Vento U (m/s)
                      </th>
                      <th>
                        <Wind size={18} /> Vento V (m/s)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 1 (°C)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 2 (°C)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 3 (°C)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 4 (°C)
                      </th>
                      <th>
                        <Thermometer size={18} /> Temp. Ar (°C)
                      </th>
                      <th>
                        <Droplets size={18} /> Umidade (%)
                      </th>
                      <th>
                        <Thermometer size={18} /> Temp. Ar Rotronic (°C)
                      </th>
                      <th>
                        <Gauge size={18} /> Pressão (hPa)
                      </th>
                      <th>
                        <Sun size={18} /> Rad. Solar Inc. (W/m²)
                      </th>
                      <th>
                        <Sun size={18} /> Rad. Solar Ref. (W/m²)
                      </th>
                      <th>
                        <Battery size={18} /> Bateria Painel (V)
                      </th>
                      <th>
                        <Thermometer size={18} /> Sonda Temp. (°C)
                      </th>
                      <th>
                        <Zap size={18} /> Condutividade (μS/cm)
                      </th>
                      <th>
                        <Eye size={18} /> O₂ Saturação (%)
                      </th>
                      <th>
                        <Droplet size={18} /> Oxigênio (mg/L)
                      </th>
                      <th>
                        <TestTube size={18} /> pH
                      </th>
                      <th>
                        <TestTube size={18} /> Amonia (mg/L)
                      </th>
                      <th>
                        <TestTube size={18} /> Nitrato (mg/L)
                      </th>
                      <th>
                        <Eye size={18} /> Turbidez (NTU)
                      </th>
                      <th>
                        <Droplet size={18} /> Clorofila (μg/L)
                      </th>
                      <th>
                        <Battery size={18} /> Sonda Bateria (V)
                      </th>
                      <th>
                        <Navigation size={18} /> Corrente Norte (m/s)
                      </th>
                      <th>
                        <Navigation size={18} /> Corrente Leste (m/s)
                      </th>
                      <th>
                        <AlertCircle size={18} /> CO₂ Baixo (ppm)
                      </th>
                      <th>
                        <AlertCircle size={18} /> CO₂ Alto (ppm)
                      </th>
                      <th>
                        <CloudRain size={18} /> Precipitação (mm)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.idsima}>
                        <td>
                          <strong>{item.idsima}</strong>
                        </td>
                        <td>
                          <strong>{item.nome_estacao || item.idestacao}</strong>
                        </td>
                        <td>
                          <strong>{new Date(item.datahora).toLocaleString("pt-BR")}</strong>
                        </td>
                        <td>{item.regno || "-"}</td>
                        <td>{item.nofsamples || "-"}</td>
                        <td>{formatValue(item.proamag, 2)}</td>
                        <td>{formatValue(item.dirvt, 1)}</td>
                        <td>{formatValue(item.intensvt, 1)}</td>
                        <td>{formatValue(item.u_vel, 2)}</td>
                        <td>{formatValue(item.v_vel, 2)}</td>
                        <td>{formatValue(item.tempag1, 1)}</td>
                        <td>{formatValue(item.tempag2, 1)}</td>
                        <td>{formatValue(item.tempag3, 1)}</td>
                        <td>{formatValue(item.tempag4, 1)}</td>
                        <td>{formatValue(item.tempar, 1)}</td>
                        <td>{formatValue(item.ur, 1)}</td>
                        <td>{formatValue(item.tempar_r, 1)}</td>
                        <td>{formatValue(item.pressatm, 1)}</td>
                        <td>{formatValue(item.radincid, 1)}</td>
                        <td>{formatValue(item.radrefl, 1)}</td>
                        <td>{formatValue(item.bateria, 2)}</td>
                        <td>{formatValue(item.sonda_temp, 1)}</td>
                        <td>{formatValue(item.sonda_cond, 1)}</td>
                        <td>{formatValue(item.sonda_dosat, 1)}</td>
                        <td>{formatValue(item.sonda_do, 1)}</td>
                        <td>{formatValue(item.sonda_ph, 1)}</td>
                        <td>{formatValue(item.sonda_nh4, 2)}</td>
                        <td>{formatValue(item.sonda_no3, 2)}</td>
                        <td>{formatValue(item.sonda_turb, 1)}</td>
                        <td>{formatValue(item.sonda_chl, 1)}</td>
                        <td>{formatValue(item.sonda_bateria, 2)}</td>
                        <td>{formatValue(item.corr_norte, 2)}</td>
                        <td>{formatValue(item.corr_leste, 2)}</td>
                        <td>{formatValue(item.co2_low, 1)}</td>
                        <td>{formatValue(item.co2_high, 1)}</td>
                        <td>{formatValue(item.precipitacao, 1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </TableContainer>

              {data.length === 0 && !loading && !error && (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  <Database size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
                  <p>Nenhum dado carregado ainda.</p>
                  <p>
                    Configure os filtros e clique em "Buscar Dados" para visualizar as informações.
                  </p>
                </div>
              )}

              {data.length > 0 && (
                <PaginationContainer>
                  <PaginationButton
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </PaginationButton>

                  <PaginationInfo>
                    Página {pagination.page} de {pagination.totalPages}({pagination.total}{" "}
                    registros)
                  </PaginationInfo>

                  <PaginationButton
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    Próxima
                    <ChevronRight size={16} />
                  </PaginationButton>
                </PaginationContainer>
              )}

              {data.length === 0 && !loading && !error && (
                <LoadingContainer>
                  Nenhum dado encontrado para o período selecionado.
                </LoadingContainer>
              )}
            </>
          )}
        </Section>
      </MainContent>

      <CsvExportModal
        $isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        data={data as unknown as Array<Record<string, unknown>>}
        defaultFilename="dados_sima.csv"
        estacoes={estacoes}
        selectedEstacao={filters.estacao}
      />
    </SimaSPAContainer>
  );
}

export default SimaSPAPage;
