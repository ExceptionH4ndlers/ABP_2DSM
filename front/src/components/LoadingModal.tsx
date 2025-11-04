import React from "react";
import styled, { keyframes } from "styled-components";
import { ClipLoader } from "react-spinners";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-in;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  min-width: 200px;
  max-width: 90vw;
`;

const LoadingMessage = styled.p`
  margin: 0;
  color: #374151;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

interface LoadingModalProps {
  isOpen: boolean;
  message?: string | null;
  size?: number;
  color?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message,
  size = 50,
  color = "#3b82f6",
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ClipLoader color={color} size={size} loading={isOpen} />
        {message && <LoadingMessage>{message}</LoadingMessage>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoadingModal;
