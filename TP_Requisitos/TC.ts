export class TC {
  constructor(
    public idtc: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: string,
    public tc: number
  ) {}

  getTC(): string {
    return `TC: ${this.idtc} - ${this.tc}`;
  }
}
