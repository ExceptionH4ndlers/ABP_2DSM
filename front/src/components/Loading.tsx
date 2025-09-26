import React from "react";
import styled, { keyframes } from "styled-components";

// Animação de loading
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Componentes estilizados
const LoadingContainer = styled.div<{ size?: "small" | "medium" | "large" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;

  ${({ size }) => {
    switch (size) {
      case "small":
        return "padding: 1rem; gap: 0.5rem;";
      case "large":
        return "padding: 3rem; gap: 1.5rem;";
      default:
        return "padding: 2rem; gap: 1rem;";
    }
  }}
`;

const Spinner = styled.div<{ size?: "small" | "medium" | "large" }>`
  border: 3px solid rgba(30, 64, 175, 0.1);
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  ${({ size }) => {
    switch (size) {
      case "small":
        return "width: 24px; height: 24px; border-width: 2px;";
      case "large":
        return "width: 48px; height: 48px; border-width: 4px;";
      default:
        return "width: 32px; height: 32px; border-width: 3px;";
    }
  }}
`;

const LoadingText = styled.p<{ size?: "small" | "medium" | "large" }>`
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: 500;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;

  ${({ size }) => {
    switch (size) {
      case "small":
        return "font-size: 0.75rem;";
      case "large":
        return "font-size: 1.125rem;";
      default:
        return "font-size: 0.875rem;";
    }
  }}
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const Dot = styled.div<{ delay: number }>`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

// Componente principal
interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  showDots?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = "medium",
  text = "Carregando...",
  showDots = false,
}) => {
  return (
    <LoadingContainer size={size}>
      <Spinner size={size} />
      <LoadingText size={size}>{text}</LoadingText>
      {showDots && (
        <DotsContainer>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </DotsContainer>
      )}
    </LoadingContainer>
  );
};

// Componente de loading para páginas inteiras
const PageLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
`;

// Componente de loading para cards
const CardLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.card.border};

  ${({ theme }) => theme.media.mobile} {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

// Componente de skeleton loading
const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "1rem"};
`;

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.card.border};

  ${({ theme }) => theme.media.mobile} {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const SkeletonLoading: React.FC = () => (
  <SkeletonCard>
    <SkeletonContainer>
      <SkeletonLine height="1.5rem" width="60%" />
      <SkeletonLine height="1rem" />
      <SkeletonLine height="1rem" width="80%" />
      <SkeletonLine height="2rem" width="40%" />
    </SkeletonContainer>
  </SkeletonCard>
);

export const PageLoadingComponent: React.FC<{ text?: string }> = ({ text }) => (
  <PageLoading>
    <Loading size="large" text={text} showDots />
  </PageLoading>
);

export const CardLoadingComponent: React.FC<{ text?: string }> = ({ text }) => (
  <CardLoading>
    <Loading size="medium" text={text} />
  </CardLoading>
);

export default Loading;
