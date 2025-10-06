export class Bolhas {
  constructor(
    public idBolhas: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public nroDeFunis: number,
    public volumeColetado: number,
    public co2: number,
    public o2: number,
    public n2: number,
    public ch4: number,
    public n2o: number
  ) {}

  getBolhas(): string {
    return `Bolhas: ${this.idBolhas} - CH4: ${this.ch4} mg/m²/h`;
  }
}
