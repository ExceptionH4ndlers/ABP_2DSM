export class CampanhaPorTabela {
  constructor(
    public idCampanha: number,
    public idTabela: number
  ) {}

  getCampanhaPorTabela(): string {
    return `Campanha-Tabela: ${this.idCampanha}-${this.idTabela}`;
  }
}
