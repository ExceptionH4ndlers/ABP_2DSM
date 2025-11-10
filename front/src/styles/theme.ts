import type { DefaultTheme } from "styled-components";

const tailwindBreakpoints = {
  base: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

const minusOne = (value: string) => `${Number.parseInt(value, 10) - 1}px`;

const theme: DefaultTheme = {
  colors: {
    primary: "#1e40af", // azul INPE oficial
    primaryDark: "#1e3a8a",
    primaryLight: "#3b82f6",
    background: "#ffffff", // fundo branco
    backgroundImage:
      "linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)",
    text: {
      base: "#1e293b", // slate-800
      inverse: "#ffffff",
      muted: "#64748b", // slate-500
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      border: "rgba(30, 64, 175, 0.15)",
      shadow: "0 8px 32px rgba(30, 64, 175, 0.15)",
    },
  },
  fonts: {
    body: "'Helvetica Neue', Arial, sans-serif",
    size: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
    },
    weight: {
      normal: 400,
      bold: 600,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  borderRadius: "0.375rem",
  shadows: {
    small: "0 1px 2px rgba(0,0,0,0.05)",
    medium: "0 4px 6px rgba(0,0,0,0.1)",
  },
  breakpoints: {
    ...tailwindBreakpoints,
  },
  media: {
    baseOnly: `@media (max-width: ${minusOne(tailwindBreakpoints.sm)})`,
    sm: `@media (min-width: ${tailwindBreakpoints.sm})`,
    md: `@media (min-width: ${tailwindBreakpoints.md})`,
    lg: `@media (min-width: ${tailwindBreakpoints.lg})`,
    xl: `@media (min-width: ${tailwindBreakpoints.xl})`,
    smOnly: `@media (min-width: ${tailwindBreakpoints.sm}) and (max-width: ${minusOne(tailwindBreakpoints.md)})`,
    mdOnly: `@media (min-width: ${tailwindBreakpoints.md}) and (max-width: ${minusOne(tailwindBreakpoints.lg)})`,
    lgOnly: `@media (min-width: ${tailwindBreakpoints.lg}) and (max-width: ${minusOne(tailwindBreakpoints.xl)})`,
    smDown: `@media (max-width: ${minusOne(tailwindBreakpoints.sm)})`,
    mdDown: `@media (max-width: ${minusOne(tailwindBreakpoints.md)})`,
    lgDown: `@media (max-width: ${minusOne(tailwindBreakpoints.lg)})`,
    xlDown: `@media (max-width: ${minusOne(tailwindBreakpoints.xl)})`,
    // aliases mantidos para retrocompatibilidade
    mobile: `@media (max-width: ${minusOne(tailwindBreakpoints.sm)})`,
    tablet: `@media (min-width: ${tailwindBreakpoints.sm}) and (max-width: ${minusOne(tailwindBreakpoints.md)})`,
    desktop: `@media (min-width: ${tailwindBreakpoints.md}) and (max-width: ${minusOne(tailwindBreakpoints.lg)})`,
    wide: `@media (min-width: ${tailwindBreakpoints.lg})`,
    mobileUp: `@media (min-width: ${tailwindBreakpoints.sm})`,
    tabletUp: `@media (min-width: ${tailwindBreakpoints.md})`,
    desktopUp: `@media (min-width: ${tailwindBreakpoints.lg})`,
  },
};

export default theme;
