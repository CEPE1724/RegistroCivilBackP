import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTiempo } from './entities/cre_tiempo.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
@Injectable()
export class CreTiempoService {

  private readonly logger = new Logger('CreTiempoService');

  constructor(
    @InjectRepository(CreTiempo)
    private readonly creTiempoReposiroty: Repository<CreTiempo>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }


  async findAll(Activo: number) {
    const cacheKey = `cretiempo-all:${Activo}`;
    if (Activo === undefined) {
      throw new BadRequestException('El estado es requerido');
    }
    const cached = await this.cacheManager.get<CreTiempo[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const data = await this.creTiempoReposiroty.find({ where: { Activo } });
    await this.cacheManager.set(cacheKey, data, CacheTTL.creTiempo); // Cache por 30 minutos
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return data;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }


}
