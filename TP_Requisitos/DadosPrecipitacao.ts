export class DadosPrecipitacao {
  constructor(
    public idDadosPrecipitacao: number,
    public idReservatorio: number,
    public dataMedida: Date,
    public precipitacao: number
  ) {}

  getDadosPrecipitacao(): string {
    return `Precipitação: ${this.precipitacao} mm`;
  }
}
