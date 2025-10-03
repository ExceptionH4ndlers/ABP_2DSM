// BALCAR CAMPANHA

export class Reservatorio {
  constructor(
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number
  ) {}

  getReservatorio(): string {
    return `Reservatório: ${this.nome} (ID: ${this.idreservatorio})`;
  }
}

export class Instituicao {
  constructor(
    public idinstituicao: number,
    public nome: string
  ) {}

  getInstituicao(): string {
    return `Instituição: ${this.nome} (ID: ${this.idinstituicao})`;
  }
}

export class Sitio {
  constructor(
    public idsitio: number,
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number,
    public descricao: string
  ) {}

  getSitio(): string {
    return `Sítio: ${this.nome} (ID: ${this.idsitio})`;
  }
}

export class Campanha {
  constructor(
    public idcampanha: number,
    public idreservatorio: number,
    public idinstituicao: number,
    public nrocampanha: number,
    public datainicio: Date,
    public datafim: Date
  ) {}

  getCampanha(): string {
    return `Campanha: ${this.nrocampanha} (ID: ${this.idcampanha})`;
  }
}

export class FluxoInpe {
  constructor(
    public idfluxoinpe: number,
    public idsitio: number,
    public idcampanha: number,
    public datamedida: Date,
    public ch4: number,
    public batimetria: number,
    public tempar: number,
    public tempcupula: number,
    public tempaguasubsuperficie: number,
    public tempaguameio: number,
    public tempaguafundo: number,
    public phsubsuperficie: number,
    public phmeio: number,
    public phfundo: number,
    public orpsubsuperficie: number,
    public orpmeio: number,
    public orpfundo: number,
    public condutividadesubsuperficie: number,
    public condutividademeio: number,
    public condutividadefundo: number,
    public odsubsuperficie: number,
    public odmeio: number,
    public odfundo: number,
    public tsdsubsuperficie: number,
    public tsdmeio: number,
    public tsdfundo: number
  ) {}

  getFluxoinpe(): string {
    return `Fluxo INPE: ${this.idfluxoinpe} - CH4: ${this.ch4} mg/m²/h`;
  }
}

export class TabelaCampo {
  constructor(
    public idtabelacampo: number,
    public nome: string,
    public rotulo: string,
    public unidade: string,
    public descricao: string,
    public ordem: number
  ) {}

  getTabelacampo(): string {
    return `Campo: ${this.rotulo} (${this.unidade})`;
  }
}

// FURNAS CAMPANHA

export class FurnasInstituicao {
  constructor(
    public idinstituicao: number,
    public nome: string
  ) {}

  getInstituicao(): string {
    return `Instituição Furnas: ${this.nome}`;
  }
}

export class FurnasReservatorio {
  constructor(
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number
  ) {}

  getReservatorio(): string {
    return `Reservatório Furnas: ${this.nome}`;
  }
}

export class FurnasCampanha {
  constructor(
    public idcampanha: number,
    public idinstituicao: number,
    public idreservatorio: number,
    public nroCampanha: number,
    public datainicio: Date,
    public datafim: Date
  ) {}

  getCampanha(): string {
    return `Campanha Furnas: ${this.nroCampanha}`;
  }
}

export class FurnasSitio {
  constructor(
    public idsitio: number,
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number,
    public descricao: string
  ) {}

  getSitio(): string {
    return `Sítio Furnas: ${this.nome}`;
  }
}

export class FurnasTabela {
  constructor(
    public idTabela: number,
    public idInstituicao: number,
    public nome: string,
    public rotulo: string,
    public excecao: string,
    public sitio: string,
    public campanha: string
  ) {}

  getTabela(): string {
    return `Tabela Furnas: ${this.rotulo}`;
  }
}

export class CampoPorTabela {
  constructor(
    public idCampoPorTabela: number,
    public idTabela: number,
    public nome: string,
    public rotulo: string,
    public unidade: string,
    public descricao: string,
    public principal: string,
    public ordem: number,
    public tipo: string
  ) {}

  getCampoPorTabela(): string {
    return `Campo: ${this.rotulo} (${this.unidade})`;
  }
}

export class CampanhaPorTabela {
  constructor(
    public idCampanha: number,
    public idTabela: number
  ) {}

  getCampanhaPorTabela(): string {
    return `Campanha-Tabela: ${this.idCampanha}-${this.idTabela}`;
  }
}

export class AbioticoColuna {
  constructor(
    public idabioticocoluna: number,
    public idcampanha: number,
    public idsitio: number,
    public datamedida: Date,
    public horamedida: string,
    public profundidade: number,
    public dic: number,
    public nt: number,
    public pt: number,
    public delta13c: number,
    public delta15n: number
  ) {}

  getAbioticoColuna(): string {
    return `Abiótico Coluna: ${this.idabioticocoluna} - DIC: ${this.dic}`;
  }
}

export class AbioticoSuperficie {
  constructor(
    public idabioticosuperficie: number,
    public idcampanha: number,
    public idsitio: number,
    public datamedida: Date,
    public horamedida: string,
    public dic: number,
    public nt: number,
    public pt: number,
    public delta13c: number,
    public delta15n: number
  ) {}

  getAbioticoSuperficie(): string {
    return `Abiótico Superfície: ${this.idabioticosuperficie}`;
  }
}

export class AguaMateriaOrganicaSedimento {
  constructor(
    public idaguamateriaorganicasedimento: number,
    public idcampanha: number,
    public idsitio: number,
    public datamedida: Date,
    public horamedida: string,
    public profundidade: number,
    public batimetria: number,
    public agua: number,
    public materiaOrganica: number
  ) {}

  getAguaMateriaOrganicaSedimento(): string {
    return `Água-Matéria Orgânica: ${this.idaguamateriaorganicasedimento}`;
  }
}

export class BioticoColuna {
  constructor(
    public idBioticoColuna: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public doc: number,
    public toc: number,
    public poc: number,
    public densidadeBacteria: number,
    public biomassaBacteria: number,
    public clorofilaA: number,
    public biomassaCarbonoTotalFito: number,
    public densidadeTotalFito: number,
    public biomassaZoo: number,
    public densidadeTotalZoo: number
  ) {}

  getBioticoColuna(): string {
    return `Biótico Coluna: ${this.idBioticoColuna} - DOC: ${this.doc}`;
  }
}

export class BioticoSuperficie {
  constructor(
    public idBioticoSuperficie: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public doc: number,
    public toc: number,
    public poc: number,
    public densidadeBacteria: number,
    public biomassaBacteria: number,
    public clorofilaA: number,
    public biomassaCarbonoTotalFito: number,
    public densidadeTotalFito: number,
    public biomassaZoo: number,
    public densidadeTotalZoo: number
  ) {}

  getBioticoSuperficie(): string {
    return `Biótico Superfície: ${this.idBioticoSuperficie}`;
  }
}

export class Bolhas {
  constructor(
    public idBolhas: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public nroDeFunis: number,
    public volumeColetado: number,
    public co2: number,
    public o2: number,
    public n2: number,
    public ch4: number,
    public n2o: number
  ) {}

  getBolhas(): string {
    return `Bolhas: ${this.idBolhas} - CH4: ${this.ch4} mg/m²/h`;
  }
}

export class CamaraSolo {
  constructor(
    public idCamaraSolo: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public ch4: number,
    public co2: number,
    public n2o: number,
    public tempar: number,
    public tempsolo: number,
    public vento: number,
    public altitude: number
  ) {}

  getCamaraSolo(): string {
    return `Câmara Solo: ${this.idCamaraSolo} - CH4: ${this.ch4}`;
  }
}

export class Carbono {
  constructor(
    public idCarbono: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public dc: number,
    public doc: number,
    public poc: number,
    public toc: number,
    public dic: number,
    public tc: number
  ) {}

  getCarbono(): string {
    return `Carbono: ${this.idCarbono} - TC: ${this.tc}`;
  }
}

export class ConcentracaoGasAgua {
  constructor(
    public idConcentracaoGasAgua: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public batimetria: number,
    public altura: number,
    public replica: number,
    public ch4: number,
    public co2: number
  ) {}

  getConcentracaoGasAgua(): string {
    return `Concentração Gás Água: ${this.idConcentracaoGasAgua}`;
  }
}

export class ConcentracaoGasSedimento {
  constructor(
    public idConcentracaoGasSedimento: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public batimetria: number,
    public profundidadeDoSedimento: number,
    public replica: number,
    public ch4: number,
    public co2: number
  ) {}

  getConcentracaoGasSedimento(): string {
    return `Concentração Gás Sedimento: ${this.idConcentracaoGasSedimento}`;
  }
}

export class DadosPrecipitacao {
  constructor(
    public idDadosPrecipitacao: number,
    public idReservatorio: number,
    public dataMedida: Date,
    public precipitacao: number
  ) {}

  getDadosPrecipitacao(): string {
    return `Precipitação: ${this.precipitacao} mm`;
  }
}

export class DadosRepresa {
  constructor(
    public idDadosRepresa: number,
    public idReservatorio: number,
    public dataMedida: Date,
    public nivelReservatorio: number,
    public volUtilReservatorio: number,
    public porVolUtilReservatorio: number,
    public geracao: number,
    public vazaoAfluente: number,
    public vazaoDefluente: number,
    public produtividade: number,
    public vazaoTurbinada: number,
    public vazaoVertida: number,
    public vazaoTurbinadaVazio: number
  ) {}

  getDadosRepresa(): string {
    return `Dados Represa: ${this.idDadosRepresa} - Nível: ${this.nivelReservatorio}m`;
  }
}

export class Difusao {
  constructor(
    public idDifusao: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public ch4: number,
    public co2: number,
    public n2o: number,
    public ph: number,
    public tempagua: number,
    public tempar: number,
    public profundidade: number,
    public altitude: number,
    public vento: number
  ) {}

  getDifusao(): string {
    return `Difusão: ${this.idDifusao} - CH4: ${this.ch4}`;
  }
}

export class DuplaDessorcaoAgua {
  constructor(
    public idDuplaDessorcaoAgua: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public co2: number,
    public o2: number,
    public n2: number,
    public ch4: number,
    public n2o: number
  ) {}

  getDuplaDessorcaoAgua(): string {
    return `Dupla Dessorção: ${this.idDuplaDessorcaoAgua}`;
  }
}

export class FluxoBolhasInpe {
  constructor(
    public idFluxoBolhasInpe: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public ch4: number,
    public ch4_desviopadrao: number,
    public ch4_amostras: number
  ) {}

  getFluxoBolhasInpe(): string {
    return `Fluxo Bolhas INPE: ${this.idFluxoBolhasInpe} - CH4: ${this.ch4}`;
  }
}

export class FluxoCarbono {
  constructor(
    public idFluxoCarbono: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public producaofitoplanctonica: number,
    public carbonoorganicoexcretado: number,
    public respiracaofito: number,
    public producaobacteriana: number,
    public respiracaobacteriana: number,
    public taxasedimentacao: number
  ) {}

  getFluxoCarbono(): string {
    return `Fluxo Carbono: ${this.idFluxoCarbono}`;
  }
}

export class FluxoDifusivo {
  constructor(
    public idFluxoDifusivo: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public batimetria: number,
    public intervalo: string,
    public ch4: number,
    public co2: number
  ) {}

  getFluxoDifusivo(): string {
    return `Fluxo Difusivo: ${this.idFluxoDifusivo}`;
  }
}

export class FluxoDifusivoInpe {
  constructor(
    public idFluxoDifusivoInpe: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public co2: number,
    public co2_desviopadrao: number,
    public co2_amostras: number,
    public ch4: number,
    public ch4_desviopadrao: number,
    public ch4_amostras: number
  ) {}

  getFluxoDifusivoInpe(): string {
    return `Fluxo Difusivo INPE: ${this.idFluxoDifusivoInpe}`;
  }
}

export class GasesEmBolhas {
  constructor(
    public idGasesEmBolhas: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: number,
    public co2: number,
    public o2: number,
    public n2: number,
    public ch4: number,
    public n2o: number
  ) {}

  getGasesEmBolhas(): string {
    return `Gases em Bolhas: ${this.idGasesEmBolhas}`;
  }
}

export class Horiba {
  constructor(
    public idHoriba: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: number,
    public tempagua: number,
    public condutividade: number,
    public ph: number,
    public _do: number,
    public tds: number,
    public redox: number,
    public turbidez: number
  ) {}

  getHoriba(): string {
    return `Horiba: ${this.idHoriba} - Temp: ${this.tempagua}°C`;
  }
}

export class IonsNaAguaIntersticialDoSedimento {
  constructor(
    public idIonsNaAguaIntersticialDoSedimento: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public batimetria: number,
    public f: number,
    public cl: number,
    public no2: number,
    public br: number,
    public no3: number,
    public po4: number,
    public so4: number,
    public na: number,
    public nh4: number,
    public k: number,
    public mg: number,
    public ca: number,
    public acetato: number
  ) {}

  getIonsNaAguaIntersticialDoSedimento(): string {
    return `Íons Água Intersticial: ${this.idIonsNaAguaIntersticialDoSedimento}`;
  }
}

export class MedidaCampoColuna {
  constructor(
    public idMedidaCampoColuna: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public secchi: number,
    public tempagua: number,
    public condutividade: number,
    public _do: number,
    public ph: number,
    public turbidez: number,
    public materialemsuspensao: number,
    public intensidadeluminosa: number
  ) {}

  getMedidaCampoColuna(): string {
    return `Medida Campo Coluna: ${this.idMedidaCampoColuna}`;
  }
}

export class MedidaCampoSuperficie {
  constructor(
    public idMedidaCampoSuperficie: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public secchi: number,
    public tempagua: number,
    public condutividade: number,
    public _do: number,
    public ph: number,
    public turbidez: number,
    public materialemsuspensao: number
  ) {}

  getMedidaCampoSuperficie(): string {
    return `Medida Campo Superfície: ${this.idMedidaCampoSuperficie}`;
  }
}

export class NutrientesSedimento {
  constructor(
    public idNutrientesSedimento: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public batimetria: number,
    public n2: number,
    public pt: number,
    public tc: number
  ) {}

  getNutrientesSedimento(): string {
    return `Nutrientes Sedimento: ${this.idNutrientesSedimento}`;
  }
}

export class ParametrosBiologicosFisicosAgua {
  constructor(
    public idParametrosBiologicosFisicosAgua: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: number,
    public secchi: number,
    public tempagua: number,
    public condutividade: number,
    public _do: number,
    public ph: number,
    public turbidez: number,
    public materialemsuspensao: number,
    public doc: number,
    public toc: number,
    public poc: number,
    public dic: number,
    public nt: number,
    public pt: number,
    public densidadebacteria: number,
    public biomassabacteria: number,
    public clorofilaa: number,
    public biomassacarbonototalfito: number,
    public densidadetotalfito: number,
    public biomassazoo: number,
    public densidadetotalzoo: number,
    public producaofitoplanctonica: number,
    public carbonoorganicoexcretado: number,
    public respiracaofito: number,
    public producaobacteriana: number,
    public respiracaobacteriana: number,
    public taxasedimentacao: number,
    public delta13c: number,
    public delta15n: number,
    public intensidadeluminosa: number
  ) {}

  getParametrosBiologicosFisicosAgua(): string {
    return `Parâmetros Biológicos-Físicos: ${this.idParametrosBiologicosFisicosAgua}`;
  }
}

export class PFQ {
  constructor(
    public idPFQ: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public batimetria: number,
    public tempar: number,
    public tempagua: number,
    public _do: number,
    public ph: number,
    public redox: number,
    public vento: string
  ) {}

  getPFQ(): string {
    return `PFQ: ${this.idPFQ}`;
  }
}

export class TC {
  constructor(
    public idtc: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: string,
    public tc: number
  ) {}

  getTC(): string {
    return `TC: ${this.idtc} - ${this.tc}`;
  }
}

export class VariaveisFisicasQuimicasDaAgua {
  constructor(
    public idVariaveisFisicasQuimicasDaAgua: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public secchi: number,
    public batimetria: number,
    public f: number,
    public cl: number,
    public nno3: number,
    public ppo43: number,
    public sso42: number,
    public li: number,
    public na: number,
    public nnh4: number,
    public k: number,
    public mg: number,
    public ca: number,
    public clorofila: number,
    public feofitina: number,
    public turbidez: number,
    public nt: number,
    public pt: number,
    public tdc: number
  ) {}

  getVariaveisFisicasQuimicasDaAgua(): string {
    return `Variáveis Físicas-Químicas: ${this.idVariaveisFisicasQuimicasDaAgua}`;
  }
}

// SIMA

export class Sensor {
  constructor(
    public idSensor: number,
    public nome: string,
    public fabricante: string,
    public modelo: string,
    public faixa: string,
    public precisao: string
  ) {}

  getSensor(): string {
    return `Sensor: ${this.nome} (${this.fabricante})`;
  }
}

export class Estacao {
  constructor(
    public idestacao: string,
    public idhexadecimal: string,
    public rotulo: string,
    public lat: number,
    public lng: number,
    public inicio: Date,
    public fim: Date
  ) {}

  getEstacao(): string {
    return `Estação: ${this.rotulo} (${this.idestacao})`;
  }
}

export class CampoPorTabelaSima {
  constructor(
    public idcampotabela: number,
    public idSensor: number,
    public nomecampo: string,
    public rotulo: string,
    public unidademedida: string,
    public ordem: number
  ) {}

  getCampoPorTabelaSima(): string {
    return `Campo SIMA: ${this.rotulo} (${this.unidademedida})`;
  }
}

export class Sima {
  constructor(
    public idsima: number,
    public idestacao: string,
    public datahora: Date,
    public regno: number,
    public nofsamples: number,
    public proamag: number,
    public dirvt: number,
    public intensvt: number,
    public u_vel: number,
    public v_vel: number,
    public tempag1: number,
    public tempag2: number,
    public tempag3: number,
    public tempag4: number,
    public tempar: number,
    public ur: number,
    public tempar_r: number,
    public pressatm: number,
    public radincid: number,
    public radrefl: number,
    public bateria: number,
    public sonda_temp: number,
    public sonda_cond: number,
    public sonda_DOsat: number,
    public sonda_DO: number,
    public sonda_pH: number,
    public sonda_NH4: number,
    public sonda_NO3: number,
    public sonda_turb: number,
    public sonda_chl: number,
    public sonda_bateria: number,
    public corr_norte: number,
    public corr_leste: number,
    public co2_low: number,
    public co2_high: number,
    public precipitacao: number
  ) {}

  getSima(): string {
    return `SIMA: ${this.idsima} - Estação: ${this.idestacao}`;
  }
}

export class SimaOffline {
  constructor(
    public idsimaoffline: number,
    public idestacao: string,
    public datahora: Date,
    public dirvt: number,
    public intensvt: number,
    public u_vel: number,
    public v_vel: number,
    public tempag1: number,
    public tempag2: number,
    public tempag3: number,
    public tempag4: number,
    public tempar: number,
    public ur: number,
    public tempar_r: number,
    public pressatm: number,
    public radincid: number,
    public radrefl: number,
    public fonteradiometro: number,
    public sonda_temp: number,
    public sonda_cond: number,
    public sonda_do: number,
    public sonda_ph: number,
    public sonda_nh4: number,
    public sonda_no3: number,
    public sonda_turb: number,
    public sonda_chl: number,
    public sonda_bateria: number,
    public corr_norte: number,
    public corr_leste: number,
    public bateriapainel: number
  ) {}

  getSimaOffline(): string {
    return `SIMA Offline: ${this.idsimaoffline} - Estação: ${this.idestacao}`;
  }
}

// EXEMPLO DE USO

export class ExemploUso {
  static criarExemplos(): void {
    // Exemplo BALCAR
    const reservatorio = new Reservatorio(1, "Furnas", -20.5, -46.3);
    console.log(reservatorio.getReservatorio());

    // Exemplo Furnas
    const bolhas = new Bolhas(1, 1, 1, new Date(), "10:00", 5.0, 3, 100, 2.5, 8.0, 78.0, 1.2, 0.1);
    console.log(bolhas.getBolhas());

    // Exemplo SIMA
    const estacao = new Estacao("e1ea9", "e1ea9", "Balbina", -1.903697222, -59.46910833, new Date(), new Date());
    console.log(estacao.getEstacao());
  }
}
