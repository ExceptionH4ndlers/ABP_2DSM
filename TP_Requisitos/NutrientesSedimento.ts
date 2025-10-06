export class NutrientesSedimento {
  constructor(
    public idNutrientesSedimento: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public batimetria: number,
    public n2: number,
    public pt: number,
    public tc: number
  ) {}

  getNutrientesSedimento(): string {
    return `Nutrientes Sedimento: ${this.idNutrientesSedimento}`;
  }
}
