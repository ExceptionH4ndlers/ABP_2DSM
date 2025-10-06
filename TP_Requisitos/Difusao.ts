export class Difusao {
  constructor(
    public idDifusao: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public ch4: number,
    public co2: number,
    public n2o: number,
    public ph: number,
    public tempagua: number,
    public tempar: number,
    public profundidade: number,
    public altitude: number,
    public vento: number
  ) {}

  getDifusao(): string {
    return `Difusão: ${this.idDifusao} - CH4: ${this.ch4}`;
  }
}
