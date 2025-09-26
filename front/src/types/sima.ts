export interface Sima {
  idsima: number;
  idestacao: string;
  datahora: string;
  regno?: number;
  nofsamples?: number;
  proamag?: number;
  dirvt?: number;
  intensvt?: number;
  u_vel?: number;
  v_vel?: number;
  tempag1?: number;
  tempag2?: number;
  tempag3?: number;
  tempag4?: number;
  tempar?: number;
  ur?: number;
  tempar_r?: number;
  pressatm?: number;
  radincid?: number;
  radrefl?: number;
  bateria?: number;
  sonda_temp?: number;
  sonda_cond?: number;
  sonda_DOsat?: number;
  sonda_DO?: number;
  sonda_pH?: number;
  sonda_NH4?: number;
  sonda_NO3?: number;
  sonda_turb?: number;
  sonda_chl?: number;
  sonda_bateria?: number;
  corr_norte?: number;
  corr_leste?: number;
  co2_low?: number;
  co2_high?: number;
  precipitacao?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
}
