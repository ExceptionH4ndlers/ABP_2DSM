import type { DefaultTheme } from "styled-components";

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
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },
  media: {
    mobile: `@media (max-width: 479px)`,
    tablet: `@media (min-width: 480px) and (max-width: 767px)`,
    desktop: `@media (min-width: 768px) and (max-width: 1023px)`,
    wide: `@media (min-width: 1024px)`,
    mobileUp: `@media (min-width: 480px)`,
    tabletUp: `@media (min-width: 768px)`,
    desktopUp: `@media (min-width: 1024px)`,
  },
};

export default theme;
