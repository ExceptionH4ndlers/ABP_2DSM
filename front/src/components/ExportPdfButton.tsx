import React from "react";
import styled from "styled-components";
import { FileDown } from "lucide-react";
import { exportChartToPDF } from "../utils/exportToPdf";

interface ExportPdfButtonProps {
  targetId: string; // id do container a exportar
  fileName: string; // nome base do PDF
  onClick?: () => void; // callback opcional
  disabled?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
}


const StyledButton = styled.button<{ $variant: string; $size: string }>`
  background: ${({ $variant }) => {
    switch ($variant) {
      case "secondary":
        return "white";
      case "outline":
        return "transparent";
      default:
        return "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)";
    }
  }};
  border: ${({ $variant }) => {
    switch ($variant) {
      case "secondary":
        return "1px solid #9ca3af";
      case "outline":
        return "1px solid #0ea5e9";
      default:
        return "none";
    }
  }};
  border-radius: 8px;
  padding: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "0.5rem 1rem";
      case "large":
        return "1rem 2rem";
      default:
        return "0.8rem 1.5rem";
    }
  }};
  color: ${({ $variant }) => {
    switch ($variant) {
      case "secondary":
        return "#374151";
      case "outline":
        return "#0ea5e9";
      default:
        return "white";
    }
  }};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "0.8rem";
      case "large":
        return "1.1rem";
      default:
        return "0.9rem";
    }
  }};
  flex: 1;
  min-width: 150px;

  &:hover:not(:disabled) {
    background: ${({ $variant }) => {
      switch ($variant) {
        case "secondary":
          return "#f9fafb";
        case "outline":
          return "#0ea5e9";
        default:
          return "linear-gradient(135deg, #0369a1 0%, #075985 100%)";
      }
    }};
    color: ${({ $variant }) => {
      switch ($variant) {
        case "outline":
          return "white";
        default:
          return "inherit";
      }
    }};
    border-color: ${({ $variant }) => {
      switch ($variant) {
        case "secondary":
          return "#6b7280";
        case "outline":
          return "#0369a1";
        default:
          return "inherit";
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({
  targetId,
  fileName,
  onClick,
  disabled = false,
  label = "Exportar PDF",
  variant = "primary",
  size = "medium",
  className,
}) => {
  const handleClick = async () => {
    if (onClick) onClick();
    await exportChartToPDF(targetId, fileName);
  };

  return (
    <StyledButton
      onClick={handleClick}
      disabled={disabled}
      className={className}
      $variant={variant}
      $size={size}
      style={{
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <FileDown size={size === "small" ? 14 : size === "large" ? 20 : 16} />
      {label}
    </StyledButton>
  );
};

export default ExportPdfButton;
