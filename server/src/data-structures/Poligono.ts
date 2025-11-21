export interface Vertice {
  x: number;
  y: number;
}

export class Poligono {
  private vertices: Vertice[];
  private area: number;
  private perimetro: number;
  private isValid: boolean;

  constructor(vertices: Vertice[]) {
    this.vertices = vertices;

    // Validação simples (min 3)
    if (!this.validarPoligono(vertices)) {
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
  private validarPoligono(vertices: Vertice[]): boolean {
    return Array.isArray(vertices) && vertices.length >= 3;
  }

  // ----------------------
  // Área (Shoelace Formula)
  // ----------------------
  private calcularArea(): number {
    let soma = 0;
    const n = this.vertices.length;

    for (let i = 0; i < n; i++) {
      const atual = this.vertices[i];
      const prox = this.vertices[(i + 1) % n];

      soma += (atual.x * prox.y) - (prox.x * atual.y);
    }

    return Math.abs(soma) / 2;
  }

  // ----------------------
  // Perímetro
  // ----------------------
  private calcularPerimetro(): number {
    let soma = 0;
    const n = this.vertices.length;

    for (let i = 0; i < n; i++) {
      const atual = this.vertices[i];
      const prox = this.vertices[(i + 1) % n];

      const dx = prox.x - atual.x;
      const dy = prox.y - atual.y;

      soma += Math.sqrt(dx * dx + dy * dy);
    }

    return soma;
  }

  // ----------------------
  // Getters
  // ----------------------
  getVertices(): Vertice[] {
    return this.vertices;
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
}
