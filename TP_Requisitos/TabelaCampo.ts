export class TabelaCampo {
  constructor(
    public idtabelacampo: number,
    public nome: string,
    public rotulo: string,
    public unidade: string,
    public descricao: string,
    public ordem: number
  ) {}

  getTabelacampo(): string {
    return `Campo: ${this.rotulo} (${this.unidade})`;
  }
}
