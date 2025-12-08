import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTiempovivienda } from './entities/cre_tiempovivienda.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreTiempoviviendaService {
  
	private readonly logger = new Logger('CreTiempoviviendaService');

  async findAll() {
    const cacheKey = 'cre_tiempovivienda_all';
    const cached = await this.cacheManager.get<CreTiempovivienda[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creTiempoviviendaRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_tiempovivienda);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

  constructor(
	@InjectRepository(CreTiempovivienda)
	private readonly creTiempoviviendaRepository: Repository<CreTiempovivienda>,
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
