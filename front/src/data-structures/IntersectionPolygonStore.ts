/**
 * Interface que representa um ponto no espaço bidimensional.
 */
export interface Coordenada {
  lat: number;
  lng: number;
}

/**
 * Interface mínima para um Polígono armazenável, exigindo um ID único.
 * Assume-se que a classe Poligono completa (com métodos de cálculo) implementa esta interface.
 */
export interface PoligonoArmazenavel {
  id: string;
  coordenadas: Coordenada[];
}

/**
 * Estrutura de dados para armazenar Polígonos de Interseção, utilizando um Map
 * para garantir acesso eficiente (O(1)) por ID.
 *
 * Objetivo: Gerenciar a coleção de polígonos para a funcionalidade de Comparação de Parâmetros.
 * ED-134 | US15 (Comparação de Parâmetros)
 */
export class IntersectionPolygonStore {
  // Map para armazenar polígonos: Chave = ID do polígono, Valor = PoligonoArmazenavel
  private store: Map<string, PoligonoArmazenavel>;

  constructor() {
    this.store = new Map<string, PoligonoArmazenavel>();
  }

  /**
   * Adiciona um novo polígono ao armazenamento.
   * Se um polígono com o mesmo ID já existir, ele será sobrescrito.
   * @param poligono O polígono a ser adicionado. Deve possuir um ID único.
   */
  public adicionarPoligono(poligono: PoligonoArmazenavel): void {
    if (!poligono.id) {
      console.error("Erro ao adicionar polígono: ID é obrigatório.");
      return;
    }
    this.store.set(poligono.id, poligono);
    console.log(`Polígono com ID '${poligono.id}' adicionado ou atualizado.`);
  }

  /**
   * Busca um polígono pelo seu ID.
   * @param id O ID do polígono.
   * @returns O objeto PoligonoArmazenavel, ou undefined se não for encontrado.
   */
  public buscarPorId(id: string): PoligonoArmazenavel | undefined {
    return this.store.get(id);
  }

  /**
   * Retorna todos os polígonos armazenados em um array.
   * @returns Um array contendo todos os objetos PoligonoArmazenavel.
   */
  public buscarTodos(): PoligonoArmazenavel[] {
    // Converte os valores do Map para um Array
    return Array.from(this.store.values());
  }

  /**
   * Remove um polígono do armazenamento usando seu ID.
   * @param id O ID do polígono a ser removido.
   * @returns True se o polígono foi removido com sucesso, False caso contrário (ID não encontrado).
   */
  public removerPoligono(id: string): boolean {
    const wasDeleted = this.store.delete(id);
    if (wasDeleted) {
      console.log(`Polígono com ID '${id}' removido.`);
    } else {
      console.warn(`Tentativa de remover polígono: ID '${id}' não encontrado.`);
    }
    return wasDeleted;
  }

  /**
   * Retorna o número de polígonos armazenados.
   */
  public size(): number {
    return this.store.size;
  }
}
