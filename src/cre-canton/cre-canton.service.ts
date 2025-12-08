import { Inject, Injectable } from '@nestjs/common';
import { CreateCreCantonDto } from './dto/create-cre-canton.dto';
import { UpdateCreCantonDto } from './dto/update-cre-canton.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreCanton } from './entities/cre-canton.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreCantonService {

 private readonly logger = new Logger('CreCantonService');

constructor(
  @InjectRepository(CreCanton)
  private readonly creCantonRepository: Repository<CreCanton>,
  @Inject(CACHE_MANAGER) private cacheManager: Cache,
) { }

async findByProvincia(idProvincia: number) {
  const cacheKey = `cre_canton_provincia_${idProvincia}`;
  const cached = await this.cacheManager.get<CreCanton[]>(cacheKey);
  if (cached) {
    this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
    return cached;
  }
  this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
  const result = await this.creCantonRepository.find({
    where: { idProvincia }, // Filtramos los cantones que pertenezcan a esa provincia
  });
  await this.cacheManager.set(cacheKey, result, CacheTTL.cre_canton); // Cache por tiempo definido
  this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
  return result;
}
}
