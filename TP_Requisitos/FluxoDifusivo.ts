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
