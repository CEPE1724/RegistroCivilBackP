import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('redis')
@SkipThrottle() // Sin rate limit para endpoints de prueba
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  async ping() {
    return {
      status: 'success',
      message: 'Redis está conectado',
      timestamp: new Date(),
    };
  }

  @Post('set')
  async setCache(@Body() body: { key: string; value: any; ttl?: number }) {
    await this.redisService.set(body.key, body.value, body.ttl);
    return {
      status: 'success',
      message: `Clave '${body.key}' guardada`,
      ttl: body.ttl || 300,
    };
  }

  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return {
      status: 'success',
      key,
      value,
      exists: value !== undefined,
    };
  }

  @Delete('delete/:key')
  async deleteCache(@Param('key') key: string) {
    await this.redisService.delete(key);
    return {
      status: 'success',
      message: `Clave '${key}' eliminada`,
    };
  }

  @Delete('delete-many')
  async deleteManyCache(@Body() body: { keys: string[] }) {
    await this.redisService.deleteMany(body.keys);
    return {
      status: 'success',
      message: `${body.keys.length} claves eliminadas`,
      keys: body.keys,
    };
  }

  @Get('exists/:key')
  async existsCache(@Param('key') key: string) {
    const exists = await this.redisService.exists(key);
    return {
      status: 'success',
      key,
      exists,
    };
  }

  @Post('invalidate-prefix')
  async invalidatePrefix(@Body() body: { prefix: string }) {
    await this.redisService.invalidateByPrefix(body.prefix);
    return {
      status: 'success',
      message: `Cache con prefijo '${body.prefix}' marcado para invalidación`,
    };
  }
}