import { useState, useCallback } from "react";
import { simaCsvParser } from "../utils/csvParser";
import type { SimaData, CsvExportOptions } from "../utils/csvParser";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || `http://localhost:${import.meta.env.VITE_SERVER_PORT ?? "3001"}`;

type GenericRow = Record<string, unknown>;

function hasSimaShape(rows: unknown[]): rows is SimaData[] {
  if (!Array.isArray(rows) || rows.length === 0) return false;
  const first = rows[0] as Record<string, unknown>;
  return "idsima" in first && "idestacao" in first && "datahora" in first;
}

function isDateLike(value: unknown): value is string | number | Date {
  return typeof value === "string" || typeof value === "number" || value instanceof Date;
}

export interface UseCsvExportReturn {
  isExporting: boolean;
  exportError: string | null;
  exportCsv: (data: GenericRow[], filename?: string, options?: CsvExportOptions) => Promise<void>;
  generateCsvContent: (data: GenericRow[], options?: CsvExportOptions) => Promise<string>;
  validateData: (data: GenericRow[]) => { isValid: boolean; errors: string[] };
  clearError: () => void;
}

export const useCsvExport = (): UseCsvExportReturn => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setExportError(null);
  }, []);

  const exportCsv = useCallback(
    async (data: GenericRow[], filename?: string, options?: CsvExportOptions) => {
      try {
        setIsExporting(true);
        setExportError(null);

        let dataToExport = data as GenericRow[];
        const simaShape = hasSimaShape(dataToExport);

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

          if (simaShape) {
            const response = await fetch(`${API_BASE_URL}/sima/all?${queryParams}`);

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

        if (hasSimaShape(dataToExport)) {
          const validation = simaCsvParser.validateData(dataToExport);
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

        if (hasSimaShape(dataToExport)) {
          await simaCsvParser.downloadCsv(dataToExport, defaultFilename, defaultOptions);
        } else {
          // Genérico: aplica metadados, cabeçalhos, separador e encoding
          const keys = Object.keys((dataToExport[0] || {}) as GenericRow);

          const formatDate = (value: unknown): string => {
            if (!value) return "";
            if (!isDateLike(value)) return String(value);
            const d = new Date(value as string | number | Date);
            if (Number.isNaN(d.getTime())) return String(value);
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

          const escapeVal = (v: string) =>
            v.includes(",") || v.includes('"') || v.includes("\n")
              ? `"${v.replace(/"/g, '""')}"`
              : v;

          const lines: string[] = [];

          if (defaultOptions.incluirMetadados) {
            const hoje = new Date().toISOString();
            const filtros = (defaultOptions.filtros || {}) as Record<string, string>;
            const dataInicio = filtros.dataInicio || "";
            const dataFim = filtros.dataFim || "";
            const estacao = filtros.estacao || ""; // pode ser reservatório
            lines.push(`# METADADOS DO ARQUIVO CSV`);
            lines.push(`# Gerado em: ${hoje}`);
            if (dataInicio || dataFim) lines.push(`# Período: ${dataInicio} a ${dataFim}`);
            if (estacao) lines.push(`# Filtro: ${estacao}`);
            lines.push(`# Total de Registros: ${dataToExport.length}`);
            lines.push("#");
          }

          if (defaultOptions.incluirCabecalhos) {
            lines.push(keys.join(defaultOptions.separador));
          }

          (dataToExport as GenericRow[]).forEach((row) => {
            const vals = keys.map((k) => {
              const val = row[k as keyof GenericRow];
              const looksDate = typeof val === "string" && /\d{4}-\d{2}-\d{2}/.test(val.toString());
              const out = looksDate ? formatDate(val) : String(val ?? "");
              return escapeVal(out);
            });
            lines.push(vals.join(defaultOptions.separador));
          });

          const content = lines.join("\n");
          const blob = new Blob([content], {
            type:
              defaultOptions.encoding === "ISO-8859-1"
                ? "text/csv;charset=iso-8859-1"
                : "text/csv;charset=utf-8",
          });
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
    async (data: GenericRow[], options?: CsvExportOptions): Promise<string> => {
      try {
        setExportError(null);

        const simaShape = hasSimaShape(data);
        if (simaShape) {
          const validation = simaCsvParser.validateData(data);
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

        if (simaShape) {
          return await simaCsvParser.generateCsv(data as SimaData[], defaultOptions);
        }
        const keys = Object.keys((data[0] || {}) as GenericRow);
        const formatDate = (value: unknown): string => {
          if (!value) return "";
          if (!isDateLike(value)) return String(value);
          const d = new Date(value as string | number | Date);
          if (Number.isNaN(d.getTime())) return String(value);
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
        const escapeVal = (v: string) =>
          v.includes(",") || v.includes('"') || v.includes("\n") ? `"${v.replace(/"/g, '""')}"` : v;
        const lines: string[] = [];
        if (defaultOptions.incluirMetadados) {
          lines.push(`# METADADOS DO ARQUIVO CSV`);
          lines.push(`# Total de Registros: ${data.length}`);
          lines.push("#");
        }
        if (defaultOptions.incluirCabecalhos) {
          lines.push(keys.join(defaultOptions.separador));
        }
        (data as GenericRow[]).forEach((row) => {
          const vals = keys.map((k) => {
            const val = row[k as keyof GenericRow];
            const looksDate = typeof val === "string" && /\d{4}-\d{2}-\d{2}/.test(val.toString());
            const out = looksDate ? formatDate(val) : String(val ?? "");
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

  const validateData = useCallback((data: GenericRow[]) => {
    if (hasSimaShape(data)) {
      return simaCsvParser.validateData(data);
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
