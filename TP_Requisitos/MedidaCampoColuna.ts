export class MedidaCampoColuna {
  constructor(
    public idMedidaCampoColuna: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public profundidade: number,
    public secchi: number,
    public tempagua: number,
    public condutividade: number,
    public _do: number,
    public ph: number,
    public turbidez: number,
    public materialemsuspensao: number,
    public intensidadeluminosa: number
  ) {}

  getMedidaCampoColuna(): string {
    return `Medida Campo Coluna: ${this.idMedidaCampoColuna}`;
  }
}
