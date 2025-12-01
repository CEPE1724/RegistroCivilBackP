import { Inject, Injectable } from '@nestjs/common';
import { CreateCreParroquiaDto } from './dto/create-cre_parroquia.dto';
import { UpdateCreParroquiaDto } from './dto/update-cre_parroquia.dto';
import { CreParroquia } from './entities/cre_parroquia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreParroquiaService {
private readonly logger = new Logger('CreParroquiaService');
constructor(
  @InjectRepository(CreParroquia)
  private readonly creParroquiaRepository: Repository<CreParroquia>,
  @Inject(CACHE_MANAGER) private cacheManager: Cache,
) { }
async findByCanton(idCanton: number) {
  const cacheKey = `cre_parroquia_canton_${idCanton}`;
  const cached = await this.cacheManager.get<CreParroquia[]>(cacheKey);
  if (cached) {
    this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
    return cached;
  }
  this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
  const result = await this.creParroquiaRepository.find({
    where: { idCanton }, // Filtramos las parroquias que pertenezcan a ese cantón
  });
  await this.cacheManager.set(cacheKey, result, CacheTTL.cre_parroquia); // Cache por tiempo definido
  this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
  return result;
}
}
