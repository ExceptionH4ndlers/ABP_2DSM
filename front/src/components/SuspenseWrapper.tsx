import React, { Suspense } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 1rem;
`;

const FallbackText = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`;

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children, fallback }) => {
  const defaultFallback = (
    <FallbackContainer>
      <ClipLoader color="#3b82f6" size={50} loading={true} />
      <FallbackText>Carregando...</FallbackText>
    </FallbackContainer>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
};

export default SuspenseWrapper;
