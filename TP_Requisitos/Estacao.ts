export class Estacao {
  constructor(
    public idestacao: string,
    public idhexadecimal: string,
    public rotulo: string,
    public lat: number,
    public lng: number,
    public inicio: Date,
    public fim: Date
  ) {}

  getEstacao(): string {
    return `Estação: ${this.rotulo} (${this.idestacao})`;
  }
}
