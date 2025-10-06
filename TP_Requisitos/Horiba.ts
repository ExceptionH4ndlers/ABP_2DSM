export class Horiba {
  constructor(
    public idHoriba: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public profundidade: number,
    public tempagua: number,
    public condutividade: number,
    public ph: number,
    public _do: number,
    public tds: number,
    public redox: number,
    public turbidez: number
  ) {}

  getHoriba(): string {
    return `Horiba: ${this.idHoriba} - Temp: ${this.tempagua}°C`;
  }
}
