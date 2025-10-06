export class MedidaCampoSuperficie {
  constructor(
    public idMedidaCampoSuperficie: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public secchi: number,
    public tempagua: number,
    public condutividade: number,
    public _do: number,
    public ph: number,
    public turbidez: number,
    public materialemsuspensao: number
  ) {}

  getMedidaCampoSuperficie(): string {
    return `Medida Campo Superfície: ${this.idMedidaCampoSuperficie}`;
  }
}
