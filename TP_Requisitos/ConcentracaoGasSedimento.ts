export class ConcentracaoGasSedimento {
  constructor(
    public idConcentracaoGasSedimento: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public batimetria: number,
    public profundidadeDoSedimento: number,
    public replica: number,
    public ch4: number,
    public co2: number
  ) {}

  getConcentracaoGasSedimento(): string {
    return `Concentração Gás Sedimento: ${this.idConcentracaoGasSedimento}`;
  }
}
