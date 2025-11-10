// styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      background: string;
      backgroundImage: string;
      text: {
        base: string;
        inverse: string;
        muted: string;
      };
      card: {
        background: string;
        border: string;
        shadow: string;
      };
    };
    fonts: {
      body: string;
      size: {
        small: string;
        medium: string;
        large: string;
      };
      weight: {
        normal: number;
        bold: number;
      };
    };
    spacing: (factor: number) => string;
    borderRadius: string;
    shadows: {
      small: string;
      medium: string;
    };
    breakpoints: {
      base: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    media: {
      baseOnly: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      smOnly: string;
      mdOnly: string;
      lgOnly: string;
      smDown: string;
      mdDown: string;
      lgDown: string;
      xlDown: string;
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
      mobileUp: string;
      tabletUp: string;
      desktopUp: string;
    };
  }
}

export {};
