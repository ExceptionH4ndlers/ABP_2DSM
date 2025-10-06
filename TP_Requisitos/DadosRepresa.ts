export class DadosRepresa {
  constructor(
    public idDadosRepresa: number,
    public idReservatorio: number,
    public dataMedida: Date,
    public nivelReservatorio: number,
    public volUtilReservatorio: number,
    public porVolUtilReservatorio: number,
    public geracao: number,
    public vazaoAfluente: number,
    public vazaoDefluente: number,
    public produtividade: number,
    public vazaoTurbinada: number,
    public vazaoVertida: number,
    public vazaoTurbinadaVazio: number
  ) {}

  getDadosRepresa(): string {
    return `Dados Represa: ${this.idDadosRepresa} - Nível: ${this.nivelReservatorio}m`;
  }
}
