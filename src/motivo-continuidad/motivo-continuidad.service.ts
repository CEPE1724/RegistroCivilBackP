import { Injectable,Inject, Logger } from '@nestjs/common';
import { MotivoContinuidadEntity } from './entities/motivo-continuidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
@Injectable()
export class MotivoContinuidadService {
  private readonly logger = new Logger('MotivoContinuidadService');
  constructor(
    @InjectRepository(MotivoContinuidadEntity)
    private readonly motivoContinuidadRepository: Repository<MotivoContinuidadEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

 async  findAll() {
    const cacheKey = `motivo-continuidad-all`;
    const cached = await this.cacheManager.get<MotivoContinuidadEntity[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const data = await this.motivoContinuidadRepository.find();
    await this.cacheManager.set(cacheKey, data, CacheTTL.motivoContinuidad); // Cache por 48 horas
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return data;
  }

}
