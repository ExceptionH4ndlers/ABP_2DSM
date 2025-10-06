export class FurnasSitio {
  constructor(
    public idsitio: number,
    public idreservatorio: number,
    public nome: string,
    public lat: number,
    public lng: number,
    public descricao: string
  ) {}

  getSitio(): string {
    return `Sítio Furnas: ${this.nome}`;
  }
}
