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
