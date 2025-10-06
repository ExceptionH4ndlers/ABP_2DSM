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
