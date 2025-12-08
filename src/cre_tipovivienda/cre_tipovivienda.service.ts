import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTipovivienda } from './entities/cre_tipovivienda.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreTipoviviendaService {
  
	  private readonly logger = new Logger('CreTipoviviendaService');

  async findAll() {
    const cacheKey = 'cre_tipovivienda_all';
    const cached = await this.cacheManager.get<CreTipovivienda[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creTipoviviendaRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_tipovivienda);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

  constructor(
	@InjectRepository(CreTipovivienda)
	private readonly creTipoviviendaRepository: Repository<CreTipovivienda>,
	@Inject(CACHE_MANAGER) private cacheManager: Cache,
	  ) { }

  private handleDBExceptions(error: any) {
	  if (error.code === '23505') {
		throw new BadRequestException(error.detail);
	  }
  
	  this.logger.error(error);
	  throw new InternalServerErrorException('Error al guardar los datos');
	}

}
