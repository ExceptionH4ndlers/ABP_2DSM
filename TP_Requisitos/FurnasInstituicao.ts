export class FurnasInstituicao {
  constructor(
    public idinstituicao: number,
    public nome: string
  ) {}

  getInstituicao(): string {
    return `Instituição Furnas: ${this.nome}`;
  }
}
