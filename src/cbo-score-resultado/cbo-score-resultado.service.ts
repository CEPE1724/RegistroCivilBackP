import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboScoreResultadoDto } from './dto/create-cbo-score-resultado.dto';
import { UpdateCboScoreResultadoDto } from './dto/update-cbo-score-resultado.dto';
import { CboScoreResultado } from './entities/cbo-score-resultado.entity';

@Injectable()
export class CboScoreResultadoService {
  private readonly logger = new Logger('CboScoreResultadoService');

  constructor(
    @InjectRepository(CboScoreResultado)
    private readonly cboScoreResultadoRepository: Repository<CboScoreResultado>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async findAll(sCbo_Scores_Cobranzas: string) {
    const cacheKey = `cbo_score_resultado_all_${sCbo_Scores_Cobranzas || 'all'}`;
    const cached = await this.cacheManager.get<CboScoreResultado[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    let result: CboScoreResultado[];
    if (sCbo_Scores_Cobranzas) {
      result = await this.cboScoreResultadoRepository.find({
        where: { sCbo_Scores_Cobranzas },
      });
    }
    else {
      result = await this.cboScoreResultadoRepository.find();
    }
    await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_score_resultado);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
}

