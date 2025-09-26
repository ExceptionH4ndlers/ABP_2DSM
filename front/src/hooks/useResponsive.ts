import React from "react";

// Configurações específicas para dispositivos móveis
export const mobileConfig = {
  // Breakpoints
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },

  // Tamanhos de fonte responsivos
  fontSizes: {
    mobile: {
      small: "0.75rem",
      medium: "0.875rem",
      large: "1rem",
      xlarge: "1.25rem",
    },
    desktop: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
      xlarge: "1.5rem",
    },
  },

  // Espaçamentos responsivos
  spacing: {
    mobile: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem",
    },
    desktop: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
  },

  // Configurações de toque
  touch: {
    minSize: "44px", // Tamanho mínimo recomendado para elementos tocáveis
    activeOpacity: 0.7, // Opacidade quando pressionado
  },

  // Configurações de scroll
  scroll: {
    smooth: true,
    momentum: true, // Scroll com momentum no iOS
  },

  // Configurações de viewport
  viewport: {
    preventZoom: true, // Previne zoom em inputs
    userScalable: false,
  },
};

// Utilitários para detectar dispositivos móveis
export const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

export const isTablet = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1024;
};

// Hook para detectar mudanças de tamanho de tela
export const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState({
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
