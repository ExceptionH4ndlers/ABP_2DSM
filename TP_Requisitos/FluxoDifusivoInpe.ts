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
