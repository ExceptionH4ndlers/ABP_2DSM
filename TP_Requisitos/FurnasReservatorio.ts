export class FurnasReservatorio {
  constructor(
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number
  ) {}

  getReservatorio(): string {
    return `Reservatório Furnas: ${this.nome}`;
  }
}
