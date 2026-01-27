import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboSaldoDto } from './dto/create-cbo-saldo.dto';
import { UpdateCboSaldoDto } from './dto/update-cbo-saldo.dto';
import { CboSaldo } from './entities/cbo-saldo.entity';
@Injectable()
export class CboSaldosService {
    private readonly logger = new Logger('CboSaldosService');
  constructor(
    @InjectRepository(CboSaldo)
    private readonly cboSaldoRepository: Repository<CboSaldo>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }
    
  async findAll(sCbo_Scores_Cobranzas: string) {
   const cacheKey = `cbo_saldos_all_${sCbo_Scores_Cobranzas || 'all'}`;
   const cached = await  this.cacheManager.get<CboSaldo[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    let result: CboSaldo[];
    if (sCbo_Scores_Cobranzas) {
      result = await this.cboSaldoRepository.find({
        where: { sCbo_Scores_Cobranzas },
      });
    }
    else {
      result = await this.cboSaldoRepository.find();
    }

    await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_saldos);

    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);

    return result;
  }
}
