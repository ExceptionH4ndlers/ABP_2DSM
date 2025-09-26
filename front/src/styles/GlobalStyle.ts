import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }) => theme.colors.backgroundImage};
    color: ${({ theme }) => theme.colors.text.base};
    font-family: ${({ theme }) => theme.fonts.body};
    font-smooth: antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  * {
    box-sizing: border-box;
  }

  /* Prevenir overflow horizontal */
  *, *::before, *::after {
    max-width: 100%;
  }

  /* Melhorias para dispositivos móveis */
  @media (max-width: 479px) {
    body {
      font-size: 14px;
    }
    
    /* Evitar zoom em inputs no iOS */
    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="date"],
    textarea,
    select {
      font-size: 16px;
    }
  }

  /* Melhorias de UX mobile */
  @media (max-width: 768px) {
    /* Feedback visual para toques */
    button, a, [role="button"] {
      transition: all 0.2s ease;
    }
    
    button:active, a:active, [role="button"]:active {
      transform: scale(0.98);
      opacity: 0.8;
    }
    
    /* Scroll suave */
    html {
      scroll-behavior: smooth;
    }
    
    /* Melhor contraste para textos */
    p, span, div {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  /* Melhorias de acessibilidade */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Prevenir seleção de texto em elementos interativos */
  button, a {
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyle;
