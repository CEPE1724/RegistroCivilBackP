import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCboScoresCobranzaDto } from './dto/create-cbo-scores-cobranza.dto';
import { UpdateCboScoresCobranzaDto } from './dto/update-cbo-scores-cobranza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboScoresCobranza } from './entities/cbo-scores-cobranza.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CboScoresCobranzaService {
  private readonly logger = new Logger('CboScoresCobranzaService');
  constructor(
    @InjectRepository(CboScoresCobranza)
    private readonly cboScoresCobranzaRepository: Repository<CboScoresCobranza>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    const cacheKey = `cbo_scores_cobranza_all`;
    const cached = await this.cacheManager.get<CboScoresCobranza[]>(cacheKey);
    if (cached) {
        this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
        return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.cboScoresCobranzaRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_scores_cobranza);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
   
    return result;
  }
}
