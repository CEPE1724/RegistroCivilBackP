import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboSegmentoDto } from './dto/create-cbo-segmento.dto';
import { UpdateCboSegmentoDto } from './dto/update-cbo-segmento.dto';
import { CboSegmento } from './entities/cbo-segmento.entity';

@Injectable()
export class CboSegmentosService {
  private readonly logger = new Logger('CboSegmentosService');

  constructor(
    @InjectRepository(CboSegmento)
    private readonly cboSegmentoRepository: Repository<CboSegmento>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(createCboSegmentoDto: CreateCboSegmentoDto) {
    return 'This action adds a new cboSegmento';
  }

  async findAll(cbo_segmento: string) {
      const cacheKey = `cbo_segmentos_all_${cbo_segmento || 'all'}`;
      const cached = await this.cacheManager.get<CboSegmento[]>(cacheKey);
      if (cached) {
          this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
          return cached;
      }
      this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
      let result: CboSegmento[];
      if (cbo_segmento) {
          result = await this.cboSegmentoRepository.find({
              where: { sCbo_Scores_Cobranzas: cbo_segmento },
          });
      }
      else {
          result = await this.cboSegmentoRepository.find();
      }
      await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_segmentos);
      this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }


  findOne(id: number) {
    return `This action returns a #${id} cboSegmento`;
  }

  update(id: number, updateCboSegmentoDto: UpdateCboSegmentoDto) {
    return `This action updates a #${id} cboSegmento`;
  }

  remove(id: number) {
    return `This action removes a #${id} cboSegmento`;
  }
}


