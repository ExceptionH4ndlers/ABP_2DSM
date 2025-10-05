import React from "react";
import styled from "styled-components";
import { Download } from "lucide-react";

interface ExportButtonProps {
  data?: unknown[];
  filename?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  onClick: () => void;
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

export const ExportCsvButton: React.FC<ExportButtonProps> = ({
  data,
  filename,
  variant = "primary",
  size = "medium",
  disabled = false,
  className,
  onClick,
}) => {
  return (
    <StyledButton
      $variant={variant || "primary"}
      $size={size || "medium"}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <Download size={size === "small" ? 14 : size === "large" ? 20 : 16} />
      Exportar CSV
    </StyledButton>
  );
};
