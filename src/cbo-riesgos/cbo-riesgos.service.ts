import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboRiesgoDto } from './dto/create-cbo-riesgo.dto';
import { UpdateCboRiesgoDto } from './dto/update-cbo-riesgo.dto';
import { CboRiesgo } from './entities/cbo-riesgo.entity';
@Injectable()
export class CboRiesgosService {
  private readonly logger = new Logger('CboRiesgosService');

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(CboRiesgo)
    private readonly cboRiesgoRepository: Repository<CboRiesgo>,
  ) {}
  create(createCboRiesgoDto: CreateCboRiesgoDto) {
    return 'This action adds a new cboRiesgo';
  }



  async findAll(cbo_gestorRiesgo: string) {
      const cacheKey = `cbo_riesgos_all_${cbo_gestorRiesgo || 'all'}`;
      const cached = await this.cacheManager.get<CboRiesgo[]>(cacheKey);
      if (cached) {
          this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
          return cached;
      }
      this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
      let result: CboRiesgo[];
      if (cbo_gestorRiesgo) {
          result = await this.cboRiesgoRepository.find({
              where: { sCbo_Scores_Cobranzas: cbo_gestorRiesgo },
          });
      } else {
          result = await this.cboRiesgoRepository.find();
      }
      await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_riesgos);
      this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
      return result;
  }

  update(id: number, updateCboRiesgoDto: UpdateCboRiesgoDto) {
    return `This action updates a #${id} cboRiesgo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cboRiesgo`;
  }
}
