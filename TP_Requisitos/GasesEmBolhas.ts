export class GasesEmBolhas {
  constructor(
    public idGasesEmBolhas: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: number,
    public co2: number,
    public o2: number,
    public n2: number,
    public ch4: number,
    public n2o: number
  ) {}

  getGasesEmBolhas(): string {
    return `Gases em Bolhas: ${this.idGasesEmBolhas}`;
  }
}
