export class CamaraSolo {
  constructor(
    public idCamaraSolo: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public ch4: number,
    public co2: number,
    public n2o: number,
    public tempar: number,
    public tempsolo: number,
    public vento: number,
    public altitude: number
  ) {}

  getCamaraSolo(): string {
    return `Câmara Solo: ${this.idCamaraSolo} - CH4: ${this.ch4}`;
  }
}
