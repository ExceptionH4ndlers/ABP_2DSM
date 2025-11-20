// src/components/PolygonControls.tsx
import styled from "styled-components";

const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const ButtonSmall = styled.button`
  background: #2563eb;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    background: #9ca3af;
    cursor: default;
  }
`;

interface PolygonControlsProps {
  drawing: boolean;
  currentPolygonPointsCount: number;
  hasPolygons: boolean;
  onStart: () => void;
  onStop: () => void;
  onClosePolygon: () => void;
  onClearAll: () => void;
}

export function PolygonControls({
  drawing,
  currentPolygonPointsCount,
  hasPolygons,
  onStart,
  onStop,
  onClosePolygon,
  onClearAll,
}: PolygonControlsProps) {
  return (
    <ControlsWrapper>
      {!drawing ? (
        <ButtonSmall onClick={onStart}>✳ Iniciar polígono</ButtonSmall>
      ) : (
        <ButtonSmall onClick={onStop}>❌ Parar desenho</ButtonSmall>
      )}

      <ButtonSmall
        onClick={onClosePolygon}
        disabled={currentPolygonPointsCount < 3}
        title={currentPolygonPointsCount < 3 ? "Mínimo 3 pontos" : "Fechar polígono atual"}
      >
        ✔ Fechar polígono
      </ButtonSmall>

      <ButtonSmall
        onClick={onClearAll}
        disabled={!hasPolygons && currentPolygonPointsCount === 0}
      >
        🗑 Limpar tudo
      </ButtonSmall>
    </ControlsWrapper>
  );
}
