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
