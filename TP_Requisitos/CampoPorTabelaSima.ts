export class CampoPorTabelaSima {
  constructor(
    public idcampotabela: number,
    public idSensor: number,
    public nomecampo: string,
    public rotulo: string,
    public unidademedida: string,
    public ordem: number
  ) {}

  getCampoPorTabelaSima(): string {
    return `Campo SIMA: ${this.rotulo} (${this.unidademedida})`;
  }
}
