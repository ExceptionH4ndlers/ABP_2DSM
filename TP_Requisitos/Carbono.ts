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
