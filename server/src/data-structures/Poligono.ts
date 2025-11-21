export type Ponto = { x: number; y: number };

export default class Poligono {
  private area: number;
  private perimetro: number;
  private isValid: boolean;

  constructor(public pontos: Ponto[]) {
    // Validação simples (min 3)
    if (!this.validarPoligono(pontos)) {
      this.isValid = false;
      throw new Error("Polígono inválido: é necessário ter pelo menos 3 vértices.");
    }

    this.isValid = true;
    this.area = this.calcularArea();
    this.perimetro = this.calcularPerimetro();
  }

  // ----------------------
  // Validação simples
  // ----------------------
  private validarPoligono(pontos: Ponto[]): boolean {
    return Array.isArray(pontos) && pontos.length >= 3;
  }

  // ----------------------
  // Área (Shoelace Formula)
  // ----------------------
  /**
   * Cálculo de área usando Shoelace Formula
   */
  calcularArea(): number {
    let area = 0;
    const n = this.pontos.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += this.pontos[i].x * this.pontos[j].y - this.pontos[j].x * this.pontos[i].y;
    }

    return Math.abs(area / 2);
  }

  // ----------------------
  // Perímetro
  // ----------------------
  private calcularPerimetro(): number {
    let soma = 0;
    const n = this.pontos.length;

    for (let i = 0; i < n; i++) {
      const atual = this.pontos[i];
      const prox = this.pontos[(i + 1) % n];

      const dx = prox.x - atual.x;
      const dy = prox.y - atual.y;

      soma += Math.sqrt(dx * dx + dy * dy);
    }

    return soma;
  }

  // ----------------------
  // Getters
  // ----------------------
  getVertices(): Ponto[] {
    return this.pontos;
  }

  getArea(): number {
    return this.area;
  }

  getPerimetro(): number {
    return this.perimetro;
  }

  getIsValid(): boolean {
    return this.isValid;
  }

  // ----------------------
  // Interseção entre polígonos
  // ----------------------
  /**
   * Verifica se dois polígonos possuem interseção
   */
  verificarIntersecao(outro: Poligono): boolean {
    return this.calcularIntersecao(outro) !== null;
  }

  /**
   * Cálculo da interseção entre polígonos
   * — Algoritmo Sutherland–Hodgman
   */
  calcularIntersecao(outro: Poligono): Poligono | null {
    let resultado = [...this.pontos];

    const clip = outro.pontos;

    const inside = (p: Ponto, a: Ponto, b: Ponto) => {
      return (b.x - a.x) * (p.y - a.y) >= (b.y - a.y) * (p.x - a.x);
    };

    const intersection = (a: Ponto, b: Ponto, c: Ponto, d: Ponto): Ponto => {
      const A1 = b.y - a.y;
      const B1 = a.x - b.x;
      const C1 = A1 * a.x + B1 * a.y;

      const A2 = d.y - c.y;
      const B2 = c.x - d.x;
      const C2 = A2 * c.x + B2 * c.y;

      const det = A1 * B2 - A2 * B1;

      return {
        x: (B2 * C1 - B1 * C2) / det,
        y: (A1 * C2 - A2 * C1) / det,
      };
    };

    for (let i = 0; i < clip.length; i++) {
      const inputList = resultado;
      resultado = [];

      const A = clip[i];
      const B = clip[(i + 1) % clip.length];

      for (let j = 0; j < inputList.length; j++) {
        const P = inputList[j];
        const Q = inputList[(j + 1) % inputList.length];

        const Pinside = inside(P, A, B);
        const Qinside = inside(Q, A, B);

        if (Pinside && Qinside) {
          resultado.push(Q);
        } else if (Pinside && !Qinside) {
          resultado.push(intersection(P, Q, A, B));
        } else if (!Pinside && Qinside) {
          resultado.push(intersection(P, Q, A, B));
          resultado.push(Q);
        }
      }
    }

    if (resultado.length === 0) return null;

    return new Poligono(resultado);
  }

  /**
   * Área de interseção entre dois polígonos
   */
  calcularAreaSobreposta(outro: Poligono): number {
    const inter = this.calcularIntersecao(outro);
    if (!inter) return 0;
    return inter.calcularArea();
  }
}
