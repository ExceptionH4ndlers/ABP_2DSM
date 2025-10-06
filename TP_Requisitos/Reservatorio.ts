export class Reservatorio {
  constructor(
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number
  ) {}

  getReservatorio(): string {
    return `Reservatório: ${this.nome} (ID: ${this.idreservatorio})`;
  }
}
