import { BadRequestException,Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreActividadeconomina } from './entities/cre_actividadeconomina.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
@Injectable()
export class CreActividadeconominaService {

   private readonly logger = new Logger('CreActividadeconominaService');
 
   constructor(
      @InjectRepository(CreActividadeconomina)
      private readonly creActividadeconominaReposiroty: Repository<CreActividadeconomina>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

  async findAll(Tipo: number) {
    
    let itipo = Tipo;
    if (Tipo === 5)  itipo = 2;
    const cacheKey = `creactividadeconomina-all:${itipo}`;
    const cached = await this.cacheManager.get<CreActividadeconomina[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const data = await this.creActividadeconominaReposiroty.find({ where: { Tipo: itipo } });
    await this.cacheManager.set(cacheKey, data, CacheTTL.cre_actividadeconomina); // Cache por 1 hora
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
