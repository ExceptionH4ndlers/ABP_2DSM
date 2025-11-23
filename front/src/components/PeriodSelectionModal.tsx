import { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, AlertTriangle } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModalText = styled.p`
  font-size: 0.9375rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #1e293b;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    border-color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const WarningBox = styled.div`
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: start;
  gap: 0.75rem;
`;

const WarningText = styled.p`
  font-size: 0.875rem;
  color: #92400e;
  margin: 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$primary
      ? `
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      transform: translateY(-1px);
    }
  `
      : `
    background: #ffffff;
    color: #475569;
    border: 1.5px solid #cbd5e1;
    
    &:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #94a3b8;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface PeriodSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (startDate: string, endDate: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  estacoesCount: number;
  parametersCount: number;
  estacoes?: string[];
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || `http://localhost:${import.meta.env.VITE_SERVER_PORT ?? "3001"}`;

export default function PeriodSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  initialStartDate,
  initialEndDate,
  estacoesCount,
  parametersCount,
  estacoes = [],
}: PeriodSelectionModalProps) {
  const [startDate, setStartDate] = useState(initialStartDate || "");
  const [endDate, setEndDate] = useState(initialEndDate || "");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [loadingDates, setLoadingDates] = useState(false);

  const fetchDateRange = async () => {
    if (estacoes.length === 0) return;

    setLoadingDates(true);
    try {
      const queryParams = new URLSearchParams();
      estacoes.forEach((estacao) => {
        queryParams.append("estacoes", estacao);
      });

      const response = await fetch(`${API_BASE_URL}/sima/date-range?${queryParams}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setMinDate(result.minDate);
          setMaxDate(result.maxDate);

          // Se não há datas iniciais, preencher com os limites
          if (!startDate && !endDate) {
            setStartDate(result.minDate);
            setEndDate(result.maxDate);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao buscar limites de data:", error);
    } finally {
      setLoadingDates(false);
    }
  };

  // Buscar limites de data quando o modal abrir e houver estações selecionadas
  useEffect(() => {
    if (isOpen && estacoes.length > 0) {
      fetchDateRange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, estacoes.join(",")]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecione ambas as datas.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("A data de início deve ser anterior à data de fim.");
      return;
    }

    // Validar se as datas estão dentro dos limites disponíveis
    if (minDate && new Date(startDate) < new Date(minDate)) {
      alert(
        `A data de início não pode ser anterior a ${new Date(minDate).toLocaleDateString("pt-BR")}.`,
      );
      return;
    }

    if (maxDate && new Date(endDate) > new Date(maxDate)) {
      alert(
        `A data de fim não pode ser posterior a ${new Date(maxDate).toLocaleDateString("pt-BR")}.`,
      );
      return;
    }

    // Calcular dias entre as datas
    const daysDiff = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
    );

    // Estimar quantidade de dados (sempre uma estação)
    const estimatedPoints = parametersCount * daysDiff;
    const maxRecommended = 1000; // Limite recomendado

    if (estimatedPoints > maxRecommended) {
      const confirmMessage = `⚠️ ATENÇÃO: A seleção atual pode gerar aproximadamente ${estimatedPoints.toLocaleString()} pontos de dados, o que pode causar lentidão ou travamento.\n\nEstimação:\n• ${estacoesCount} estação(ões)\n• ${parametersCount} parâmetro(s)\n• ${daysDiff} dia(s)\n\nDeseja continuar mesmo assim?`;

      if (!window.confirm(confirmMessage)) {
        return;
      }
    }

    onConfirm(startDate, endDate);
  };

  // Calcular estimativa de dados
  const daysDiff =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;
  const estimatedPoints = estacoesCount * parametersCount * daysDiff;
  const isHighLoad = estimatedPoints > 1000;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          <Calendar size={24} />
          Selecionar Período de Análise
        </ModalTitle>
        <ModalText>
          Antes de gerar o gráfico, selecione o período de análise desejado. Períodos muito longos
          com muitas estações e parâmetros podem causar lentidão.
          {loadingDates && (
            <span
              style={{ display: "block", marginTop: "0.5rem", color: "#3b82f6", fontWeight: 600 }}
            >
              Carregando limites de data disponíveis...
            </span>
          )}
        </ModalText>

        <FormGroup>
          <Label>
            Data de Início
            {minDate && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontWeight: "normal",
                  marginLeft: "0.5rem",
                }}
              >
                (disponível: {new Date(minDate).toLocaleDateString("pt-BR")})
              </span>
            )}
          </Label>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={minDate || undefined}
            max={endDate || maxDate || undefined}
            disabled={loadingDates}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            Data de Fim
            {maxDate && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontWeight: "normal",
                  marginLeft: "0.5rem",
                }}
              >
                (disponível: {new Date(maxDate).toLocaleDateString("pt-BR")})
              </span>
            )}
          </Label>
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || minDate || undefined}
            max={maxDate || undefined}
            disabled={loadingDates}
          />
        </FormGroup>

        {isHighLoad && startDate && endDate && (
          <WarningBox>
            <AlertTriangle size={20} color="#f59e0b" />
            <WarningText>
              <strong>⚠️ Alto volume de dados estimado:</strong>
              <br />
              Aproximadamente {estimatedPoints.toLocaleString()} pontos de dados podem ser gerados.
              Isso pode causar lentidão. Considere reduzir o período, número de estações ou
              parâmetros.
            </WarningText>
          </WarningBox>
        )}

        {startDate && endDate && daysDiff > 0 && !isHighLoad && (
          <div style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
            Período: {daysDiff} dia(s) | Estimativa: ~{estimatedPoints.toLocaleString()} pontos
          </div>
        )}

        <ButtonGroup>
          <Button onClick={onClose}>Cancelar</Button>
          <Button $primary onClick={handleConfirm} disabled={!startDate || !endDate}>
            Confirmar e Gerar Gráfico
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}
