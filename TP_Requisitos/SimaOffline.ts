export class SimaOffline {
  constructor(
    public idsimaoffline: number,
    public idestacao: string,
    public datahora: Date,
    public dirvt: number,
    public intensvt: number,
    public u_vel: number,
    public v_vel: number,
    public tempag1: number,
    public tempag2: number,
    public tempag3: number,
    public tempag4: number,
    public tempar: number,
    public ur: number,
    public tempar_r: number,
    public pressatm: number,
    public radincid: number,
    public radrefl: number,
    public fonteradiometro: number,
    public sonda_temp: number,
    public sonda_cond: number,
    public sonda_do: number,
    public sonda_ph: number,
    public sonda_nh4: number,
    public sonda_no3: number,
    public sonda_turb: number,
    public sonda_chl: number,
    public sonda_bateria: number,
    public corr_norte: number,
    public corr_leste: number,
    public bateriapainel: number
  ) {}

  getSimaOffline(): string {
    return `SIMA Offline: ${this.idsimaoffline} - Estação: ${this.idestacao}`;
  }
}
