import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

/* importamos la entidad*/
import { CreEstadocivil } from './entities/cre_estadocivil.entity';

@Injectable()
export class CreEstadocivilService {
 
  /* control de errores y ubicaicondel archivo*/
  private readonly logger = new Logger('CreEstadocivilService');


  constructor(
     @InjectRepository(CreEstadocivil)
     private readonly creEstadocivilRepository: Repository<CreEstadocivil>,
     @Inject(CACHE_MANAGER) private cacheManager: Cache,
   )
    { }
  

  async findAll() {
    const cacheKey = 'cre_estadocivil_all';
    const cached = await this.cacheManager.get<CreEstadocivil[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creEstadocivilRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_estadocivil);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
/*en toda slos ervices por default se pega*/
  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }


}
