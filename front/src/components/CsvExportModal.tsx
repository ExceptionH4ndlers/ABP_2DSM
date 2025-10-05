import React, { useState } from "react";
import styled from "styled-components";
import type { DefaultTheme } from "styled-components";
import { Download, Settings, AlertCircle, CheckCircle, Filter } from "lucide-react";
import { useCsvExport } from "../hooks/useCsvExport";
import type { CsvExportOptions } from "../utils/csvParser";

interface EstacaoItem {
  idestacao: string;
  rotulo: string;
}

interface CsvExportModalProps {
  $isOpen: boolean;
  onClose: () => void;
  data: unknown[];
  defaultFilename?: string;
  estacoes?: EstacaoItem[];
  selectedEstacao?: string;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.muted};
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.card.background};
    color: ${({ theme }) => theme.colors.text.base};
  }
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.text.base};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.base};
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const DataPreview = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const PreviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PreviewLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};
`;

const PreviewValue = styled.span`
  color: ${({ theme }) => theme.colors.text.base};
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// SuccessMessage removido - não utilizado

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;

  ${({ $variant = "secondary" }) => {
    if ($variant === "primary") {
      return `
        background: #1e40af !important;
        color: white !important;
        opacity: 1 !important;
        
        &:hover:not(:disabled) {
          background: #1e3a8a !important;
          transform: translateY(-1px);
        }
      `;
    }
    return `
      background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card.background};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.base};
      border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.card.border};
      opacity: 1;
      
      &:hover:not(:disabled) {
        background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
      }
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CsvExportModal: React.FC<CsvExportModalProps> = ({
  $isOpen,
  onClose,
  data,
  defaultFilename = "dados_sima.csv",
  estacoes,
  selectedEstacao,
}) => {
  const { isExporting, exportError, exportCsv, clearError } = useCsvExport();

  const [options, setOptions] = useState<CsvExportOptions>({
    incluirMetadados: true,
    incluirCabecalhos: true,
    formatoData: "BR",
    separador: ";",
    encoding: "UTF-8",
    filtros: {
      dataInicio: "",
      dataFim: "",
      estacao: "",
    },
  });

  const [filename, setFilename] = useState(defaultFilename);

  // Pré-seleciona a estação atual quando o modal abre
  React.useEffect(() => {
    if ($isOpen && selectedEstacao) {
      setOptions((prev) => ({
        ...prev,
        filtros: { ...(prev.filtros || {}), estacao: selectedEstacao },
      }));
    }
  }, [$isOpen, selectedEstacao]);

  // Função para validar campos obrigatórios
  const validateRequiredFields = () => {
    const errors: string[] = [];

    if (!filename.trim()) {
      errors.push("Nome do arquivo é obrigatório");
    }

    if (!options.formatoData) {
      errors.push("Formato de data é obrigatório");
    }

    if (!options.separador) {
      errors.push("Separador é obrigatório");
    }

    if (!options.encoding) {
      errors.push("Codificação é obrigatória");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  // Função para buscar datas automáticas baseadas na estação
  const updateDatesForStation = async (estacao: string) => {
    if (!estacao) {
      // Se for "todas as estações", usar datas gerais
      updateFilters("dataInicio", "2004-01-12");
      updateFilters("dataFim", "2016-12-03");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/sima/all?page=1&limit=1000&startDate=2004-01-01&endDate=2017-12-31&estacao=${estacao}`,
      );

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          const dates = result.data.map((item: { datahora: string }) => new Date(item.datahora));
          const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())));
          const maxDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())));

          updateFilters("dataInicio", minDate.toISOString().split("T")[0]);
          updateFilters("dataFim", maxDate.toISOString().split("T")[0]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar datas da estação:", error);
    }
  };

  const handleExport = async () => {
    // Validar campos obrigatórios
    const validation = validateRequiredFields();
    if (!validation.isValid) {
      // Mostrar erro através do estado local
      console.error(`Campos obrigatórios não preenchidos: ${validation.errors.join(", ")}`);
      return;
    }

    await exportCsv(data, filename, options);
  };

  const handleClose = () => {
    clearError();
    onClose();
  };

  const updateOptions = (
    key: keyof CsvExportOptions,
    value: string | boolean | Record<string, unknown>,
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const updateFilters = (
    key: keyof NonNullable<CsvExportOptions["filtros"]>,
    value: string | boolean | Date,
  ) => {
    setOptions((prev) => ({
      ...prev,
      filtros: { ...prev.filtros, [key]: value },
    }));
  };

  // Calcular estatísticas dos dados
  const dataStats = {
    totalRegistros: Array.isArray(data) ? data.length : 0,
    estacoesUnicas: 0,
    periodoInicio: "",
    periodoFim: "",
  };

  return (
    <ModalOverlay $isOpen={$isOpen} onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <Download size={24} />
            Exportar Dados CSV
          </ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        {exportError && (
          <ErrorMessage>
            <AlertCircle size={20} />
            {exportError}
          </ErrorMessage>
        )}

        <DataPreview>
          <SectionTitle>
            <CheckCircle size={20} />
            Prévia dos Dados
          </SectionTitle>
          <PreviewItem>
            <PreviewLabel>Total de Registros:</PreviewLabel>
            <PreviewValue>{dataStats.totalRegistros}</PreviewValue>
          </PreviewItem>
          <PreviewItem>
            <PreviewLabel>Estações:</PreviewLabel>
            <PreviewValue>{dataStats.estacoesUnicas}</PreviewValue>
          </PreviewItem>
          <PreviewItem>
            <PreviewLabel>Período:</PreviewLabel>
            <PreviewValue>
              {dataStats.periodoInicio} - {dataStats.periodoFim}
            </PreviewValue>
          </PreviewItem>
        </DataPreview>

        <FormSection>
          <SectionTitle>
            <Settings size={20} />
            Configurações do Arquivo
          </SectionTitle>

          <FormGroup>
            <Label>Nome do Arquivo</Label>
            <Input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="dados_sima.csv"
            />
          </FormGroup>

          <FormGroup>
            <Label>Formato de Data</Label>
            <Select
              value={options.formatoData}
              onChange={(e) => updateOptions("formatoData", e.target.value)}
            >
              <option value="BR">Brasileiro (DD/MM/AAAA HH:MM)</option>
              <option value="ISO">ISO 8601 (AAAA-MM-DDTHH:MM:SS)</option>
              <option value="US">Americano (MM/DD/AAAA HH:MM)</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Separador</Label>
            <Select
              value={options.separador}
              onChange={(e) => updateOptions("separador", e.target.value)}
            >
              <option value=";">Ponto e vírgula (;)</option>
              <option value=",">Vírgula (,)</option>
              <option value="\t">Tabulação</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Codificação</Label>
            <Select
              value={options.encoding}
              onChange={(e) => updateOptions("encoding", e.target.value)}
            >
              <option value="UTF-8">UTF-8</option>
              <option value="ISO-8859-1">ISO-8859-1</option>
            </Select>
          </FormGroup>

          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={options.incluirMetadados}
                onChange={(e) => updateOptions("incluirMetadados", e.target.checked)}
              />
              Incluir metadados no arquivo
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={options.incluirCabecalhos}
                onChange={(e) => updateOptions("incluirCabecalhos", e.target.checked)}
              />
              Incluir cabeçalhos das colunas
            </CheckboxLabel>
          </CheckboxGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <Filter size={20} />
            Filtros de Exportação
          </SectionTitle>

          <FormGroup>
            <Label>Estação Específica</Label>
            <Select
              value={options.filtros?.estacao || ""}
              onChange={(e) => {
                updateFilters("estacao", e.target.value);
                updateDatesForStation(e.target.value);
              }}
            >
              <option value="">Todas as estações</option>
              {((estacoes as EstacaoItem[]) && (estacoes as EstacaoItem[]).length > 0
                ? (estacoes as EstacaoItem[]).map((es: EstacaoItem) => ({
                    value: es.idestacao,
                    label: es.rotulo,
                  }))
                : Array.from(
                    new Set(
                      (data as Array<Record<string, unknown>>).map((d) =>
                        String(((d as Record<string, unknown>).idestacao as string) || ""),
                      ),
                    ),
                  )
                    .filter((s) => s)
                    .sort()
                    .map((id) => ({ value: id, label: id }))
              ).map((opt: { value: string; label: string }) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <Filter size={20} />
            Filtros (Opcional)
          </SectionTitle>

          <FormGroup>
            <Label>Data de Início</Label>
            <Input
              type="date"
              value={options.filtros?.dataInicio || ""}
              onChange={(e) => updateFilters("dataInicio", e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Data de Fim</Label>
            <Input
              type="date"
              value={options.filtros?.dataFim || ""}
              onChange={(e) => updateFilters("dataFim", e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>ID da Estação</Label>
            <Input
              type="text"
              value={options.filtros?.estacao || ""}
              onChange={(e) => updateFilters("estacao", e.target.value)}
              placeholder="Ex: 31966"
            />
          </FormGroup>
        </FormSection>

        {!validateRequiredFields().isValid && (
          <ErrorMessage style={{ marginBottom: "1rem" }}>
            <AlertCircle size={20} />
            Campos obrigatórios não preenchidos: {validateRequiredFields().errors.join(", ")}
          </ErrorMessage>
        )}

        <ButtonGroup>
          <Button $variant="secondary" onClick={handleClose} disabled={isExporting}>
            Cancelar
          </Button>
          <Button
            $variant="primary"
            onClick={handleExport}
            disabled={isExporting || !validateRequiredFields().isValid}
          >
            <Download size={16} />
            {isExporting ? "Exportando..." : "Exportar CSV"}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};
