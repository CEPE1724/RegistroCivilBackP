import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCupoCreditoDto } from './dto/create-cupo-credito.dto';
import { UpdateCupoCreditoDto } from './dto/update-cupo-credito.dto';
import { CupoCredito } from './entities/cupo-credito.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
@Injectable()
export class CupoCreditoService {
  private readonly logger = new Logger('CupoCreditoService');
  constructor(
    @InjectRepository(
      CupoCredito,
    )
    private readonly cupoCreditoRepository: Repository<CupoCredito>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  async findAll() {
     
    const cacheKey = 'cupo-credito-findAll';
    const cached = await this.cacheManager.get<CupoCredito[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.cupoCreditoRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cupo_credito );
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
}
