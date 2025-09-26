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

  ${({ theme }) => theme.media.mobile} {
    padding: 0.75rem;
    border-radius: 8px;
  }
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

  ${({ theme }) => theme.media.mobile} {
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
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

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.75rem;
    gap: 0.375rem;
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
  const offset = 0;

  // Ajustar tamanho para mobile
  const responsiveSize = window.innerWidth < 480 ? Math.min(size, 200) : size;
  const responsiveThickness = window.innerWidth < 480 ? Math.min(thickness, 16) : thickness;
  const responsiveRadius = responsiveSize / 2 - responsiveThickness / 2;
  const responsiveCircumference = 2 * Math.PI * responsiveRadius;

  return (
    <ChartContainer>
      <SVG
        width={responsiveSize}
        height={responsiveSize}
        viewBox={`0 0 ${responsiveSize} ${responsiveSize}`}
      >
        <g transform={`rotate(-90 ${responsiveSize / 2} ${responsiveSize / 2})`}>
          {segments.map((s, idx) => {
            const ratio = s.value / total;
            const dash = ratio * responsiveCircumference;
            const gap = responsiveCircumference - dash;
            const strokeDasharray = `${dash} ${gap}`;

            return (
              <Segment
                key={idx}
                cx={responsiveSize / 2}
                cy={responsiveSize / 2}
                r={responsiveRadius}
                fill="none"
                stroke={s.color}
                strokeWidth={responsiveThickness}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                color={s.color}
              />
            );
          })}
        </g>

        {/* Círculo central */}
        <CenterCircle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={responsiveRadius - responsiveThickness - 5}
        />

        {/* Texto central */}
        {centerLabel && (
          <CenterText x={responsiveSize / 2} y={responsiveSize / 2 - 5}>
            {centerLabel.split("\n")[0]}
          </CenterText>
        )}

        {/* Porcentagem central */}
        {centerLabel && centerLabel.includes("%") && (
          <PercentageText x={responsiveSize / 2} y={responsiveSize / 2 + 10}>
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
