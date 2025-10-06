export class FurnasTabela {
  constructor(
    public idTabela: number,
    public idInstituicao: number,
    public nome: string,
    public rotulo: string,
    public excecao: string,
    public sitio: string,
    public campanha: string
  ) {}

  getTabela(): string {
    return `Tabela Furnas: ${this.rotulo}`;
  }
}
