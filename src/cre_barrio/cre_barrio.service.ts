import { Injectable, Inject } from '@nestjs/common';
import { CreateCreBarrioDto } from './dto/create-cre_barrio.dto';
import { UpdateCreBarrioDto } from './dto/update-cre_barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

import { CreBarrio } from './entities/cre_barrio.entity';
@Injectable()
export class CreBarrioService {
  private readonly logger = new Logger('CreBarrioService');
  constructor(
    @InjectRepository(CreBarrio)
    private readonly creBarrioRepository: Repository<CreBarrio>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }
  async findByParroquia(idParroquia: number) {
    const cacheKey = `cre_barrio_by_parroquia_${idParroquia}`;
    const cached = await this.cacheManager.get<CreBarrio[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creBarrioRepository.find({
      where: { idParroquia }, // Filtramos los barrios que pertenezcan a esa parroquia
    });
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_barrio);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
}
