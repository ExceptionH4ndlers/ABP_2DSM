export class FluxoInpe {
  constructor(
    public idfluxoinpe: number,
    public idsitio: number,
    public idcampanha: number,
    public datamedida: Date,
    public ch4: number,
    public batimetria: number,
    public tempar: number,
    public tempcupula: number,
    public tempaguasubsuperficie: number,
    public tempaguameio: number,
    public tempaguafundo: number,
    public phsubsuperficie: number,
    public phmeio: number,
    public phfundo: number,
    public orpsubsuperficie: number,
    public orpmeio: number,
    public orpfundo: number,
    public condutividadesubsuperficie: number,
    public condutividademeio: number,
    public condutividadefundo: number,
    public odsubsuperficie: number,
    public odmeio: number,
    public odfundo: number,
    public tsdsubsuperficie: number,
    public tsdmeio: number,
    public tsdfundo: number
  ) {}

  getFluxoinpe(): string {
    return `Fluxo INPE: ${this.idfluxoinpe} - CH4: ${this.ch4} mg/m²/h`;
  }
}
