// Utilitários de responsividade alinhados aos breakpoints do Tailwind
import { css } from "styled-components";

const tailwindBreakpoints = {
  baseMax: 639,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const up = (value: number) => `@media (min-width: ${value}px)`;
const down = (value: number) => `@media (max-width: ${value}px)`;
const between = (min: number, max: number) =>
  `@media (min-width: ${min}px) and (max-width: ${max}px)`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const baseOnly = (styles: any) => css`
  ${down(tailwindBreakpoints.baseMax)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const smUp = (styles: any) => css`
  ${up(tailwindBreakpoints.sm)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdUp = (styles: any) => css`
  ${up(tailwindBreakpoints.md)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lgUp = (styles: any) => css`
  ${up(tailwindBreakpoints.lg)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const xlUp = (styles: any) => css`
  ${up(tailwindBreakpoints.xl)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const smOnly = (styles: any) => css`
  ${between(tailwindBreakpoints.sm, tailwindBreakpoints.md - 1)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdOnly = (styles: any) => css`
  ${between(tailwindBreakpoints.md, tailwindBreakpoints.lg - 1)} {
    ${styles}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lgOnly = (styles: any) => css`
  ${between(tailwindBreakpoints.lg, tailwindBreakpoints.xl - 1)} {
    ${styles}
  }
`;

// Mixins utilitários prontos
export const responsivePadding = css`
  padding: 1.5rem;

  ${smUp`
    padding: 2rem;
  `}

  ${lgUp`
    padding: 3rem;
  `}
`;

export const responsiveMargin = css`
  margin: 1.5rem 0;

  ${smUp`
    margin: 2rem 0;
  `}
`;

export const responsiveFontSize = css`
  font-size: 1rem;

  ${lgUp`
    font-size: 1.125rem;
  `}
`;

export const responsiveBorderRadius = css`
  border-radius: 16px;

  ${lgUp`
    border-radius: 20px;
  `}
`;

export const responsiveGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  ${smUp`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${lgUp`
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  `}
`;

export const responsiveFlex = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${mdUp`
    flex-direction: row;
    gap: 1rem;
  `}
`;

// Mixins para melhorar a experiência em dispositivos móveis
export const touchFriendly = css`
  min-height: 48px;
  min-width: 44px;

  ${lgUp`
    min-height: 44px;
  `}
`;

export const mobileOptimized = css`
  ${baseOnly`
    font-size: 16px; /* Evita zoom no iOS */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `}
`;

export const scrollOptimized = css`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${baseOnly`
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  `}
`;
