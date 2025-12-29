import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCreEntidadFinancieraDto } from './dto/create-cre-entidad-financiera.dto';
import { UpdateCreEntidadFinancieraDto } from './dto/update-cre-entidad-financiera.dto';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreEntidadFinanciera } from './entities/cre-entidad-financiera.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class CreEntidadFinancieraService {
 private readonly logger = new Logger('CreEntidadFinancieraService');

 constructor(
  @InjectRepository(CreEntidadFinanciera)
  private readonly creEntidadFinancieraRepository: Repository<CreEntidadFinanciera>,
  @Inject(CACHE_MANAGER) private cacheManager: Cache,
 ) { }

  async findAll(activo: boolean) {
    const cacheKey = `cre_entidadfinanciera_cobranza_${activo}`;
    const cached = await this.cacheManager.get<CreEntidadFinanciera[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creEntidadFinancieraRepository.find({
      where: { Cobranza: activo },
    });
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_entidadfinanciera);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

  
}
