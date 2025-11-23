/**
 * Mapeamento de parâmetros SIMA para categorias
 * Usado para filtragem e organização de gráficos
 */

export type SimaCategory =
  | "fisicos"
  | "biologicos"
  | "gases"
  | "meteorologicos"
  | "correntes"
  | "temperaturas";

export interface SimaParameter {
  key: string;
  label: string;
  unit?: string;
  category: SimaCategory;
}

/**
 * Mapeamento de chaves de parâmetros para categorias
 */
export const SIMA_CATEGORY_MAP: Record<string, SimaCategory> = {
  // Físicos/Abióticos
  sonda_temp: "fisicos",
  sonda_ph: "fisicos",
  sonda_cond: "fisicos",
  sonda_do: "fisicos",
  sonda_dosat: "fisicos",
  sonda_turb: "fisicos",
  pressatm: "fisicos",

  // Biológicos/Bióticos
  sonda_chl: "biologicos",
  sonda_nh4: "biologicos",
  sonda_no3: "biologicos",

  // Gases
  co2_low: "gases",
  co2_high: "gases",

  // Meteorológicos
  tempar: "meteorologicos",
  ur: "meteorologicos",
  radincid: "meteorologicos",
  radrefl: "meteorologicos",
  precipitacao: "meteorologicos",
  dirvt: "meteorologicos",
  intensvt: "meteorologicos",
  u_vel: "meteorologicos",
  v_vel: "meteorologicos",

  // Correntes
  corr_norte: "correntes",
  corr_leste: "correntes",

  // Temperaturas Múltiplas
  tempag1: "temperaturas",
  tempag2: "temperaturas",
  tempag3: "temperaturas",
  tempag4: "temperaturas",
  tempar_r: "temperaturas",
};

/**
 * Lista completa de parâmetros SIMA com metadados
 */
export const SIMA_PARAMETERS: SimaParameter[] = [
  // Físicos/Abióticos
  { key: "sonda_temp", label: "Temperatura da Água", unit: "°C", category: "fisicos" },
  { key: "sonda_ph", label: "pH", unit: "unidade", category: "fisicos" },
  { key: "sonda_cond", label: "Condutividade", unit: "µS/cm", category: "fisicos" },
  { key: "sonda_do", label: "Oxigênio Dissolvido", unit: "mg/L", category: "fisicos" },
  { key: "sonda_dosat", label: "Saturação de Oxigênio", unit: "%", category: "fisicos" },
  { key: "sonda_turb", label: "Turbidez", unit: "NTU", category: "fisicos" },
  { key: "pressatm", label: "Pressão Atmosférica", unit: "hPa", category: "fisicos" },

  // Biológicos/Bióticos
  { key: "sonda_chl", label: "Clorofila", unit: "µg/L", category: "biologicos" },
  { key: "sonda_nh4", label: "Amonia (NH₄)", unit: "mg/L", category: "biologicos" },
  { key: "sonda_no3", label: "Nitrato (NO₃)", unit: "mg/L", category: "biologicos" },

  // Gases
  { key: "co2_low", label: "CO₂ Baixo", unit: "ppm", category: "gases" },
  { key: "co2_high", label: "CO₂ Alto", unit: "ppm", category: "gases" },

  // Meteorológicos
  { key: "tempar", label: "Temperatura do Ar", unit: "°C", category: "meteorologicos" },
  { key: "ur", label: "Umidade Relativa", unit: "%", category: "meteorologicos" },
  { key: "radincid", label: "Radiação Incidente", unit: "W/m²", category: "meteorologicos" },
  { key: "radrefl", label: "Radiação Refletida", unit: "W/m²", category: "meteorologicos" },
  { key: "precipitacao", label: "Precipitação", unit: "mm", category: "meteorologicos" },
  { key: "dirvt", label: "Direção do Vento", unit: "°", category: "meteorologicos" },
  { key: "intensvt", label: "Intensidade do Vento", unit: "m/s", category: "meteorologicos" },
  { key: "u_vel", label: "Velocidade U do Vento", unit: "m/s", category: "meteorologicos" },
  { key: "v_vel", label: "Velocidade V do Vento", unit: "m/s", category: "meteorologicos" },

  // Correntes
  { key: "corr_norte", label: "Corrente Norte", unit: "m/s", category: "correntes" },
  { key: "corr_leste", label: "Corrente Leste", unit: "m/s", category: "correntes" },

  // Temperaturas Múltiplas
  { key: "tempag1", label: "Temperatura Água 1", unit: "°C", category: "temperaturas" },
  { key: "tempag2", label: "Temperatura Água 2", unit: "°C", category: "temperaturas" },
  { key: "tempag3", label: "Temperatura Água 3", unit: "°C", category: "temperaturas" },
  { key: "tempag4", label: "Temperatura Água 4", unit: "°C", category: "temperaturas" },
  { key: "tempar_r", label: "Temperatura do Ar (R)", unit: "°C", category: "temperaturas" },
];

/**
 * Labels das categorias
 */
export const CATEGORY_LABELS: Record<SimaCategory, string> = {
  fisicos: "Físicos/Abióticos",
  biologicos: "Biológicos/Bióticos",
  gases: "Gases",
  meteorologicos: "Meteorológicos",
  correntes: "Correntes",
  temperaturas: "Temperaturas Múltiplas",
};

/**
 * Obter parâmetros por categoria
 */
export function getParametersByCategory(category: SimaCategory | "todos"): SimaParameter[] {
  if (category === "todos") {
    return SIMA_PARAMETERS;
  }
  return SIMA_PARAMETERS.filter((param) => param.category === category);
}

/**
 * Obter categoria de um parâmetro
 */
export function getParameterCategory(key: string): SimaCategory | undefined {
  return SIMA_CATEGORY_MAP[key];
}

/**
 * Obter parâmetro por chave
 */
export function getParameterByKey(key: string): SimaParameter | undefined {
  return SIMA_PARAMETERS.find((param) => param.key === key);
}
