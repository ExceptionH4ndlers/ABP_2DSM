export class Instituicao {
  constructor(
    public idinstituicao: number,
    public nome: string
  ) {}

  getInstituicao(): string {
    return `Instituição: ${this.nome} (ID: ${this.idinstituicao})`;
  }
}
