import { Injectable, Inject } from '@nestjs/common';
import { CreateCreTipocalificacionDto } from './dto/create-cre-tipocalificacion.dto';
import { UpdateCreTipocalificacionDto } from './dto/update-cre-tipocalificacion.dto';
import {CreTipocalificacion} from './entities/cre-tipocalificacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
@Injectable()
export class CreTipocalificacionService {

   private readonly logger = new Logger('CreTipocalificacionService');
   constructor(
     @InjectRepository(CreTipocalificacion)
     private readonly cretipocalificacionrepository: Repository<CreTipocalificacion>,
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
   ) { }

 async findAll() {
    const cacheKey = 'cre-tipocalificacion-findAll';
    const cached = await this.cacheManager.get<CreTipocalificacion[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.cretipocalificacionrepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_tipocalificacion ); // Cache por tiempo definido
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

 
}
