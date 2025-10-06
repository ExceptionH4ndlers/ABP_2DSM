export class ConcentracaoGasAgua {
  constructor(
    public idConcentracaoGasAgua: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public batimetria: number,
    public altura: number,
    public replica: number,
    public ch4: number,
    public co2: number
  ) {}

  getConcentracaoGasAgua(): string {
    return `Concentração Gás Água: ${this.idConcentracaoGasAgua}`;
  }
}
