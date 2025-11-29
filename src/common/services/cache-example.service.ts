import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

/**
 * Ejemplo de servicio que demuestra el uso programático del caché
 * Este servicio puede ser usado como referencia en otros módulos
 */
@Injectable()
export class CacheExampleService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Obtiene datos del caché o de la fuente original
   */
  async getCachedData(key: string, fetchFunction: () => Promise<any>, ttl: number = 300000) {
    // Intentar obtener del caché
    const cached = await this.cacheManager.get(key);
    if (cached) {
      console.log(`✅ Cache HIT para: ${key}`);
      return cached;
    }

    console.log(`❌ Cache MISS para: ${key} - Consultando fuente original...`);
    // Si no existe en caché, ejecutar función de obtención
    const data = await fetchFunction();
    
    // Guardar en caché
    await this.cacheManager.set(key, data, ttl);
    return data;
  }

  /**
   * Invalida (elimina) una entrada específica del caché
   */
  async invalidateCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
    console.log(`🗑️ Cache invalidado para: ${key}`);
  }

  /**
   * Invalida múltiples entradas del caché
   */
  async invalidateMultiple(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.cacheManager.del(key);
    }
    console.log(`🗑️ Cache invalidado para ${keys.length} claves`);
  }

  /**
   * Limpia completamente el caché
   * Nota: Para limpiar todo, es mejor invalidar claves específicas conocidas
   */
  async clearAllCache(): Promise<void> {
    // En cache-manager v5+, no hay método reset() directo
    // Se recomienda mantener un registro de claves o usar patterns
    console.warn('⚠️ Para limpiar caché completo, considera usar Redis con soporte de patterns');
    console.log('💡 Alternativa: Invalidar claves específicas con del(key)');
  }

  /**
   * Obtiene un valor del caché sin recargar
   */
  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  /**
   * Establece un valor en el caché
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }
}
