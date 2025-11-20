/**
 * Classe utilitária para validar e sanitizar dados de filtro no lado do servidor.
 *
 * Objetivo: Garantir a segurança (sanitização de inputs) e a integridade da consulta.
 * US13 (Performance) | TP-123
 */

// Define uma estrutura padrão para o resultado da validação no backend
interface ValidationResult<T> {
  isValid: boolean;
  sanitizedValue?: T;
  error?: string;
}

export class FilterValidator {
  private static readonly MAX_COORDINATE_VALUE = 90;
  private static readonly MAX_VALUE_LENGTH = 255;

  /**
   * Sanitiza e valida strings (IDs, rótulos, nomes de colunas).
   * No backend, o foco é na sanitização contra SQL Injection e limites.
   * @param input A string de entrada.
   * @param fieldName Nome do campo para mensagens de erro.
   * @param maxLen O comprimento máximo permitido.
   * @returns Resultado da validação com o valor sanitizado ou erro.
   */
  public static validateAndSanitizeString(
    input: string | null | undefined,
    fieldName: string,
    maxLen: number = FilterValidator.MAX_VALUE_LENGTH,
  ): ValidationResult<string> {
    if (input === null || input === undefined || input.trim() === "") {
      return { isValid: true, sanitizedValue: undefined };
    }

    let sanitized = input.trim();

    // 1. Limite de comprimento
    if (sanitized.length > maxLen) {
      return { isValid: false, error: `${fieldName} excede o limite de ${maxLen} caracteres.` };
    }

    // 2. Sanitização contra injeção SQL
    // Remove caracteres que podem quebrar a query ou causar injeção.
    // Se estiver usando um ORM, esta sanitização pode ser menos agressiva, mas é crucial para consultas diretas.
    sanitized = sanitized
      .replace(/[\n\r\t]/g, " ") // Remove quebras de linha/tabs
      .replace(/['";]/g, ""); // Remove aspas simples/duplas e ponto e vírgula

    // 3. Verifica se o valor sanitizado ficou vazio após a limpeza
    if (sanitized === "") {
      return {
        isValid: false,
        error: `${fieldName} contém apenas caracteres inválidos ou perigosos.`,
      };
    }

    return { isValid: true, sanitizedValue: sanitized };
  }

  /**
   * Valida um range de datas e garante que elas são objetos Date válidos.
   * @param startDateInput Data de início.
   * @param endDateInput Data de fim.
   * @param fieldName Nome do campo.
   * @returns Resultado da validação com as datas sanitizadas.
   */
  public static validateDateRange(
    startDateInput: string | Date | null | undefined,
    endDateInput: string | Date | null | undefined,
    fieldName: string,
  ): ValidationResult<{ start: Date; end: Date }> {
    if (!startDateInput || !endDateInput) {
      // Se um dos campos está faltando, a query não deve aplicar o filtro de data.
      return { isValid: true, sanitizedValue: undefined };
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    // Validação de formato (é uma data válida?)
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return {
        isValid: false,
        error: `Pelo menos uma das datas do campo ${fieldName} é inválida.`,
      };
    }

    // Validação de ordem (start <= end)
    if (startDate.getTime() > endDate.getTime()) {
      return {
        isValid: false,
        error: `A Data Inicial de ${fieldName} não pode ser posterior à Data Final.`,
      };
    }

    return { isValid: true, sanitizedValue: { start: startDate, end: endDate } };
  }

  /**
   * Valida um valor numérico e opcionalmente verifica se está dentro de um range.
   * @param input O valor a ser validado.
   * @param fieldName Nome do campo para erro.
   * @param min Valor mínimo opcional.
   * @param max Valor máximo opcional.
   * @returns Resultado da validação com o valor numérico sanitizado.
   */
  public static validateNumericValue(
    input: string | number | null | undefined,
    fieldName: string,
    min?: number,
    max?: number,
  ): ValidationResult<number> {
    if (input === null || input === undefined || input === "") {
      return { isValid: true, sanitizedValue: undefined };
    }

    const num = typeof input === "string" ? parseFloat(input) : input;

    // Validação de tipo
    if (isNaN(num)) {
      return { isValid: false, error: `${fieldName} deve ser um número válido.` };
    }

    // Validação de range (Min)
    if (min !== undefined && num < min) {
      return { isValid: false, error: `${fieldName} não pode ser inferior a ${min}.` };
    }

    // Validação de range (Max)
    if (max !== undefined && num > max) {
      return { isValid: false, error: `${fieldName} não pode ser superior a ${max}.` };
    }

    return { isValid: true, sanitizedValue: num };
  }

  /**
   * Valida se um range numérico (min/max) é válido e consistente (min <= max).
   * @param minInput O valor mínimo (pode ser string ou number).
   * @param maxInput O valor máximo (pode ser string ou number).
   * @param fieldName Nome do campo para erro.
   * @returns Resultado da validação com o range numérico sanitizado.
   */
  public static validateNumericRange(
    minInput: string | number | null | undefined,
    maxInput: string | number | null | undefined,
    fieldName: string,
  ): ValidationResult<{ min?: number; max?: number }> {
    const minResult = this.validateNumericValue(minInput, `${fieldName} (Min)`);
    const maxResult = this.validateNumericValue(maxInput, `${fieldName} (Max)`);

    if (!minResult.isValid) return { isValid: false, error: minResult.error };
    if (!maxResult.isValid) return { isValid: false, error: maxResult.error };

    const min = minResult.sanitizedValue;
    const max = maxResult.sanitizedValue;

    if (min !== undefined && max !== undefined && min > max) {
      return {
        isValid: false,
        error: `O valor mínimo de ${fieldName} não pode ser superior ao valor máximo.`,
      };
    }

    if (min === undefined && max === undefined) {
      return { isValid: true, sanitizedValue: undefined };
    }

    return { isValid: true, sanitizedValue: { min, max } };
  }

  /**
   * Valida as coordenadas geográficas (Lat/Lng) e garante que estão no formato numérico e range geográfico.
   * @param lat Latitude.
   * @param lng Longitude.
   * @returns Resultado da validação com as coordenadas sanitizadas.
   */
  public static validateCoordinates(
    lat: string | number | null | undefined,
    lng: string | number | null | undefined,
  ): ValidationResult<{ lat: number; lng: number }> {
    const latResult = this.validateNumericValue(
      lat,
      "Latitude",
      -this.MAX_COORDINATE_VALUE,
      this.MAX_COORDINATE_VALUE,
    );
    const lngResult = this.validateNumericValue(lng, "Longitude", -180, 180);

    if (latResult.sanitizedValue === undefined || lngResult.sanitizedValue === undefined) {
      return { isValid: true, sanitizedValue: undefined };
    }

    if (!latResult.isValid) return { isValid: false, error: latResult.error };
    if (!lngResult.isValid) return { isValid: false, error: lngResult.error };

    // Ambos devem existir se for para aplicar o filtro.
    if (latResult.sanitizedValue === undefined || lngResult.sanitizedValue === undefined) {
      return {
        isValid: false,
        error:
          "Ambas as coordenadas (Latitude e Longitude) devem ser fornecidas para um filtro de coordenada.",
      };
    }

    return {
      isValid: true,
      sanitizedValue: { lat: latResult.sanitizedValue, lng: lngResult.sanitizedValue },
    };
  }
}
