export class DuplaDessorcaoAgua {
  constructor(
    public idDuplaDessorcaoAgua: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public co2: number,
    public o2: number,
    public n2: number,
    public ch4: number,
    public n2o: number
  ) {}

  getDuplaDessorcaoAgua(): string {
    return `Dupla Dessorção: ${this.idDuplaDessorcaoAgua}`;
  }
}
