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
