import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboRiesgoDto } from './dto/create-cbo-riesgo.dto';
import { UpdateCboRiesgoDto } from './dto/update-cbo-riesgo.dto';
import { CboRiesgoestado } from './entities/cbo-riesgo.entity';

@Injectable()
export class CboRiesgoService {
  private readonly logger = new Logger('CboRiesgoService');

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(CboRiesgoestado) private readonly cboRiesgoRepository: Repository<CboRiesgoestado>,
  ) {}

  async findAll() {
     const cacheKey = `cbo_riesgo_all_estado`;
     const cached = await this.cacheManager.get<CboRiesgoestado[]>(cacheKey);
      if (cached) {
          this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
          return cached;
      }
      this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
      const result = await this.cboRiesgoRepository.find();
      await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_riesgo_estado);
      this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
      return result;
  }

  
}
