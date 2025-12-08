import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreNacionalidad } from './entities/cre_nacionalidad.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreNacionalidadService {
  
	private readonly logger = new Logger('CreNacionalidadService');

	constructor(
		@InjectRepository(CreNacionalidad)
		private readonly creNacionalidadRepository: Repository<CreNacionalidad>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) { }

  async findAll() {
    const cacheKey = 'cre-nacionalidad-findAll';
    const cached = await this.cacheManager.get<CreNacionalidad[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creNacionalidadRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_nacionalidad ); // Cache por tiempo definido
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }

  private handleDBExceptions(error: any) {
	if (error.code === '23505') {
		throw new BadRequestException(error.detail);
	}

	this.logger.error(error);
	throw new InternalServerErrorException('Error al guardar los datos');
}

}
