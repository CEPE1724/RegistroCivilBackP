# Sistema de Caché - RegistroCivilBackP

## 📋 Configuración Implementada

Se ha implementado un sistema de caché en memoria para mejorar el rendimiento de la aplicación NestJS.

### ✅ Características Activadas

1. **Caché en Memoria (In-Memory Cache)**
   - TTL (Time To Live): **5 minutos** (300,000 ms)
   - Capacidad máxima: **100 elementos**
   - Ámbito: **Global** (disponible en todos los módulos)

2. **Caché Automático para GET**
   - Todas las peticiones **GET** se cachean automáticamente
   - Las peticiones POST, PUT, PATCH, DELETE no se cachean
   - Generación automática de claves basadas en URL completa

### 🎯 Beneficios

- ⚡ **Respuestas más rápidas** para consultas frecuentes
- 📊 **Reducción de carga** en la base de datos SQL Server
- 🔄 **Optimización automática** sin modificar código existente
- 💾 **Uso eficiente de memoria** con límite de 100 elementos

### 🔧 Configuración Actual

**Archivo:** `src/app.module.ts`
```typescript
CacheModule.register({
  isGlobal: true,
  ttl: 300000, // 5 minutos
  max: 100,    // Máximo 100 elementos
})
```

**Interceptor:** `src/common/interceptors/http-cache.interceptor.ts`
- Cachea solo peticiones GET
- Genera claves únicas por URL y query params

### 📝 Uso en Controladores (Opcional)

#### Opción 1: Caché Automático (Ya Activo)
Todas las rutas GET se cachean automáticamente sin necesidad de código adicional.

#### Opción 2: Caché Manual con `@CacheKey` y `@CacheTTL`
```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('example')
@UseInterceptors(CacheInterceptor)
export class ExampleController {
  
  @Get('data')
  @CacheTTL(60000) // 1 minuto específico para esta ruta
  @CacheKey('custom_data_key')
  getData() {
    return { data: 'This will be cached' };
  }
}
```

#### Opción 3: Uso Programático del Caché
```typescript
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExampleService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getData(id: number) {
    // Intentar obtener del caché
    const cached = await this.cacheManager.get(`data_${id}`);
    if (cached) {
      return cached;
    }

    // Si no existe, consultar BD y guardar en caché
    const data = await this.repository.findOne({ where: { id } });
    await this.cacheManager.set(`data_${id}`, data, 300000); // 5 min
    return data;
  }

  async invalidateCache(key: string) {
    await this.cacheManager.del(key);
  }

  async clearAll() {
    // Acceder al store para limpiar todo el caché
    const store = this.cacheManager.store;
    if (store && typeof store.clear === 'function') {
      await store.clear();
    }
  }
}
```

### 🚀 Mejoras Futuras (Opcional)

#### 1. Migrar a Redis para Producción
```bash
npm install cache-manager-redis-yet redis
```

**Configuración con Redis:**
```typescript
import { redisStore } from 'cache-manager-redis-yet';

CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: 'localhost',
        port: 6379,
      },
    });

    return {
      store: store as any,
      ttl: 300000,
    };
  },
}),
```

#### 2. Variables de Entorno
Agregar a `.env`:
```env
CACHE_TTL=300000
CACHE_MAX=100
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### 3. Estrategias de Invalidación
- Invalidar caché cuando se actualicen datos (POST/PUT/DELETE)
- Implementar tags de caché por tipo de recurso
- Usar eventos para limpiar caché relacionado

### 🔍 Monitoreo

Para verificar que el caché está funcionando:
1. Realizar la misma petición GET dos veces
2. La segunda debe ser notablemente más rápida
3. En logs de desarrollo, puedes agregar console.log en el interceptor

### ⚠️ Consideraciones

1. **No cachear datos sensibles/personalizados**: Si descomentas la validación de `authorization` en el interceptor, las peticiones autenticadas no se cachearán.

2. **Invalidar caché después de mutaciones**: Considera limpiar el caché cuando se modifiquen datos:
   ```typescript
   @Post()
   async create(@Body() dto: CreateDto) {
     const result = await this.service.create(dto);
     // Invalidar caché específico en lugar de limpiar todo
     await this.cacheManager.del('data_key');
     return result;
   }
   ```

3. **Tamaño de memoria**: Con max=100, el caché automáticamente eliminará los elementos más antiguos cuando se supere el límite.

### 📊 Métricas Esperadas

- **Reducción de tiempo de respuesta**: 50-90% en consultas repetidas
- **Reducción de queries a BD**: Significativa en endpoints de consulta frecuente
- **Uso de memoria**: ~10-50 MB dependiendo del tamaño de las respuestas

---

## 🎉 Estado: ✅ ACTIVADO

El caché está operativo y funcionando automáticamente en todas las peticiones GET.
