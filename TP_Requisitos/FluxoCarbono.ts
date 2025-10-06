export class FluxoCarbono {
  constructor(
    public idFluxoCarbono: number,
    public idCampanha: number,
    public idSitio: number,
    public dataMedida: Date,
    public horaMedida: string,
    public producaofitoplanctonica: number,
    public carbonoorganicoexcretado: number,
    public respiracaofito: number,
    public producaobacteriana: number,
    public respiracaobacteriana: number,
    public taxasedimentacao: number
  ) {}

  getFluxoCarbono(): string {
    return `Fluxo Carbono: ${this.idFluxoCarbono}`;
  }
}
