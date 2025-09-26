import styled from "styled-components";

export type BarDatum = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: BarDatum[];
  height?: number;
  max?: number;
  showValues?: boolean;
};

const ChartContainer = styled.div`
  width: 100%;
  height: ${({ style }) => style?.height || 300}px;
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 1rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 0.75rem;
    border-radius: 8px;
  }
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: space-around;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  ${({ theme }) => theme.media.mobile} {
    gap: 4px;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: end;
  min-width: 40px;
  flex-shrink: 0;

  ${({ theme }) => theme.media.mobile} {
    min-width: 32px;
  }
`;

const Bar = styled.div<{ h: number; color: string }>`
  width: 100%;
  min-width: 40px;
  height: ${({ h }) => h}%;
  background: linear-gradient(180deg, ${({ color }) => color} 0%, ${({ color }) => color}dd 100%);
  border-radius: 8px 8px 4px 4px;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid ${({ color }) => color};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${({ theme }) => theme.media.mobile} {
    min-width: 32px;
    border-radius: 6px 6px 3px 3px;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const ValueLabel = styled.div<{ color: string }>`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ color }) => color};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Label = styled.div`
  margin-top: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: center;
  font-weight: 500;

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.75rem;
    margin-top: 6px;
  }
`;

export default function BarChart({ data, height = 300, max, showValues = true }: BarChartProps) {
  const maxValue = max ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <ChartContainer style={{ height }}>
      <Frame>
        {data.map((d, i) => (
          <BarContainer key={i}>
            <Bar h={(d.value / maxValue) * 80} color={d.color ?? "#1e40af"}>
              {showValues && <ValueLabel color={d.color ?? "#1e40af"}>{d.value}</ValueLabel>}
            </Bar>
            <Label>{d.label}</Label>
          </BarContainer>
        ))}
      </Frame>
    </ChartContainer>
  );
}
