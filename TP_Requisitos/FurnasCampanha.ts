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
