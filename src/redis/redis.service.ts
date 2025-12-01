import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async deleteMany(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.cacheManager.del(key);
    }
  }

  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }

  async exists(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== undefined;
  }

  // Método para limpiar múltiples keys por patrón (aproximación)
  async invalidateByPrefix(prefix: string): Promise<void> {
    console.warn(`invalidateByPrefix('${prefix}') - Eliminar manualmente las claves conocidas`);
    // Implementación simple: conocer las claves de antemano
    // Para una solución completa, necesitarías acceso directo al cliente Redis
  }
}