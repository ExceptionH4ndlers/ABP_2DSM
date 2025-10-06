export class AbioticoSuperficie {
  constructor(
    public idabioticosuperficie: number,
    public idcampanha: number,
    public idsitio: number,
    public datamedida: Date,
    public horamedida: string,
    public dic: number,
    public nt: number,
    public pt: number,
    public delta13c: number,
    public delta15n: number
  ) {}

  getAbioticoSuperficie(): string {
    return `Abiótico Superfície: ${this.idabioticosuperficie}`;
  }
}
