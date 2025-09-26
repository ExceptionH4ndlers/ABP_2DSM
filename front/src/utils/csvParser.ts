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
  sonda_DOsat?: number;
  sonda_DO?: number;
  sonda_pH?: number;
  sonda_NH4?: number;
  sonda_NO3?: number;
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
  private estacoes: Map<string, EstacaoData> = new Map();
  private sensores: Map<number, SensorData> = new Map();
  private campos: Map<string, CampoData> = new Map();

  constructor() {
    this.initializeMetadata();
  }

  /**
   * Inicializa os metadados das estações, sensores e campos
   */
  private async initializeMetadata(): Promise<void> {
    try {
      // Carregar dados das estações
      const estacoesResponse = await fetch("/api/estacoes");
      if (estacoesResponse.ok) {
        const estacoes = await estacoesResponse.json();
        estacoes.forEach((estacao: EstacaoData) => {
          this.estacoes.set(estacao.idestacao, estacao);
        });
      }

      // Carregar dados dos sensores
      const sensoresResponse = await fetch("/api/sensores");
      if (sensoresResponse.ok) {
        const sensores = await sensoresResponse.json();
        sensores.forEach((sensor: SensorData) => {
          this.sensores.set(sensor.idSensor, sensor);
        });
      }

      // Carregar dados dos campos
      const camposResponse = await fetch("/api/campos");
      if (camposResponse.ok) {
        const campos = await camposResponse.json();
        campos.forEach((campo: CampoData) => {
          if (campo.nomecampo) {
            this.campos.set(campo.nomecampo, campo);
          }
        });
      }
    } catch (error) {
      console.warn("Erro ao carregar metadados:", error);
    }
  }

  /**
   * Gera cabeçalhos CSV com informações detalhadas dos campos
   */
  private generateHeaders(options: CsvExportOptions): string[] {
    const headers: string[] = [];

    if (options.incluirCabecalhos) {
      // Cabeçalhos básicos sempre incluídos
      headers.push("ID_SIMA", "ID_ESTACAO", "DATA_HORA");

      // Adicionar cabeçalhos dos campos de dados
      const camposOrdenados = Array.from(this.campos.values()).sort(
        (a, b) => (a.ordem || 0) - (b.ordem || 0),
      );

      camposOrdenados.forEach((campo) => {
        if (campo.nomecampo && campo.rotulo) {
          const header = `${campo.rotulo.toUpperCase()} (${campo.unidademedida || "N/A"})`;
          headers.push(header);
        }
      });
    }

    return headers;
  }

  /**
   * Gera metadados do arquivo CSV
   */
  private generateMetadata(data: SimaData[], options: CsvExportOptions): CsvMetadata {
    const estacaoId = data[0]?.idestacao;
    const estacao = estacaoId ? this.estacoes.get(estacaoId) : undefined;

    const datas = data.map((d) => new Date(d.datahora)).sort();
    const periodoInicio = datas[0]?.toISOString().split("T")[0] || "";
    const periodoFim = datas[datas.length - 1]?.toISOString().split("T")[0] || "";

    return {
      titulo: `Dados SIMA - ${estacao?.rotulo || "Estação " + estacaoId}`,
      descricao:
        "Dados de monitoramento hidrosférico coletados pelo Sistema Integrado de Monitoramento Ambiental (SIMA)",
      fonte: "SIMA - Sistema Integrado de Monitoramento Ambiental",
      dataGeracao: new Date().toISOString(),
      versao: "1.0",
      estacao: estacao || { idestacao: estacaoId || "N/A" },
      periodoInicio,
      periodoFim,
      totalRegistros: data.length,
      camposIncluidos: this.generateHeaders(options),
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

    // Dados dos sensores
    const camposOrdenados = Array.from(this.campos.values()).sort(
      (a, b) => (a.ordem || 0) - (b.ordem || 0),
    );

    camposOrdenados.forEach((campo) => {
      if (campo.nomecampo) {
        const valor = (data as any)[campo.nomecampo];
        row.push(valor !== null && valor !== undefined ? valor.toString() : "");
      }
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

    const lines: string[] = [];

    // Gerar metadados se solicitado
    if (options.incluirMetadados) {
      const metadata = this.generateMetadata(data, options);
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

      // Adicionar descrições dos campos
      const camposOrdenados = Array.from(this.campos.values()).sort(
        (a, b) => (a.ordem || 0) - (b.ordem || 0),
      );

      camposOrdenados.forEach((campo) => {
        if (campo.nomecampo && campo.rotulo) {
          const sensor = campo.idSensor ? this.sensores.get(campo.idSensor) : null;
          const descricao = sensor
            ? `${campo.rotulo} (${sensor.fabricante} ${sensor.modelo})`
            : campo.rotulo;
          lines.push(`# ${campo.nomecampo}: ${descricao} [${campo.unidademedida || "N/A"}]`);
        }
      });

      lines.push("#");
      lines.push("# DADOS:");
    }

    // Gerar cabeçalhos
    if (options.incluirCabecalhos) {
      const headers = this.generateHeaders(options);
      lines.push(headers.map((h) => this.escapeCsvValue(h)).join(options.separador));
    }

    // Gerar linhas de dados
    data.forEach((record) => {
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
