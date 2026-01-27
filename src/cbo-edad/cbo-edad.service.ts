import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboEdadDto } from './dto/create-cbo-edad.dto';
import { UpdateCboEdadDto } from './dto/update-cbo-edad.dto';
import { CboEdad } from './entities/cbo-edad.entity';

@Injectable()
export class CboEdadService {
  private readonly logger = new Logger('CboEdadService');

  constructor(
    @InjectRepository(CboEdad)
    private readonly cboEdadRepository: Repository<CboEdad>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }
 
  async findAll(sCbo_Scores_Cobranzas: string) {
    const cacheKey = `cbo_edad_all_${sCbo_Scores_Cobranzas || 'all'}`;
    const cached = await  this.cacheManager.get<CboEdad[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    let result: CboEdad[];
    if (sCbo_Scores_Cobranzas) {
      result = await this.cboEdadRepository.find({
        where: { sCbo_Scores_Cobranzas },
      });
    }
    else {
      result = await this.cboEdadRepository.find();
    }
    await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_edad);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
}