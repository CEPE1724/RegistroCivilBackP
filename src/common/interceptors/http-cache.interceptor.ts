import { Injectable, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Reflector } from '@nestjs/core';

/**
 * Interceptor personalizado para cachear respuestas HTTP
 * Solo cachea peticiones GET y respeta el TTL configurado globalmente
 */
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  /**
   * Genera una clave única para el caché basada en la URL y query params
   */
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    // Solo cachear peticiones GET
    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    
    if (!isGetRequest) {
      return undefined;
    }

    // Generar clave de caché única basada en URL completa
    const url = httpAdapter.getRequestUrl(request);
    return url;
  }

  /**
   * Determina si la respuesta debe ser cacheada
   * Puedes personalizar esta lógica según tus necesidades
   */
  protected isRequestCacheable(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // No cachear si hay header de autorización (datos personalizados por usuario)
    // Descomenta esta línea si quieres evitar cachear peticiones autenticadas
    // if (request.headers.authorization) {
    //   return false;
    // }

    // Solo cachear peticiones GET
    return request.method === 'GET';
  }
}
