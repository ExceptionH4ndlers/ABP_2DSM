type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

/**
 * Classe de cache simples com TTL (Time To Live)
 * — Armazena valores com expiração automática
 * — Permite limpar, invalidar e verificar chaves
 */
export default class ChartDataCache<T = unknown> {
  private cache = new Map<string, CacheEntry<T>>();
  private defaultTTL = 1000 * 60 * 5; // 5 minutos

  /**
   * Armazena um valor no cache
   * @param key string — chave
   * @param value T — valor armazenado
   * @param ttl number — tempo até expirar (ms)
   */
  set(key: string, value: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Retorna o valor ou null caso expirado/inexistente
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Verifica expiração
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Remove uma entrada do cache
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Verifica se a chave existe e não expirou
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }
}
