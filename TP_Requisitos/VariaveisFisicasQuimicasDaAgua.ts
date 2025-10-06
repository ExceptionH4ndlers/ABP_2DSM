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
