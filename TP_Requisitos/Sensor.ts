export class Sensor {
  constructor(
    public idSensor: number,
    public nome: string,
    public fabricante: string,
    public modelo: string,
    public faixa: string,
    public precisao: string
  ) {}

  getSensor(): string {
    return `Sensor: ${this.nome} (${this.fabricante})`;
  }
}
