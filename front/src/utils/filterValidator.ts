/**
 * Classe utilitária para validar e sanitizar dados de filtro no lado do cliente
 * antes de enviar a requisição para o backend.
 *
 * Objetivo: Evitar requisições inválidas e fornecer feedback imediato ao usuário.
 * US13 (Performance) | TP-123
 */
export class FilterValidator {
  private static readonly MAX_COORDINATE_VALUE = 90; // Latitude máxima
  private static readonly MAX_VALUE_LENGTH = 255; // Tamanho máximo para strings de ID/rótulo

  /**
   * Valida se uma string representa um ID ou rótulo aceitável.
   * @param input A string de entrada (ID, rótulo, nome, etc.).
   * @param allowEmpty Permite que o valor seja uma string vazia.
   * @returns Um objeto com status de sucesso e, se falha, uma mensagem de erro.
   */
  public static validateIdOrLabel(
    input: string | null | undefined,
    allowEmpty: boolean = true,
  ): { success: boolean; message?: string } {
    if (input === null || input === undefined) {
      return { success: true }; // Trata como válido se for nulo/indefinido
    }

    const trimmedInput = input.trim();

    if (trimmedInput === "" && !allowEmpty) {
      return { success: false, message: "O campo não pode ser vazio." };
    }

    if (trimmedInput.length > this.MAX_VALUE_LENGTH) {
      return {
        success: false,
        message: `O valor excede o limite de ${this.MAX_VALUE_LENGTH} caracteres.`,
      };
    }

    // Sanitização básica: Impede caracteres que possam indicar injeção SQL ou XSS no frontend (embora o backend faça a sanitização real)
    const dangerousChars = /[;\\'"]/;
    if (dangerousChars.test(trimmedInput)) {
      return { success: false, message: "O valor contém caracteres inválidos (;, ', \")." };
    }

    return { success: true };
  }

  /**
   * Valida se o range de datas é válido (data de início <= data de fim).
   * Assume-se que as datas já são objetos Date ou strings ISO válidas.
   * @param startDate A data inicial do range.
   * @param endDate A data final do range.
   * @returns Um objeto com status de sucesso e mensagem de erro.
   */
  public static validateDateRange(
    startDate: string | Date | null | undefined,
    endDate: string | Date | null | undefined,
  ): { success: boolean; message?: string } {
    if (!startDate || !endDate) {
      // Se um dos campos está faltando, a validação de formato deve tratar isso.
      // Aqui, apenas validamos a ordem se ambos existirem.
      return { success: true };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { success: false, message: "Uma ou ambas as datas são inválidas." };
    }

    if (start.getTime() > end.getTime()) {
      return { success: false, message: "A Data Inicial não pode ser posterior à Data Final." };
    }

    return { success: true };
  }

  /**
   * Valida se um valor é um número válido e está dentro de um range opcional.
   * @param input O valor a ser validado (pode vir como string de um input).
   * @param min O valor mínimo aceitável (inclusivo).
   * @param max O valor máximo aceitável (inclusivo).
   * @returns Um objeto com status de sucesso e mensagem de erro.
   */
  public static validateNumericValue(
    input: string | number | null | undefined,
    min?: number,
    max?: number,
  ): { success: boolean; message?: string } {
    if (input === null || input === undefined || input === "") {
      return { success: true };
    }

    const num = typeof input === "string" ? parseFloat(input) : input;

    if (isNaN(num)) {
      return { success: false, message: "O valor deve ser um número válido." };
    }

    if (min !== undefined && num < min) {
      return { success: false, message: `O valor não pode ser inferior a ${min}.` };
    }

    if (max !== undefined && num > max) {
      return { success: false, message: `O valor não pode ser superior a ${max}.` };
    }

    return { success: true };
  }

  /**
   * Valida se um range numérico é válido (min <= max).
   * @param minInput O valor mínimo (pode ser string ou number).
   * @param maxInput O valor máximo (pode ser string ou number).
   * @returns Um objeto com status de sucesso e mensagem de erro.
   */
  public static validateNumericRange(
    minInput: string | number | null | undefined,
    maxInput: string | number | null | undefined,
  ): { success: boolean; message?: string } {
    const min =
      minInput === null || minInput === undefined || minInput === ""
        ? undefined
        : parseFloat(minInput.toString());
    const max =
      maxInput === null || maxInput === undefined || maxInput === ""
        ? undefined
        : parseFloat(maxInput.toString());

    // Garante que ambos são números se existirem
    if (min !== undefined && isNaN(min)) {
      return { success: false, message: "O valor mínimo não é um número válido." };
    }
    if (max !== undefined && isNaN(max)) {
      return { success: false, message: "O valor máximo não é um número válido." };
    }

    if (min !== undefined && max !== undefined && min > max) {
      return { success: false, message: "O valor mínimo não pode ser superior ao valor máximo." };
    }

    return { success: true };
  }

  /**
   * Valida se as coordenadas de latitude e longitude estão dentro dos ranges esperados.
   * @param lat Latitude.
   * @param lng Longitude.
   * @returns Um objeto com status de sucesso e mensagem de erro.
   */
  public static validateCoordinates(
    lat: string | number | null | undefined,
    lng: string | number | null | undefined,
  ): { success: boolean; message?: string } {
    if (
      lat === null ||
      lat === undefined ||
      lat === "" ||
      lng === null ||
      lng === undefined ||
      lng === ""
    ) {
      return { success: true }; // Ignora se estiver incompleto, a menos que seja mandatório
    }

    const latNum = typeof lat === "string" ? parseFloat(lat) : lat;
    const lngNum = typeof lng === "string" ? parseFloat(lng) : lng;

    if (isNaN(latNum) || isNaN(lngNum)) {
      return { success: false, message: "Latitude e Longitude devem ser números válidos." };
    }

    // Validação padrão para Latitude (-90 a 90)
    if (latNum < -this.MAX_COORDINATE_VALUE || latNum > this.MAX_COORDINATE_VALUE) {
      return {
        success: false,
        message: `A Latitude deve estar entre -${this.MAX_COORDINATE_VALUE} e ${this.MAX_COORDINATE_VALUE}.`,
      };
    }

    // Validação padrão para Longitude (-180 a 180)
    if (lngNum < -180 || lngNum > 180) {
      return { success: false, message: "A Longitude deve estar entre -180 e 180." };
    }

    return { success: true };
  }

  /**
   * Tenta converter o input para um inteiro (para uso com IDs).
   * @param input O valor de entrada.
   * @returns O número inteiro ou null se não for um inteiro válido.
   */
  public static sanitizeInteger(input: string | number | null | undefined): number | null {
    if (input === null || input === undefined || input === "") {
      return null;
    }
    const num = parseFloat(input.toString());
    if (isNaN(num) || num !== Math.floor(num)) {
      return null; // Não é um inteiro válido
    }
    return Math.floor(num);
  }
}
