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
