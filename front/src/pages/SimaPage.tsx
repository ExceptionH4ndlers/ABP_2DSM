import { useEffect, useState } from "react";
import { getSima } from "../api/simaApi";
import type { Sima, PaginatedResponse } from "../types/sima";
import styled from "styled-components";
import { CsvExportButton } from "../components/CsvExportButton";
import type { SimaData } from "../utils/csvParser";

// --- Styled Components (mesmos do seu código anterior) ---

const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 2rem;
  background: #ffffff;
  overflow-x: hidden;
  box-sizing: border-box;

  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0f172a;
  text-align: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: #475569;
  text-align: center;
  margin: 0 0 1.5rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.9rem;
    margin: 0 0 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.card.shadow};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  backdrop-filter: blur(10px);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 40px rgba(30, 64, 175, 0.2);
    border-color: rgba(30, 64, 175, 0.25);
  }

  ${({ theme }) => theme.media.mobile} {
    border-radius: 12px;
    font-size: 0.8rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 16px;

  ${({ theme }) => theme.media.mobile} {
    border-radius: 12px;
    margin: 0 -1rem;
    padding: 0 1rem;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;

  ${({ theme }) => theme.media.mobile} {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const Td = styled.td`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 0.875rem;
  white-space: nowrap;

  ${({ theme }) => theme.media.mobile} {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: rgba(249, 250, 251, 0.5);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#9ca3af" : props.theme.colors.primary)};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 600;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#9ca3af" : props.theme.colors.primaryDark)};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) => (props.disabled ? "none" : "0 8px 20px rgba(30, 64, 175, 0.3)")};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(0) scale(0.98)")};
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0.875rem 1.25rem;
    min-height: 48px;
    font-size: 0.9rem;

    &:hover {
      transform: none;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const DateInputs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;

  input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;

    input {
      padding: 0.75rem;
      font-size: 16px; /* Evita zoom no iOS */
    }
  }
`;

const ExportSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

function SimaPage() {
  const [data, setData] = useState<Sima[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("2004-01-01"); // data inicial padrão
  const [endDate, setEndDate] = useState("2004-12-31"); // data final padrão

  // Converter dados SIMA para formato do CSV parser
  const convertToCsvData = (simaData: Sima[]): SimaData[] => {
    return simaData.map((item) => ({
      idsima: item.idsima,
      idestacao: item.idestacao,
      datahora: item.datahora,
      regno: item.regno,
      nofsamples: item.nofsamples,
      proamag: item.proamag,
      dirvt: item.dirvt,
      intensvt: item.intensvt,
      u_vel: item.u_vel,
      v_vel: item.v_vel,
      tempag1: item.tempag1,
      tempag2: item.tempag2,
      tempag3: item.tempag3,
      tempag4: item.tempag4,
      tempar: item.tempar,
      ur: item.ur,
      tempar_r: item.tempar_r,
      pressatm: item.pressatm,
      radincid: item.radincid,
      radrefl: item.radrefl,
      bateria: item.bateria,
      sonda_temp: item.sonda_temp,
      sonda_cond: item.sonda_cond,
      sonda_DOsat: item.sonda_DOsat,
      sonda_DO: item.sonda_DO,
      sonda_pH: item.sonda_pH,
      sonda_NH4: item.sonda_NH4,
      sonda_NO3: item.sonda_NO3,
      sonda_turb: item.sonda_turb,
      sonda_chl: item.sonda_chl,
      sonda_bateria: item.sonda_bateria,
      corr_norte: item.corr_norte,
      corr_leste: item.corr_leste,
      co2_low: item.co2_low,
      co2_high: item.co2_high,
      precipitacao: item.precipitacao,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: PaginatedResponse<Sima> = await getSima({
          page,
          limit: 20,
          startDate,
          endDate,
        });

        setData(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Erro ao carregar registros:", error);
      }
    };

    fetchData();
  }, [page, startDate, endDate]);

  return (
    <PageContainer>
      <Title>Lista de Registros - SIMA</Title>
      <Subtitle>Consulte e filtre os dados coletados pelo sistema</Subtitle>

      {/* 📅 Filtros de data */}
      <DateInputs>
        <label>
          Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1); // resetar a paginação ao mudar o filtro
            }}
          />
        </label>

        <label>
          Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1); // resetar a paginação ao mudar o filtro
            }}
          />
        </label>
      </DateInputs>

      {/* 📤 Botão de exportação */}
      <ExportSection>
        <CsvExportButton
          data={convertToCsvData(data)}
          filename={`dados_sima_${startDate}_${endDate}.csv`}
          variant="primary"
          size="medium"
        />
      </ExportSection>

      {/* 🧾 Tabela de dados */}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Estação</Th>
              <Th>Data/Hora</Th>
              <Th>Temperatura</Th>
              <Th>Precipitação</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <Tr key={row.idsima}>
                <Td>{row.idsima}</Td>
                <Td>{row.idestacao}</Td>
                <Td>{new Date(row.datahora).toLocaleString("pt-BR")}</Td>
                <Td>{row.tempar ?? "-"}</Td>
                <Td>{row.precipitacao ?? "-"}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {/* 📄 Paginação */}
      <Pagination>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Próxima
        </Button>
      </Pagination>
    </PageContainer>
  );
}

export default SimaPage;
