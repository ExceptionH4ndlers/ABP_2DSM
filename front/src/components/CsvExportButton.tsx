import React, { useState } from "react";
import styled from "styled-components";
import { Download } from "lucide-react";
import { CsvExportModal } from "./CsvExportModal";
import type { SimaData } from "../utils/csvParser";

interface ExportButtonProps {
  data: SimaData[];
  filename?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
}

const StyledButton = styled.button<{ variant: string; size: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background: #1e40af;
          color: white;
          
          &:hover:not(:disabled) {
            background: #1e3a8a;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
          }
        `;
      case "outline":
        return `
          background: transparent;
          color: #1e40af;
          border: 1px solid #1e40af;
          
          &:hover:not(:disabled) {
            background: #1e40af;
            color: white;
            transform: translateY(-1px);
          }
        `;
      case "secondary":
      default:
        return `
          background: ${({ theme }) => theme.colors.background.secondary};
          color: ${({ theme }) => theme.colors.text.base};
          border: 1px solid ${({ theme }) => theme.colors.border};
          
          &:hover:not(:disabled) {
            background: ${({ theme }) => theme.colors.background.primary};
            transform: translateY(-1px);
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        `;
      case "large":
        return `
          padding: 1rem 1.5rem;
          font-size: 1.125rem;
        `;
      case "medium":
      default:
        return `
          padding: 0.75rem 1rem;
          font-size: 1rem;
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
`;

export const CsvExportButton: React.FC<ExportButtonProps> = ({
  data,
  filename,
  variant = "primary",
  size = "medium",
  disabled = false,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (data && data.length > 0) {
      setIsModalOpen(true);
    } else {
      alert(
        "Nenhum dado disponível para exportação. Verifique se os dados foram carregados corretamente.",
      );
    }
  };

  return (
    <>
      <StyledButton
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={disabled}
        className={className}
        style={{
          opacity: !data || data.length === 0 ? 0.7 : 1,
          cursor: !data || data.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        <Download size={size === "small" ? 14 : size === "large" ? 20 : 16} />
        Exportar CSV
        {(!data || data.length === 0) && (
          <span style={{ fontSize: "0.8em", opacity: 0.8 }}>(Sem dados)</span>
        )}
      </StyledButton>

      <CsvExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
        defaultFilename={filename}
      />
    </>
  );
};
