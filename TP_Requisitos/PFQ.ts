export class PFQ {
  constructor(
    public idPFQ: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public batimetria: number,
    public tempar: number,
    public tempagua: number,
    public _do: number,
    public ph: number,
    public redox: number,
    public vento: string
  ) {}

  getPFQ(): string {
    return `PFQ: ${this.idPFQ}`;
  }
}
