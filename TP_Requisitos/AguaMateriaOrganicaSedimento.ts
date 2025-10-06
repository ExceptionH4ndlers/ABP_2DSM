export class AguaMateriaOrganicaSedimento {
  constructor(
    public idaguamateriaorganicasedimento: number,
    public idcampanha: number,
    public idsitio: number,
    public datamedida: Date,
    public horamedida: string,
    public profundidade: number,
    public batimetria: number,
    public agua: number,
    public materiaOrganica: number
  ) {}

  getAguaMateriaOrganicaSedimento(): string {
    return `Água-Matéria Orgânica: ${this.idaguamateriaorganicasedimento}`;
  }
}
