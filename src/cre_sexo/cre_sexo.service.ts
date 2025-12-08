import { BadRequestException,Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';


import { CreSexo } from './entities/cre_sexo.entity';

@Injectable()
export class CreSexoService {
   /* control de errores y ubicaicondel archivo*/
   private readonly logger = new Logger('CreTipodocumentoService');

  constructor(
    @InjectRepository(CreSexo)
    private readonly creSexoRepository: Repository<CreSexo>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  )
   { }

  async findAll() {
    const cacheKey = 'cre-sexo-findAll';
    const cached = await this.cacheManager.get<CreSexo[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creSexoRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_sexo ); // Cache por tiempo definido
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }
}
