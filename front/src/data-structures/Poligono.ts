export type Ponto = { x: number; y: number };

export default class Poligono {
  constructor(public pontos: Ponto[]) {}

  calcularArea(): number {
    let area = 0;
    const n = this.pontos.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area +=
        this.pontos[i].x * this.pontos[j].y -
        this.pontos[j].x * this.pontos[i].y;
    }

    return Math.abs(area / 2);
  }


  verificarIntersecao(outro: Poligono): boolean {
    return this.calcularIntersecao(outro) !== null;
  }

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

  calcularAreaSobreposta(outro: Poligono): number {
    const inter = this.calcularIntersecao(outro);
    if (!inter) return 0;
    return inter.calcularArea();
  }
}
