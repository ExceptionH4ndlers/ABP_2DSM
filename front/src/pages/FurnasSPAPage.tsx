import { useState, useEffect } from "react";
import styled from "styled-components";
import FurnasSidebar from "../components/FurnasSidebar";
import {
  MapPin,
  Database,
  Filter,
  Search,
  BookOpen,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
  Hash,
  Calendar,
  Package,
  Percent,
  Zap,
  Waves,
} from "lucide-react";
import { ExportCsvButton } from "../components/ExportCsvButton";
import { CsvExportModalFurnas } from "../components/CsvExportModalFurnas";
// CSV export via backend

const FurnasSPAContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
`;

const MainContent = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "280px")};
  padding: 2rem;
  max-width: calc(100vw - ${({ $collapsed }) => ($collapsed ? "80px" : "280px")});
  overflow-x: visible;
  transition:
    margin-left 0.3s ease,
    max-width 0.3s ease;

  @media (max-width: 1024px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "240px")};
    max-width: ${({ $collapsed }) => ($collapsed ? "calc(100vw - 80px)" : "calc(100vw - 240px)")};
  }

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
  }
`;

const Section = styled.section`
  background: #ffffff;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
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
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  color: #000000;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
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
    border-color: #22c55e;
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
    border-color: #22c55e;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;
// usando ExportCsvButton compartilhado (importado)

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

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  justify-items: center;
  align-items: start;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  /* INPE no topo centralizado */
  & > :nth-child(1) {
    grid-column: 2 / 4;
    max-width: 300px;
    margin: 0 auto;
  }

  /* Base - 4 cards distribuídos */
  & > :nth-child(2) {
    grid-column: 1;
  }

  & > :nth-child(3) {
    grid-column: 2;
  }

  & > :nth-child(4) {
    grid-column: 3;
  }

  & > :nth-child(5) {
    grid-column: 4;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;

    & > * {
      grid-column: 1 !important;
    }
  }
`;

const ParticipantCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #196d95;
  }
`;

const ParticipantLogo = styled.img`
  max-width: 160px;
  max-height: 100px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: grayscale(0.1) contrast(1.1) brightness(1.05);
  transition: all 0.3s ease;
  cursor: pointer;

  ${ParticipantCard}:hover & {
    filter: grayscale(0) contrast(1.2) brightness(1.1);
    transform: scale(1.05);
  }
`;

const ParticipantName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ParticipantLink = styled.a`
  color: #196d95;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #0f4c75;
    text-decoration: underline;
  }

  /* Quando envolve apenas a logo, não aplicar decoração */
  img + & {
    margin-top: 0.5rem;
  }
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

function FurnasSPAPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const [filters, setFilters] = useState({
    startDate: "2006-01-01", // será ajustado pelo MIN/MAX do banco
    endDate: "2013-12-31",
    limit: 10,
    reservatorio: "",
    sortOrder: "desc",
  });
  const [reservatorios, setReservatorios] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  const handleSearch = (page: number = 1) => {
    setLoading(true);
    setError(null);
    // Monta SQL com filtros
    const params: Array<string | number> = [filters.startDate, filters.endDate];
    let sql =
      "SELECT idDadosRepresa, dataMedida, nivelReservatorio, volUtilReservatorio, porVolUtilReservatorio, geracao, vazaoAfluente, vazaoDefluente FROM tbdadosrepresa WHERE dataMedida BETWEEN $1 AND $2";
    // filtro por reservatório via join, se selecionado
    if (filters.reservatorio) {
      params.push(filters.reservatorio);
      sql =
        "SELECT d.idDadosRepresa, d.dataMedida, d.nivelReservatorio, d.volUtilReservatorio, d.porVolUtilReservatorio, d.geracao, d.vazaoAfluente, d.vazaoDefluente FROM tbdadosrepresa d INNER JOIN tbreservatorio r ON d.idReservatorio = r.idReservatorio WHERE d.dataMedida BETWEEN $1 AND $2 AND r.nome = $3";
    }
    sql += ` ORDER BY ${filters.reservatorio ? "d.dataMedida" : "dataMedida"} ${filters.sortOrder === "asc" ? "ASC" : "DESC"}`;

    // Primeiro, contar o total de registros (remover ORDER BY e substituir o SELECT)
    const countSql = sql
      .replace(/\s+ORDER BY[\s\S]*$/i, "")
      .replace(/^SELECT[\s\S]*?FROM/i, "SELECT COUNT(*) as count FROM");
    fetch("http://localhost:3001/furnas/query/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sql: countSql, params }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Falha ao contar registros");
        const countJson = await r.json();
        const total =
          Array.isArray(countJson) && countJson.length > 0 ? parseInt(countJson[0].count) : 0;

        // Agora buscar os dados paginados
        const offset = (page - 1) * filters.limit;
        const paginatedParams = [...params, filters.limit, offset];
        const paginatedSql =
          sql + ` LIMIT $${paginatedParams.length - 1} OFFSET $${paginatedParams.length}`;

        const dataRes = await fetch("http://localhost:3001/furnas/query/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sql: paginatedSql, params: paginatedParams }),
        });

        if (!dataRes.ok) throw new Error("Falha ao buscar dados");
        const json = await dataRes.json();
        setRows(Array.isArray(json) ? json : []);

        // Atualizar paginação
        const totalPages = Math.ceil(total / filters.limit);
        setPagination({
          page,
          limit: filters.limit,
          total,
          totalPages,
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Erro desconhecido"))
      .finally(() => setLoading(false));
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
        startDate: "2003-01-01", // Data mais antiga geral
        endDate: "2011-12-31", // Data mais recente geral
        reservatorio: reservatorio,
      }));
      return;
    }

    try {
      // Buscar dados do reservatório específico para obter as datas
      const params: Array<string | number> = [reservatorio];
      const sql =
        "SELECT d.dataMedida FROM tbdadosrepresa d INNER JOIN tbreservatorio r ON d.idReservatorio = r.idReservatorio WHERE r.nome = $1 ORDER BY d.dataMedida";

      const response = await fetch("http://localhost:3001/furnas/query/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql, params }),
      });

      if (response.ok) {
        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          // Encontrar a data mais antiga e mais recente
          const dates = result
            .map((item: { datamedida: string }) => new Date(item.datamedida))
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
    handleSearch(newPage);
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({ ...prev, reservatorio: "", limit: 10, sortOrder: "desc" }));
    setRows([]);
  };

  // export via modal; função direta removida

  // Carrega período MIN/MAX uma vez ao montar
  useEffect(() => {
    (async () => {
      try {
        const resPeriod = await fetch("http://localhost:3001/furnas/query/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sql: "SELECT MIN(dataMedida) AS min_data, MAX(dataMedida) AS max_data FROM tbdadosrepresa",
            params: [],
          }),
        });
        if (resPeriod.ok) {
          const arr = await resPeriod.json();
          const rec = Array.isArray(arr) && arr[0] ? arr[0] : null;
          if (rec?.min_data && rec?.max_data) {
            setFilters((f) => ({
              ...f,
              startDate: String(rec.min_data).slice(0, 10),
              endDate: String(rec.max_data).slice(0, 10),
            }));
          }
        }
      } catch {
        // mantém defaults em caso de falha
      }
    })();
  }, []);

  // Carrega apenas reservatórios que possuem dados (independente do período)
  useEffect(() => {
    (async () => {
      try {
        const sql =
          "SELECT DISTINCT r.nome FROM tbreservatorio r INNER JOIN tbdadosrepresa d ON d.idreservatorio = r.idreservatorio ORDER BY r.nome";
        const resReserv = await fetch("http://localhost:3001/furnas/query/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sql, params: [] }),
        });
        if (resReserv.ok) {
          const data: Array<{ nome: string }> = await resReserv.json();
          setReservatorios(data.map((d) => d.nome).filter(Boolean));
        } else {
          setReservatorios([]);
        }
      } catch {
        setReservatorios([]);
      }
    })();
  }, []);

  return (
    <FurnasSPAContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="conteudo"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        {/* Seção Objetivos Gerais */}
        <Section id="conteudo">
          <SectionTitle>
            <Target size={40} />
            Objetivos Gerais
          </SectionTitle>
          <SectionSubtitle>
            Metas principais do projeto Balanço de Carbono em Reservatórios Hidrelétricos
          </SectionSubtitle>

          <SectionText>
            <strong>• Determinar as emissões de gases de efeito estufa:</strong> gás carbônico,
            metano e óxido nitroso, dos reservatórios de FURNAS Centrais Elétricas S.A.;
          </SectionText>

          <SectionText>
            <strong>• Identificar as rotas do ciclo do carbono:</strong> nesses reservatórios e os
            fatores ambientais envolvidos;
          </SectionText>

          <SectionText>
            <strong>• Avaliar a influência dos fatores:</strong> morfológicos, morfométricos,
            biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;
          </SectionText>

          <SectionText>
            <strong>• Determinar o padrão de emissão existente:</strong> anteriormente à construção
            de reservatórios;
          </SectionText>

          <SectionText>
            <strong>• Elaborar um modelo espacial e temporal:</strong> de emissão de gases para
            reservatórios implantados em ambientes de Cerrado.
          </SectionText>
        </Section>

        {/* Seção Introdução */}
        <Section>
          <SectionTitle>
            <BookOpen size={40} />
            Introdução
          </SectionTitle>
          <SectionSubtitle>Contexto científico e regulatório do projeto</SectionSubtitle>

          <SectionText>
            A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode causar
            severas consequências ambientais em escalas regionais e global, tendendo a afetar mais
            os países em desenvolvimento, localizados em baixas latitudes, do que os países do
            hemisfério Norte.
          </SectionText>

          <SectionText>
            O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima,
            comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem como
            das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás carbônico,
            metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o primeiro passo na
            busca de medidas mitigadoras.
          </SectionText>

          <SectionText>
            A partir da última década, a comunidade científica tem questionado se os reservatórios
            destinados à geração hidrelétrica contribuem substancialmente para o aumento do efeito
            estufa. Assim, tornam-se necessárias investigações nessa área. Além disso, é importante
            que o setor elétrico nacional verifique as opções disponíveis para redução das emissões
            de gases de efeito estufa por unidade de energia gerada, de modo que possa se qualificar
            para o mercado mundial das Reduções Certificadas de Emissão.
          </SectionText>

          <SectionText>
            O presente projeto constitui a etapa inicial na realização do balanço de carbono de
            FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das usinas
            hidrelétricas poderão ser comparadas às emissões produzidas pela geração termelétrica e,
            então, contrastadas com o carbono fixado por meio dos projetos de reflorestamento da
            Empresa.
          </SectionText>

          <SectionText>
            Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um
            investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de
            eletricidade, em pesquisa e desenvolvimento no setor elétrico. Os procedimentos para os
            projetos são determinados pela{" "}
            <a
              href="https://www.gov.br/aneel/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#196d95",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Agência Nacional de Energia Elétrica (ANEEL)
            </a>
            .
          </SectionText>

          <SectionText>
            <strong>Gerente do Projeto:</strong> André Carlos Prates Cimbleris
            <br />
            <strong>Telefone:</strong> (21)2528-5436
          </SectionText>
        </Section>

        {/* Seção Participantes */}
        <Section>
          <SectionTitle>
            <Users size={40} />
            Participantes
          </SectionTitle>
          <SectionSubtitle>Instituições parceiras no projeto Balanço de Carbono</SectionSubtitle>

          <ParticipantsGrid>
            {/* INPE no topo centralizado */}
            <ParticipantCard>
              <ParticipantLink
                href="https://www.gov.br/inpe/pt-br"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ParticipantLogo
                  src="/img/furnas/inpe_logo_participante.jpg"
                  alt="Instituto Nacional de Pesquisas Espaciais"
                />
              </ParticipantLink>
              <ParticipantName>Instituto Nacional de Pesquisas Espaciais</ParticipantName>
            </ParticipantCard>

            {/* Base - 4 participantes */}
            <ParticipantCard>
              <ParticipantLink
                href="https://www.furnas.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ParticipantLogo
                  src="/img/furnas/furnaslogo_participante.jpg"
                  alt="FURNAS Centrais Elétricas S.A."
                />
              </ParticipantLink>
              <ParticipantName>FURNAS Centrais Elétricas S.A.</ParticipantName>
            </ParticipantCard>

            <ParticipantCard>
              <ParticipantLogo
                src="/img/furnas/logo_ufjf_participante.gif"
                alt="Universidade Federal de Juiz de Fora"
              />
              <ParticipantName>Universidade Federal de Juiz de Fora</ParticipantName>
            </ParticipantCard>

            <ParticipantCard>
              <ParticipantLink
                href="https://coppe.ufrj.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ParticipantLogo
                  src="/img/furnas/coppe_participante.jpg"
                  alt="UFRJ - Programas de Pós-graduação de Engenharia"
                />
              </ParticipantLink>
              <ParticipantName>UFRJ - Programas de Pós-graduação de Engenharia</ParticipantName>
            </ParticipantCard>

            <ParticipantCard>
              <ParticipantLink
                href="https://www.iie.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ParticipantLogo
                  src="/img/furnas/iiega_logo_participante.jpg"
                  alt="Instituto Internacional de Ecologia e Gerenciamento Ambiental"
                />
              </ParticipantLink>
              <ParticipantName>
                Instituto Internacional de Ecologia e Gerenciamento Ambiental
              </ParticipantName>
            </ParticipantCard>
          </ParticipantsGrid>
        </Section>

        {/* Seção Mapa */}
        <Section id="mapa">
          <SectionTitle>
            <MapPin size={40} />
            Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>Reservatórios estudados no projeto Balanço de Carbono</SectionSubtitle>

          <MapPlaceholder>
            <MapPin size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h3>Mapa Interativo dos Reservatórios</h3>
            <p>
              Visualização geográfica dos reservatórios hidrelétricos estudados no projeto,
              incluindo dados de localização, características ambientais e resultados das campanhas
              científicas.
            </p>
          </MapPlaceholder>
        </Section>

        {/* Seção Banco de Dados */}
        <Section id="dados">
          <SectionTitle>
            <Database size={40} />
            Banco de Dados
          </SectionTitle>
          <SectionSubtitle>
            Consulte e visualize os dados coletados nas campanhas científicas
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
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                >
                  <option value="desc">Mais recente → Mais antigo</option>
                  <option value="asc">Mais antigo → Mais recente</option>
                </ControlSelect>
              </ControlGroup>
            </ControlsGrid>

            <ActionButtons>
              <SearchButton onClick={() => handleSearch(1)} disabled={loading}>
                <Search size={20} />
                {loading ? "Buscando..." : "Buscar Dados"}
              </SearchButton>
              <ClearButton onClick={handleClearFilters}>
                <Filter size={20} />
                Limpar Filtros
              </ClearButton>
              <ExportCsvButton
                data={rows as unknown[]}
                filename="dados_furnas.csv"
                onClick={() => setIsCsvModalOpen(true)}
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
              Carregando dados das campanhas científicas...
            </LoadingContainer>
          ) : (
            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <th>
                      <Hash size={16} /> ID
                    </th>
                    <th>
                      <Calendar size={16} /> Data
                    </th>
                    <th>
                      <Waves size={16} /> Nível
                    </th>
                    <th>
                      <Package size={16} /> Vol. Útil
                    </th>
                    <th>
                      <Percent size={16} /> % Vol. Útil
                    </th>
                    <th>
                      <Zap size={16} /> Geração
                    </th>
                    <th>
                      <Waves size={16} /> Vazão Afluente
                    </th>
                    <th>
                      <Waves size={16} /> Vazão Defluente
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}
                      >
                        Selecione os filtros e clique em "Buscar Dados" para visualizar os
                        resultados
                      </td>
                    </tr>
                  ) : (
                    rows.map((r: Record<string, unknown>) => (
                      <tr key={String(r.iddadosrepresa)}>
                        <td>{String(r.iddadosrepresa ?? "-")}</td>
                        <td>
                          {r.datamedida
                            ? new Date(String(r.datamedida)).toLocaleDateString("pt-BR")
                            : "-"}
                        </td>
                        <td>{String(r.nivelreservatorio ?? "-")}</td>
                        <td>{String(r.volutilreservatorio ?? "-")}</td>
                        <td>{String(r.porvolutilreservatorio ?? "-")}</td>
                        <td>{String(r.geracao ?? "-")}</td>
                        <td>{String(r.vazaoafluente ?? "-")}</td>
                        <td>{String(r.vazaodefluente ?? "-")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </StyledTable>
            </TableContainer>
          )}

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
      <CsvExportModalFurnas
        $isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        defaultFilename="dados_furnas.csv"
        startDate={filters.startDate}
        endDate={filters.endDate}
        reservatorios={reservatorios}
        reservatorioSelecionado={filters.reservatorio}
        data={rows}
      />
    </FurnasSPAContainer>
  );
}

export default FurnasSPAPage;
