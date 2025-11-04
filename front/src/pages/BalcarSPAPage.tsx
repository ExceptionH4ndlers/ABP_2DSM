import React, { useState } from "react";
import styled from "styled-components";
import {
  MapPin,
  Database,
  Building2,
  Archive,
  DollarSign,
  Users,
  Download,
  Hash,
  Calendar,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CsvExportModalBalcar } from "../components/CsvExportModalBalcar";
import { useMapData } from "../hooks/useMapData";
import InteractiveMap from "../components/InteractiveMap";
import logoBalcar from "../../img/logoBalcar.png";
import logoInpe from "../../img/balcar/logoInpe.png";
import logoIie from "../../img/balcar/logoIie.png";
import logoUfjf from "../../img/balcar/logoUfjf.png";
import logoCoppe from "../../img/balcar/logoCoppe.png";
import logoFurnas from "../../img/balcar/logoFurnas.png";

const BalcarSPAContainer = styled.div`
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
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ExportCsvButton = styled.button`
  background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
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
    min-width: 160px;
    min-height: 42px;
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

  tr:hover {
    background: #f3f4f6;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }

  tr:nth-child(even):hover {
    background: #f3f4f6;
  }

  /* Sem cores por grupo (apenas hover/zebra) */
`;

// Controles (mesmo padrão do SIMA)
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

const HeroLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const HeroLogo = styled.img`
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08));
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
`;

const SectionText = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.75;
  margin: 0 0 1rem 0;
`;

const BulletList = styled.ul`
  margin: 0.5rem 0 1.25rem 1.25rem;
  color: #475569;
  line-height: 1.6;
`;

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

// removed unused styled blocks related to the old "Sobre a Base de Dados" section

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.25rem;
  align-items: center;
`;

const SupportCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SupportLogo = styled.img`
  max-height: 56px;
  max-width: 100%;
  object-fit: contain;
  filter: saturate(1.05) contrast(1.02);
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
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
    transform: translateY(-1px);
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

function BalcarSPAPage() {
  // Hook para dados do mapa - apenas BALCAR
  const {
    mapPoints,
    loading: mapLoading,
    error: mapError,
  } = useMapData({
    showSima: false,
    showFurnas: false,
    showBalcar: true,
  });

  const [mapFilters, setMapFilters] = useState({
    showSima: false,
    showFurnas: false,
    showBalcar: true,
  });

  const [filtersPanelOpen, setFiltersPanelOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState<Array<Record<string, unknown>>>([]);
  const [isCsvModalOpen, setIsCsvModalOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [reservatorios, setReservatorios] = React.useState<string[]>([]);
  const [filters, setFilters] = React.useState<{
    startDate: string;
    endDate: string;
    limit: number;
    reservatorio: string;
    sortOrder: "asc" | "desc";
  }>({
    startDate: "2003-11-01",
    endDate: "2011-12-31",
    limit: 10,
    reservatorio: "",
    sortOrder: "desc",
  });

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      // Monta SQL conforme filtros
      const params: Array<string | number> = [filters.startDate, filters.endDate];
      let sql =
        "SELECT c.idcampanha, c.nrocampanha, c.datainicio, c.datafim, r.nome AS reservatorio, i.nome AS instituicao FROM tbcampanha c INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao WHERE c.datainicio BETWEEN $1 AND $2";
      if (filters.reservatorio) {
        params.push(filters.reservatorio);
        sql += ` AND r.nome = $${params.length}`;
      }
      sql += ` ORDER BY c.datainicio ${filters.sortOrder === "asc" ? "ASC" : "DESC"}`;

      // Primeiro, contar o total de registros (remover ORDER BY e substituir o SELECT)
      const countSql = sql
        .replace(/\s+ORDER BY[\s\S]*$/i, "")
        .replace(/^SELECT[\s\S]*?FROM/i, "SELECT COUNT(*) as count FROM");
      const countRes = await fetch("http://localhost:3001/balcar/query/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: countSql, params }),
      });

      if (!countRes.ok) throw new Error("Falha ao contar registros");
      const countJson = await countRes.json();
      const total =
        Array.isArray(countJson) && countJson.length > 0 ? parseInt(countJson[0].count) : 0;

      // Agora buscar os dados paginados
      const offset = (page - 1) * filters.limit;
      params.push(filters.limit, offset);
      sql += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

      const res = await fetch("http://localhost:3001/balcar/query/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql, params }),
      });
      if (!res.ok) throw new Error("Falha ao buscar dados");
      const json = await res.json();
      setRows(Array.isArray(json) ? json : []);

      // Atualizar paginação
      const totalPages = Math.ceil(total / filters.limit);
      setPagination({
        page,
        limit: filters.limit,
        total,
        totalPages,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar datas específicas de um reservatório
  const updateDatesForReservatorio = async (reservatorio: string) => {
    // Atualizar o reservatório primeiro
    setFilters((prev) => ({
      ...prev,
      reservatorio: reservatorio,
    }));

    // Se for "todos os reservatórios", usar as datas gerais
    if (!reservatorio) {
      setFilters((prev) => ({
        ...prev,
        startDate: "2003-11-01", // Data mais antiga geral
        endDate: "2011-12-31", // Data mais recente geral
        reservatorio: reservatorio,
      }));
      return;
    }

    try {
      // Buscar dados do reservatório específico para obter as datas
      const params: Array<string | number> = [reservatorio];
      const sql =
        "SELECT c.datainicio, c.datafim FROM tbcampanha c INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio WHERE r.nome = $1 ORDER BY c.datainicio";

      const response = await fetch("http://localhost:3001/balcar/query/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql, params }),
      });

      if (response.ok) {
        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          // Encontrar a data mais antiga e mais recente
          const dates = result
            .map((item: { datainicio: string; datafim: string }) => [
              new Date(item.datainicio),
              new Date(item.datafim),
            ])
            .flat()
            .filter((date: Date) => !isNaN(date.getTime())); // Filtrar apenas datas válidas

          if (dates.length > 0) {
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
      }
    } catch (error) {
      console.error("Erro ao buscar datas do reservatório:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchData(newPage);
  };

  // carregar metadados: lista de reservatórios e período padrão (MIN/MAX)
  React.useEffect(() => {
    (async () => {
      try {
        // lista de reservatórios COM DADOS (JOIN)
        const resReserv = await fetch("http://localhost:3001/balcar/query/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sql: "SELECT DISTINCT r.nome FROM tbreservatorio r INNER JOIN tbcampanha c ON c.idreservatorio = r.idreservatorio ORDER BY r.nome",
            params: [],
          }),
        });
        if (resReserv.ok) {
          const data: Array<{ nome: string }> = await resReserv.json();
          setReservatorios(data.map((d) => d.nome).filter(Boolean));
        }

        // período min/max
        const resPeriod = await fetch("http://localhost:3001/balcar/query/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sql: "SELECT MIN(datainicio) AS min_inicio, MAX(datafim) AS max_fim FROM tbcampanha",
            params: [],
          }),
        });
        if (resPeriod.ok) {
          const arr = await resPeriod.json();
          const rec = Array.isArray(arr) && arr[0] ? arr[0] : null;
          if (rec?.min_inicio && rec?.max_fim) {
            setFilters((f) => ({
              ...f,
              startDate: String(rec.min_inicio).slice(0, 10),
              endDate: String(rec.max_fim).slice(0, 10),
            }));
          }
        }
      } catch {
        // silencioso; mantém defaults se falhar
      }
    })();
  }, []);

  return (
    <BalcarSPAContainer>
      <MainContent>
        <Section id="home">
          <HeroContainer>
            <HeroLogoWrapper>
              <HeroLogo src={logoBalcar} alt="BALCAR" />
            </HeroLogoWrapper>
            <HeroTitle>BALCAR</HeroTitle>
            <SectionSubtitle>
              Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
            </SectionSubtitle>
          </HeroContainer>
        </Section>

        <Section id="portal">
          <SectionTitle>
            <Database size={20} /> Portal
          </SectionTitle>
          <SectionText>
            Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos
            Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas in
            situ de equipes que tinham como objetivo obter dados para:
          </SectionText>
          <BulletList>
            <li>
              determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido
              nitroso, dos reservatórios das hidrelétricas;
            </li>
            <li>
              identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais
              envolvidos;
            </li>
            <li>
              avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e
              operacionais dos reservatórios na emissão de gases de efeito estufa;
            </li>
            <li>
              determinar o padrão de emissão existente, anteriormente à construção de reservatórios;
            </li>
            <li>
              elaborar um modelo espacial e temporal de emissão de gases para reservatórios
              implantados em ambientes de cerrado.
            </li>
          </BulletList>
          <SectionText>
            A interface de acesso permite personalizar consultas aos dados para o download,
            visualização em tabelas dinâmicas e visualizar a distribuição espacial dos dados em mapa
            interativo do Google Maps.
          </SectionText>
        </Section>

        <Section id="dados-armazenados">
          <SectionTitle>
            <Archive size={20} /> Dados Armazenados
          </SectionTitle>
          <SectionText>
            Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades
            (reservatórios) distintos com o objetivo de coletar parâmetros na interface
            água-sedimento, coluna d'água e interface água-atmosfera. Mais detalhes sobre a base de
            dados podem ser encontrados em "descrição".
          </SectionText>
          <SectionText>
            Cada instituição participante tinha como objetivo estudar uma componente, e por
            consequência fazer leituras de parâmetros relacionados:
          </SectionText>
          <BulletList>
            <li>
              <strong>IIE:</strong> estimativas de fluxos de gases de efeito estufa e das
              concentrações de carbono e nutrientes na interface água-sedimento;
            </li>
            <li>
              <strong>INPE:</strong> fluxos de gases metano (CH₄) e dióxido de carbono (CO₂) na
              interface água-atmosfera;
            </li>
            <li>
              <strong>UFJF:</strong> determinação da produção primária, metabolismo bacteriano e
              concentrações de nutrientes na coluna d'água;
            </li>
            <li>
              <strong>UFRJ/COPPE:</strong> estimativa de fluxos de gases de efeito estufa na
              interface água-atmosfera e determinação do aporte e das taxas de sedimentação de
              carbono.
            </li>
          </BulletList>
        </Section>

        <Section id="fomento">
          <SectionTitle>
            <DollarSign size={20} /> Fomento
          </SectionTitle>
          <SectionText>
            Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS
            Centrais Elétricas S.A. no âmbito da lei 9.991/2000, que estabelece um investimento
            mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em
            pesquisa e desenvolvimento no setor elétrico. Os procedimentos para os projetos são
            determinados pela Agência Nacional de Energia Elétrica (ANEEL).
          </SectionText>
        </Section>

        <Section id="equipe">
          <SectionTitle>
            <Users size={20} /> Equipe
          </SectionTitle>
          <TeamGroup>
            <GroupTitle>Coordenação Geral</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/5535667070825818"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  André Carlos Prates Cimbleris
                </NameLink>
                <PersonMeta>Coordenação Geral</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Coordenação por Instituição</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/4775535537651746"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donato Seiji Abe
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>IIE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/2691497637313274"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  José Luiz Stech
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>INPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/0567809153346429"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fábio Roland
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFJF</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/4155308755013168"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Marco Aurélio dos Santos
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFRJ/COPPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Responsáveis pelas Coletas e Análises</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/8150880476098677"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arcilan Trevenzoli Assireu
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>INPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/5987354282647527"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bohdan Matvienko Sikar
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFRJ/COPPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7663009286545108"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Corina Verónica Sidagis Galli
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>IIE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/1002426943626438"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ednaldo Oliveira dos Santos
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFRJ/COPPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/2838003403761263"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Elizabeth Matvienko Sikar
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFRJ/COPPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7510713692919710"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Felipe Siqueira Pacheco
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFJF</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/1341263338653176"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ivan Bergier Tavares de Lima
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>INPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7301878639558446"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Luciano Marani
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>INPE</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/7511312374795216"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nathan Oliveira Barros
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>UFJF</InstitutionTag>
                </PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink
                  href="http://lattes.cnpq.br/0578519055132957"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plínio Carlos Alvalá
                </NameLink>
                <PersonMeta>
                  <InstitutionTag>INPE</InstitutionTag>
                </PersonMeta>
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

        <Section id="apoio">
          <SectionTitle>
            <Building2 size={20} /> Apoio Institucional
          </SectionTitle>
          <SectionSubtitle>Instituições parceiras e financiadoras.</SectionSubtitle>
          <SupportGrid>
            <SupportCard>
              <a href="https://www.furnas.com.br/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoFurnas} alt="Furnas Centrais Elétricas" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://coppe.ufrj.br/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoCoppe} alt="COPPE/UFRJ" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://www2.ufjf.br/ufjf/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoUfjf} alt="UFJF" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://www.iie.com.br/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoIie} alt="IIEGA" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://www.gov.br/inpe/pt-br" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoInpe} alt="INPE" />
              </a>
            </SupportCard>
          </SupportGrid>
        </Section>

        <Section id="mapa">
          <SectionTitle>
            <MapPin size={20} /> Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>
            Visualização geográfica de campanhas, sítios e medições.
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
              console.log("Reservatório BALCAR clicado:", point);
              // Aqui você pode adicionar lógica para mostrar detalhes do reservatório
            }}
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button
              onClick={() => setFiltersPanelOpen(true)}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                border: "none",
                borderRadius: 12,
                padding: "1rem 2rem",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Filter size={20} /> Configurar Filtros
            </button>
          </div>
        </Section>

        <Section id="dados">
          <SectionTitle>
            <Database size={20} /> Banco de Dados
          </SectionTitle>
          <SectionSubtitle>Consulte e visualize os dados coletados pelas campanhas</SectionSubtitle>

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
                <ControlLabel>Reservatório</ControlLabel>
                <ControlSelect
                  value={filters.reservatorio}
                  onChange={(e) => updateDatesForReservatorio(e.target.value)}
                >
                  <option value="">Todos os reservatórios</option>
                  {reservatorios.map((nome) => (
                    <option key={nome} value={nome}>
                      {nome}
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
                  onChange={(e) =>
                    setFilters({ ...filters, sortOrder: e.target.value as "asc" | "desc" })
                  }
                >
                  <option value="desc">Mais recente → Mais antigo</option>
                  <option value="asc">Mais antigo → Mais recente</option>
                </ControlSelect>
              </ControlGroup>
            </ControlsGrid>

            <ActionButtons>
              <SearchButton onClick={() => fetchData(1)} disabled={loading}>
                <Search size={20} /> {loading ? "Buscando..." : "Buscar Dados"}
              </SearchButton>
              <ClearButton
                onClick={() =>
                  setFilters({
                    startDate: "2003-11-01",
                    endDate: "2011-12-31",
                    limit: 10,
                    reservatorio: "",
                    sortOrder: "desc",
                  })
                }
              >
                <Filter size={20} /> Limpar Filtros
              </ClearButton>
              <ExportCsvButton onClick={() => setIsCsvModalOpen(true)}>
                <Download size={18} /> Exportar CSV
              </ExportCsvButton>
            </ActionButtons>
          </ControlsSection>
          {error && <div style={{ color: "#dc2626", textAlign: "center" }}>{error}</div>}
          <TableContainer>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    <Hash size={16} /> ID
                  </th>
                  <th>
                    <Database size={16} /> Campanha
                  </th>
                  <th>
                    <Calendar size={16} /> Início
                  </th>
                  <th>
                    <Calendar size={16} /> Fim
                  </th>
                  <th>
                    <MapPin size={16} /> Reservatório
                  </th>
                  <th>
                    <Building2 size={16} /> Instituição
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r: Record<string, unknown>) => (
                  <tr key={String(r.idcampanha)}>
                    <td>{String(r.idcampanha ?? "-")}</td>
                    <td>{String(r.nrocampanha ?? "-")}</td>
                    <td>
                      {r.datainicio
                        ? new Date(String(r.datainicio)).toLocaleDateString("pt-BR")
                        : "-"}
                    </td>
                    <td>
                      {r.datafim ? new Date(String(r.datafim)).toLocaleDateString("pt-BR") : "-"}
                    </td>
                    <td>{String(r.reservatorio ?? "-")}</td>
                    <td>{String(r.instituicao ?? "-")}</td>
                  </tr>
                ))}
                {rows.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 16, color: "#64748b" }}>
                      Nenhum dado carregado ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </TableContainer>

          {rows.length > 0 && (
            <PaginationContainer>
              <PaginationButton
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                <ChevronLeft size={16} />
                Anterior
              </PaginationButton>

              <PaginationInfo>
                Página {pagination.page} de {pagination.totalPages} ({pagination.total} registros)
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

          {rows.length === 0 && !loading && !error && (
            <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
              Nenhum dado encontrado para o período selecionado.
            </div>
          )}
        </Section>
      </MainContent>
      <CsvExportModalBalcar
        $isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        defaultFilename="dados_balcar.csv"
        startDate={filters.startDate}
        endDate={filters.endDate}
        reservatorios={reservatorios}
        reservatorioSelecionado={filters.reservatorio}
        data={rows}
      />
    </BalcarSPAContainer>
  );
}

export default BalcarSPAPage;
