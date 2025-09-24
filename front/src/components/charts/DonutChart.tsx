import styled from "styled-components";

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  showLegend?: boolean;
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 1rem;
`;

const SVG = styled.svg`
  filter: drop-shadow(0 4px 8px rgba(30, 64, 175, 0.1));
`;

const Segment = styled.circle<{ color: string }>`
  transition:
    stroke-width 0.3s ease,
    filter 0.3s ease;
  cursor: pointer;

  &:hover {
    stroke-width: ${({ strokeWidth }) => Number(strokeWidth) + 4};
    filter: drop-shadow(0 4px 12px rgba(30, 64, 175, 0.2));
  }
`;

const CenterCircle = styled.circle`
  fill: ${({ theme }) => theme.colors.card.background};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const CenterText = styled.text`
  font-weight: 700;
  font-size: 16px;
  fill: ${({ theme }) => theme.colors.text.base};
  text-anchor: middle;
  dominant-baseline: central;
`;

const Legend = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.base};
  }
`;

const ColorDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PercentageText = styled.text`
  font-size: 12px;
  fill: ${({ theme }) => theme.colors.text.muted};
  text-anchor: middle;
  dominant-baseline: central;
`;

export default function DonutChart({
  segments,
  size = 240,
  thickness = 20,
  centerLabel,
  showLegend = true,
}: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <ChartContainer>
      <SVG width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((s, idx) => {
            const ratio = s.value / total;
            const dash = ratio * circumference;
            const gap = circumference - dash;
            const strokeDasharray = `${dash} ${gap}`;

            return (
              <Segment
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                color={s.color}
              />
            );
          })}
        </g>

        {/* Círculo central */}
        <CenterCircle cx={size / 2} cy={size / 2} r={radius - thickness - 5} />

        {/* Texto central */}
        {centerLabel && (
          <CenterText x={size / 2} y={size / 2 - 5}>
            {centerLabel.split("\n")[0]}
          </CenterText>
        )}

        {/* Porcentagem central */}
        {centerLabel && centerLabel.includes("%") && (
          <PercentageText x={size / 2} y={size / 2 + 10}>
            {centerLabel.split("\n")[1] || ""}
          </PercentageText>
        )}
      </SVG>

      {/* Legenda */}
      {showLegend && (
        <Legend>
          {segments.map((s, i) => (
            <LegendItem key={i}>
              <ColorDot color={s.color} />
              {s.label} ({((s.value / total) * 100).toFixed(1)}%)
            </LegendItem>
          ))}
        </Legend>
      )}
    </ChartContainer>
  );
}
