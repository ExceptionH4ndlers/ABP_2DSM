import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Download, Filter, Settings, AlertCircle } from "lucide-react";
import { useCsvExport } from "../hooks/useCsvExport";
import type { CsvExportOptions } from "../utils/csvParser";

interface CsvExportModalFurnasProps {
  $isOpen: boolean;
  onClose: () => void;
  defaultFilename?: string;
  startDate: string;
  endDate: string;
  reservatorios: string[];
  reservatorioSelecionado: string;
  data: unknown[];
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Content = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: 1px solid ${({ $primary }) => ($primary ? "#1e40af" : "#e2e8f0")};
  background: ${({ $primary }) => ($primary ? "#1e40af" : "#ffffff")};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#1f2937")};
  font-weight: 600;
  cursor: pointer;
`;

export const CsvExportModalFurnas: React.FC<CsvExportModalFurnasProps> = ({
  $isOpen,
  onClose,
  defaultFilename = "dados_furnas.csv",
  startDate,
  endDate,
  reservatorios,
  reservatorioSelecionado,
  data,
}) => {
  const { isExporting, exportError, exportCsv, clearError } = useCsvExport();
  const [filename, setFilename] = useState(defaultFilename);
  const [dataInicio, setDataInicio] = useState(startDate);
  const [dataFim, setDataFim] = useState(endDate);
  const [reservatorio, setReservatorio] = useState(reservatorioSelecionado);

  const [options, setOptions] = useState<CsvExportOptions>({
    incluirMetadados: true,
    incluirCabecalhos: true,
    formatoData: "BR",
    separador: ";",
    encoding: "UTF-8",
    filtros: { dataInicio: startDate, dataFim: endDate, estacao: reservatorioSelecionado },
  });

  useEffect(() => {
    if ($isOpen) {
      setFilename(defaultFilename);
      setDataInicio(startDate);
      setDataFim(endDate);
      setReservatorio(reservatorioSelecionado);
      setOptions((prev) => ({
        ...prev,
        filtros: { dataInicio: startDate, dataFim: endDate, estacao: reservatorioSelecionado },
      }));
    }
  }, [$isOpen, defaultFilename, startDate, endDate, reservatorioSelecionado]);

  const updateOptions = (key: keyof CsvExportOptions, value: string | boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const updateFilters = (k: keyof NonNullable<CsvExportOptions["filtros"]>, v: string) => {
    setOptions((prev) => ({ ...prev, filtros: { ...(prev.filtros || {}), [k]: v } }));
  };

  const handleExport = async () => {
    await exportCsv(data, filename, options);
    clearError();
    onClose();
  };

  return (
    <Overlay $isOpen={$isOpen} onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Title>
          <Download size={20} /> Exportar CSV (FURNAS)
        </Title>

        <FormGroup>
          <Label>Nome do arquivo</Label>
          <Input value={filename} onChange={(e) => setFilename(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>Formato de Data</Label>
          <Select value={options.formatoData} onChange={(e) => updateOptions("formatoData", e.target.value)}>
            <option value="BR">Brasileiro (DD/MM/AAAA HH:MM)</option>
            <option value="ISO">ISO 8601 (AAAA-MM-DDTHH:MM:SS)</option>
            <option value="US">Americano (MM/DD/AAAA HH:MM)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Separador</Label>
          <Select value={options.separador} onChange={(e) => updateOptions("separador", e.target.value)}>
            <option value=";">Ponto e vírgula (;)</option>
            <option value=",">Vírgula (,)</option>
            <option value="\t">Tabulação</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Codificação</Label>
          <Select value={options.encoding} onChange={(e) => updateOptions("encoding", e.target.value)}>
            <option value="UTF-8">UTF-8</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <Settings size={16} style={{ marginRight: 6 }} /> Reservatório Específico
          </Label>
          <Select
            value={reservatorio}
            onChange={(e) => {
              setReservatorio(e.target.value);
              updateFilters("estacao", e.target.value);
            }}
          >
            <option key="__all__" value="">
              Todos os reservatórios
            </option>
            {reservatorios.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <Filter size={16} style={{ marginRight: 6 }} /> Período
          </Label>
          <Row>
            <Input type="date" value={dataInicio} onChange={(e) => { setDataInicio(e.target.value); updateFilters("dataInicio", e.target.value); }} />
            <Input type="date" value={dataFim} onChange={(e) => { setDataFim(e.target.value); updateFilters("dataFim", e.target.value); }} />
          </Row>
        </FormGroup>

        {exportError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "0.75rem", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={18} /> {exportError}
          </div>
        )}

        <ButtonRow>
          <Button onClick={onClose}>Cancelar</Button>
          <Button $primary onClick={handleExport} disabled={isExporting}>
            <Download size={16} /> {isExporting ? "Exportando..." : "Exportar"}
          </Button>
        </ButtonRow>
      </Content>
    </Overlay>
  );
};

export default CsvExportModalFurnas;


