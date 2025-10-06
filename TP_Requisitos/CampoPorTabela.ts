export class CampoPorTabela {
  constructor(
    public idCampoPorTabela: number,
    public idTabela: number,
    public nome: string,
    public rotulo: string,
    public unidade: string,
    public descricao: string,
    public principal: string,
    public ordem: number,
    public tipo: string
  ) {}

  getCampoPorTabela(): string {
    return `Campo: ${this.rotulo} (${this.unidade})`;
  }
}
