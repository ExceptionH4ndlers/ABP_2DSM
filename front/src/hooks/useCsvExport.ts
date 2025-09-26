import { useState, useCallback } from "react";
import { simaCsvParser } from "../utils/csvParser";
import type { SimaData, CsvExportOptions } from "../utils/csvParser";

export interface UseCsvExportReturn {
  isExporting: boolean;
  exportError: string | null;
  exportCsv: (data: SimaData[], filename?: string, options?: CsvExportOptions) => Promise<void>;
  generateCsvContent: (data: SimaData[], options?: CsvExportOptions) => Promise<string>;
  validateData: (data: SimaData[]) => { isValid: boolean; errors: string[] };
  clearError: () => void;
}

export const useCsvExport = (): UseCsvExportReturn => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setExportError(null);
  }, []);

  const exportCsv = useCallback(
    async (data: SimaData[], filename?: string, options?: CsvExportOptions) => {
      try {
        setIsExporting(true);
        setExportError(null);

        // Validar dados antes da exportação
        const validation = simaCsvParser.validateData(data);
        if (!validation.isValid) {
          throw new Error(`Dados inválidos: ${validation.errors.join(", ")}`);
        }

        // Gerar nome do arquivo se não fornecido
        const defaultFilename =
          filename || `dados_sima_${new Date().toISOString().split("T")[0]}.csv`;

        // Configurações padrão
        const defaultOptions: CsvExportOptions = {
          incluirMetadados: true,
          incluirCabecalhos: true,
          formatoData: "BR",
          separador: ";",
          encoding: "UTF-8",
          ...options,
        };

        await simaCsvParser.downloadCsv(data, defaultFilename, defaultOptions);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido na exportação";
        setExportError(errorMessage);
        console.error("Erro na exportação CSV:", error);
      } finally {
        setIsExporting(false);
      }
    },
    [],
  );

  const generateCsvContent = useCallback(
    async (data: SimaData[], options?: CsvExportOptions): Promise<string> => {
      try {
        setExportError(null);

        // Validar dados
        const validation = simaCsvParser.validateData(data);
        if (!validation.isValid) {
          throw new Error(`Dados inválidos: ${validation.errors.join(", ")}`);
        }

        // Configurações padrão
        const defaultOptions: CsvExportOptions = {
          incluirMetadados: true,
          incluirCabecalhos: true,
          formatoData: "BR",
          separador: ";",
          encoding: "UTF-8",
          ...options,
        };

        return await simaCsvParser.generateCsv(data, defaultOptions);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido na geração";
        setExportError(errorMessage);
        throw error;
      }
    },
    [],
  );

  const validateData = useCallback((data: SimaData[]) => {
    return simaCsvParser.validateData(data);
  }, []);

  return {
    isExporting,
    exportError,
    exportCsv,
    generateCsvContent,
    validateData,
    clearError,
  };
};
