import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreInmueble } from './entities/cre_inmueble.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreInmuebleService {

	private readonly logger = new Logger('CreInmuebleService');

	constructor(
		@InjectRepository(CreInmueble)
		private readonly creInmuebleRepository: Repository<CreInmueble>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) { }

	async findAll() {
		const cacheKey = 'cre_inmueble_all';
		const cached = await this.cacheManager.get<CreInmueble[]>(cacheKey);
		if (cached) {
			this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
			return cached;
		}
		this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
		const result = await this.creInmuebleRepository.find();
		await this.cacheManager.set(cacheKey, result, CacheTTL.cre_inmueble);
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
