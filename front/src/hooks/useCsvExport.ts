import { useState, useCallback } from "react";
import { simaCsvParser } from "../utils/csvParser";
import type { SimaData, CsvExportOptions } from "../utils/csvParser";

export interface UseCsvExportReturn {
  isExporting: boolean;
  exportError: string | null;
  exportCsv: (data: any[], filename?: string, options?: CsvExportOptions) => Promise<void>;
  generateCsvContent: (data: any[], options?: CsvExportOptions) => Promise<string>;
  validateData: (data: any[]) => { isValid: boolean; errors: string[] };
  clearError: () => void;
}

export const useCsvExport = (): UseCsvExportReturn => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setExportError(null);
  }, []);

  const exportCsv = useCallback(
    async (data: any[], filename?: string, options?: CsvExportOptions) => {
      try {
        setIsExporting(true);
        setExportError(null);

        let dataToExport = data;
        const isSimaShape = Array.isArray(dataToExport) && dataToExport[0] && (dataToExport[0] as any).idsima !== undefined;

        // Se há filtros no modal, sempre buscar dados da API (ignorar dados da tabela)
        if (
          options?.filtros &&
          (options.filtros.dataInicio || options.filtros.dataFim || options.filtros.estacao)
        ) {
          const queryParams = new URLSearchParams();

          if (options.filtros.dataInicio) {
            queryParams.append("startDate", options.filtros.dataInicio);
          }
          if (options.filtros.dataFim) {
            queryParams.append("endDate", options.filtros.dataFim);
          }
          if (options.filtros.estacao) {
            queryParams.append("estacao", options.filtros.estacao);
          }

          // Buscar muitos registros para exportação
          queryParams.append("page", "1");
          queryParams.append("limit", "10000");

          if (isSimaShape) {
            const response = await fetch(`http://localhost:3001/sima/all?${queryParams}`);

            if (response.ok) {
              const result = await response.json();
              if (result.success && result.data) {
                dataToExport = result.data;
              }
            }
          }
        }

        // Validar dados antes da exportação
        if (dataToExport.length === 0) {
          throw new Error(
            "Nenhum dado encontrado para exportação. Verifique os filtros ou carregue dados na tabela.",
          );
        }

        if (isSimaShape) {
          const validation = simaCsvParser.validateData(dataToExport as SimaData[]);
          if (!validation.isValid) {
            throw new Error(`Dados inválidos: ${validation.errors.join(", ")}`);
          }
        }

        // Gerar nome do arquivo se não fornecido
        const defaultFilename = filename || `dados_${new Date().toISOString().split("T")[0]}.csv`;

        // Configurações padrão
        const defaultOptions: CsvExportOptions = {
          incluirMetadados: true,
          incluirCabecalhos: true,
          formatoData: "BR",
          separador: ";",
          encoding: "UTF-8",
          ...options,
        };

        if (isSimaShape) {
          await simaCsvParser.downloadCsv(dataToExport as SimaData[], defaultFilename, defaultOptions);
        } else {
          // Genérico: aplica metadados, cabeçalhos, separador e encoding
          const keys = Object.keys(dataToExport[0] || {});

          const formatDate = (value: any): string => {
            if (!value) return "";
            const d = new Date(value);
            if (isNaN(d.getTime())) return String(value);
            switch (defaultOptions.formatoData) {
              case "BR":
                return d.toLocaleString("pt-BR");
              case "US":
                return d.toLocaleString("en-US");
              case "ISO":
              default:
                return d.toISOString();
            }
          };

          const escapeVal = (v: string) => (v.includes(",") || v.includes('"') || v.includes("\n") ? `"${v.replace(/"/g, '""')}"` : v);

          const lines: string[] = [];

          if (defaultOptions.incluirMetadados) {
            const hoje = new Date().toISOString();
            const dataInicio = (defaultOptions.filtros as any)?.dataInicio || "";
            const dataFim = (defaultOptions.filtros as any)?.dataFim || "";
            const estacao = (defaultOptions.filtros as any)?.estacao || ""; // pode ser reservatório
            lines.push(`# METADADOS DO ARQUIVO CSV`);
            lines.push(`# Gerado em: ${hoje}`);
            if (dataInicio || dataFim) lines.push(`# Período: ${dataInicio} a ${dataFim}`);
            if (estacao) lines.push(`# Filtro: ${estacao}`);
            lines.push(`# Total de Registros: ${(dataToExport as any[]).length}`);
            lines.push("#");
          }

          if (defaultOptions.incluirCabecalhos) {
            lines.push(keys.join(defaultOptions.separador));
          }

          (dataToExport as any[]).forEach((row) => {
            const vals = keys.map((k) => {
              const val = (row as any)[k];
              const isDateLike = typeof val === "string" && /\d{4}-\d{2}-\d{2}/.test(val.toString());
              const out = isDateLike ? formatDate(val) : String(val ?? "");
              return escapeVal(out);
            });
            lines.push(vals.join(defaultOptions.separador));
          });

          const content = lines.join("\n");
          const blob = new Blob([content], { type: defaultOptions.encoding === "ISO-8859-1" ? "text/csv;charset=iso-8859-1" : "text/csv;charset=utf-8" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = defaultFilename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }
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
    async (data: any[], options?: CsvExportOptions): Promise<string> => {
      try {
        setExportError(null);

        const isSimaShape = Array.isArray(data) && data[0] && (data[0] as any).idsima !== undefined;
        if (isSimaShape) {
          const validation = simaCsvParser.validateData(data as SimaData[]);
          if (!validation.isValid) {
            throw new Error(`Dados inválidos: ${validation.errors.join(", ")}`);
          }
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

        if (isSimaShape) {
          return await simaCsvParser.generateCsv(data as SimaData[], defaultOptions);
        }
        const keys = Object.keys(data[0] || {});
        const formatDate = (value: any): string => {
          if (!value) return "";
          const d = new Date(value);
          if (isNaN(d.getTime())) return String(value);
          switch (defaultOptions.formatoData) {
            case "BR":
              return d.toLocaleString("pt-BR");
            case "US":
              return d.toLocaleString("en-US");
            case "ISO":
            default:
              return d.toISOString();
          }
        };
        const escapeVal = (v: string) => (v.includes(",") || v.includes('"') || v.includes("\n") ? `"${v.replace(/"/g, '""')}"` : v);
        const lines: string[] = [];
        if (defaultOptions.incluirMetadados) {
          lines.push(`# METADADOS DO ARQUIVO CSV`);
          lines.push(`# Total de Registros: ${(data as any[]).length}`);
          lines.push("#");
        }
        if (defaultOptions.incluirCabecalhos) {
          lines.push(keys.join(defaultOptions.separador));
        }
        (data as any[]).forEach((row) => {
          const vals = keys.map((k) => {
            const val = (row as any)[k];
            const isDateLike = typeof val === "string" && /\d{4}-\d{2}-\d{2}/.test(val.toString());
            const out = isDateLike ? formatDate(val) : String(val ?? "");
            return escapeVal(out);
          });
          lines.push(vals.join(defaultOptions.separador));
        });
        return lines.join("\n");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido na geração";
        setExportError(errorMessage);
        throw error;
      }
    },
    [],
  );

  const validateData = useCallback((data: any[]) => {
    const isSimaShape = Array.isArray(data) && data[0] && (data[0] as any).idsima !== undefined;
    if (isSimaShape) {
      return simaCsvParser.validateData(data as SimaData[]);
    }
    return { isValid: true, errors: [] };
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
