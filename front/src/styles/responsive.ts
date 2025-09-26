// Utilitários de responsividade para o projeto SIMA
import { css } from "styled-components";

// Mixins para breakpoints responsivos
export const mobile = (styles: any) => css`
  @media (max-width: 479px) {
    ${styles}
  }
`;

export const tablet = (styles: any) => css`
  @media (min-width: 480px) and (max-width: 767px) {
    ${styles}
  }
`;

export const desktop = (styles: any) => css`
  @media (min-width: 768px) and (max-width: 1023px) {
    ${styles}
  }
`;

export const wide = (styles: any) => css`
  @media (min-width: 1024px) {
    ${styles}
  }
`;

export const mobileUp = (styles: any) => css`
  @media (min-width: 480px) {
    ${styles}
  }
`;

export const tabletUp = (styles: any) => css`
  @media (min-width: 768px) {
    ${styles}
  }
`;

export const desktopUp = (styles: any) => css`
  @media (min-width: 1024px) {
    ${styles}
  }
`;

// Mixins para elementos responsivos comuns
export const responsivePadding = css`
  padding: 2rem;
  
  ${mobile`
    padding: 1rem;
  `}
`;

export const responsiveMargin = css`
  margin: 2rem 0;
  
  ${mobile`
    margin: 1rem 0;
  `}
`;

export const responsiveFontSize = css`
  font-size: 1rem;
  
  ${mobile`
    font-size: 0.875rem;
  `}
`;

export const responsiveBorderRadius = css`
  border-radius: 20px;
  
  ${mobile`
    border-radius: 16px;
  `}
`;

export const responsiveGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  ${mobile`
    grid-template-columns: 1fr;
    gap: 1rem;
  `}
`;

export const responsiveFlex = css`
  display: flex;
  gap: 1rem;
  
  ${mobile`
    flex-direction: column;
    gap: 0.75rem;
  `}
`;

// Mixins para melhorar a experiência em dispositivos móveis
export const touchFriendly = css`
  min-height: 44px;
  min-width: 44px;
  
  ${mobile`
    min-height: 48px;
    min-width: 48px;
  `}
`;

export const mobileOptimized = css`
  ${mobile`
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
  
  ${mobile`
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  `}
`;
