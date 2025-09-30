// CSV Parser para dados SIMA
// Responsável por estruturar os dados vindos do banco e incluir informações adicionais relevantes

export interface SimaData {
  idsima: number;
  idestacao: string;
  datahora: string;
  regno?: number;
  nofsamples?: number;
  proamag?: number;
  dirvt?: number;
  intensvt?: number;
  u_vel?: number;
  v_vel?: number;
  tempag1?: number;
  tempag2?: number;
  tempag3?: number;
  tempag4?: number;
  tempar?: number;
  ur?: number;
  tempar_r?: number;
  pressatm?: number;
  radincid?: number;
  radrefl?: number;
  bateria?: number;
  sonda_temp?: number;
  sonda_cond?: number;
  sonda_dosat?: number;
  sonda_do?: number;
  sonda_ph?: number;
  sonda_nh4?: number;
  sonda_no3?: number;
  sonda_turb?: number;
  sonda_chl?: number;
  sonda_bateria?: number;
  corr_norte?: number;
  corr_leste?: number;
  co2_low?: number;
  co2_high?: number;
  precipitacao?: number;
}

export interface EstacaoData {
  idestacao: string;
  idhexadecimal?: string;
  rotulo?: string;
  lat?: number;
  lng?: number;
  inicio?: string;
  fim?: string;
}

export interface SensorData {
  idSensor: number;
  nome: string;
  fabricante?: string;
  modelo?: string;
  faixa?: string;
  precisao?: string;
}

export interface CampoData {
  idcampotabela: number;
  idSensor?: number;
  nomecampo?: string;
  rotulo?: string;
  unidademedida?: string;
  ordem?: number;
}

export interface CsvMetadata {
  titulo: string;
  descricao: string;
  fonte: string;
  dataGeracao: string;
  versao: string;
  estacao: EstacaoData;
  periodoInicio: string;
  periodoFim: string;
  totalRegistros: number;
  camposIncluidos: string[];
}

export interface CsvExportOptions {
  incluirMetadados: boolean;
  incluirCabecalhos: boolean;
  formatoData: "ISO" | "BR" | "US";
  separador: "," | ";" | "\t";
  encoding: "UTF-8" | "ISO-8859-1";
  filtros?: {
    dataInicio?: string;
    dataFim?: string;
    estacao?: string;
    campos?: string[];
  };
}

export class SimaCsvParser {
  constructor() {
    this.initializeMetadata();
  }

  /**
   * Inicializa os metadados das estações, sensores e campos
   */
  private async initializeMetadata(): Promise<void> {
    // Metadados são gerados dinamicamente baseados nos dados reais do banco
    // Os cabeçalhos e campos são extraídos automaticamente dos dados SIMA
  }

  /**
   * Gera cabeçalhos CSV com informações detalhadas dos campos
   */
  private generateHeaders(options: CsvExportOptions, sampleData?: SimaData): string[] {
    const headers: string[] = [];

    if (options.incluirCabecalhos) {
      // Cabeçalhos básicos sempre incluídos
      headers.push("ID_SIMA", "ID_ESTACAO", "DATA_HORA");

      // Gerar cabeçalhos dinamicamente baseados nos campos disponíveis nos dados
      if (sampleData) {
        const dynamicHeaders = Object.keys(sampleData)
          .filter((key) => key !== "idsima" && key !== "idestacao" && key !== "datahora")
          .map((key) => key.toUpperCase())
          .sort();

        headers.push(...dynamicHeaders);
      } else {
        // Fallback com todos os campos possíveis se não houver dados de exemplo
        const allPossibleHeaders = [
          "REGNO",
          "NOFSAMPLES",
          "PROAMAG",
          "DIRVT",
          "INTENSVT",
          "U_VEL",
          "V_VEL",
          "TEMPAG1",
          "TEMPAG2",
          "TEMPAG3",
          "TEMPAG4",
          "TEMPAR",
          "UR",
          "TEMPAR_R",
          "PRESSATM",
          "RADINCID",
          "RADREFL",
          "BATERIA",
          "SONDA_TEMP",
          "SONDA_COND",
          "SONDA_DOSAT",
          "SONDA_DO",
          "SONDA_PH",
          "SONDA_NH4",
          "SONDA_NO3",
          "SONDA_TURB",
          "SONDA_CHL",
          "SONDA_BATERIA",
          "CORR_NORTE",
          "CORR_LESTE",
          "CO2_LOW",
          "CO2_HIGH",
          "PRECIPITACAO",
        ];
        headers.push(...allPossibleHeaders);
      }
    }

    return headers;
  }

  /**
   * Gera metadados do arquivo CSV
   */
  private generateMetadata(data: SimaData[], options: CsvExportOptions): CsvMetadata {
    const estacaoId = data[0]?.idestacao;

    const datas = data.map((d) => new Date(d.datahora)).sort();
    const periodoInicio = datas[0]?.toISOString().split("T")[0] || "";
    const periodoFim = datas[datas.length - 1]?.toISOString().split("T")[0] || "";

    return {
      titulo: `Dados SIMA - Estação ${estacaoId}`,
      descricao:
        "Dados de monitoramento hidrosférico coletados pelo Sistema Integrado de Monitoramento Ambiental (SIMA)",
      fonte: "SIMA - Sistema Integrado de Monitoramento Ambiental",
      dataGeracao: new Date().toISOString(),
      versao: "1.0",
      estacao: {
        idestacao: estacaoId || "N/A",
        rotulo: estacaoId || "N/A",
        lat: undefined,
        lng: undefined,
      },
      periodoInicio,
      periodoFim,
      totalRegistros: data.length,
      camposIncluidos: this.generateHeaders(options, data[0]),
    };
  }

  /**
   * Formata uma linha de dados para CSV
   */
  private formatDataRow(data: SimaData, options: CsvExportOptions): string[] {
    const row: string[] = [];

    // Dados básicos
    row.push(data.idsima.toString());
    row.push(data.idestacao);
    row.push(this.formatDate(data.datahora, options.formatoData));

    // Adicionar todos os campos dinamicamente baseados nos dados disponíveis
    const dataKeys = Object.keys(data)
      .filter((key) => key !== "idsima" && key !== "idestacao" && key !== "datahora")
      .sort();

    dataKeys.forEach((key) => {
      const value = (data as unknown as Record<string, unknown>)[key];
      row.push(value !== null && value !== undefined ? value.toString() : "");
    });

    return row;
  }

  /**
   * Formata data conforme opções
   */
  private formatDate(dateString: string, formato: string): string {
    const date = new Date(dateString);

    switch (formato) {
      case "BR":
        return date.toLocaleString("pt-BR");
      case "US":
        return date.toLocaleString("en-US");
      case "ISO":
      default:
        return date.toISOString();
    }
  }

  /**
   * Escapa valores para CSV
   */
  private escapeCsvValue(value: string): string {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  /**
   * Gera o conteúdo CSV completo
   */
  public async generateCsv(
    data: SimaData[],
    options: CsvExportOptions = {
      incluirMetadados: true,
      incluirCabecalhos: true,
      formatoData: "BR",
      separador: ";",
      encoding: "UTF-8",
    },
  ): Promise<string> {
    if (!data || data.length === 0) {
      throw new Error("Nenhum dado fornecido para exportação");
    }

    // Aplicar filtro de estação se especificado
    let filteredData = data;
    if (options.filtros?.estacao) {
      filteredData = data.filter((record) => record.idestacao === options.filtros?.estacao);
    }

    if (filteredData.length === 0) {
      throw new Error("Nenhum dado encontrado para a estação selecionada");
    }

    const lines: string[] = [];

    // Gerar metadados se solicitado
    if (options.incluirMetadados) {
      const metadata = this.generateMetadata(filteredData, options);
      lines.push("# METADADOS DO ARQUIVO CSV SIMA");
      lines.push(`# Título: ${metadata.titulo}`);
      lines.push(`# Descrição: ${metadata.descricao}`);
      lines.push(`# Fonte: ${metadata.fonte}`);
      lines.push(`# Data de Geração: ${metadata.dataGeracao}`);
      lines.push(`# Versão: ${metadata.versao}`);
      lines.push(`# Estação: ${metadata.estacao.rotulo || metadata.estacao.idestacao}`);
      lines.push(
        `# Coordenadas: Lat ${metadata.estacao.lat || "N/A"}, Lng ${metadata.estacao.lng || "N/A"}`,
      );
      lines.push(`# Período: ${metadata.periodoInicio} a ${metadata.periodoFim}`);
      lines.push(`# Total de Registros: ${metadata.totalRegistros}`);
      lines.push(`# Campos Incluídos: ${metadata.camposIncluidos.length}`);
      lines.push("#");
      lines.push("# ESTRUTURA DOS DADOS:");
      lines.push("# ID_SIMA: Identificador único do registro");
      lines.push("# ID_ESTACAO: Identificador da estação de coleta");
      lines.push("# DATA_HORA: Data e hora da coleta");
      lines.push("#");
      lines.push("# DADOS:");
    }

    // Gerar cabeçalhos
    if (options.incluirCabecalhos) {
      const headers = this.generateHeaders(options, data[0]);
      lines.push(headers.map((h) => this.escapeCsvValue(h)).join(options.separador));
    }

    // Gerar linhas de dados
    filteredData.forEach((record) => {
      const row = this.formatDataRow(record, options);
      lines.push(row.map((v) => this.escapeCsvValue(v)).join(options.separador));
    });

    return lines.join("\n");
  }

  /**
   * Gera e baixa o arquivo CSV
   */
  public async downloadCsv(
    data: SimaData[],
    filename: string = "dados_sima.csv",
    options?: CsvExportOptions,
  ): Promise<void> {
    const csvContent = await this.generateCsv(data, options);

    // Criar blob com encoding correto
    const blob = new Blob([csvContent], {
      type:
        options?.encoding === "ISO-8859-1"
          ? "text/csv;charset=iso-8859-1"
          : "text/csv;charset=utf-8",
    });

    // Criar link de download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Adicionar ao DOM temporariamente e clicar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpar URL
    window.URL.revokeObjectURL(url);
  }

  /**
   * Filtra dados conforme critérios especificados
   */
  public filterData(data: SimaData[], filters: CsvExportOptions["filtros"]): SimaData[] {
    let filteredData = [...data];

    if (filters?.dataInicio) {
      const dataInicio = new Date(filters.dataInicio);
      filteredData = filteredData.filter((d) => new Date(d.datahora) >= dataInicio);
    }

    if (filters?.dataFim) {
      const dataFim = new Date(filters.dataFim);
      filteredData = filteredData.filter((d) => new Date(d.datahora) <= dataFim);
    }

    if (filters?.estacao) {
      filteredData = filteredData.filter((d) => d.idestacao === filters.estacao);
    }

    return filteredData;
  }

  /**
   * Valida dados antes da exportação
   */
  public validateData(data: SimaData[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data || data.length === 0) {
      errors.push("Nenhum dado fornecido");
    }

    data.forEach((record, index) => {
      if (!record.idsima) {
        errors.push(`Registro ${index + 1}: ID SIMA ausente`);
      }
      if (!record.idestacao) {
        errors.push(`Registro ${index + 1}: ID Estação ausente`);
      }
      if (!record.datahora) {
        errors.push(`Registro ${index + 1}: Data/Hora ausente`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Instância singleton do parser
export const simaCsvParser = new SimaCsvParser();
