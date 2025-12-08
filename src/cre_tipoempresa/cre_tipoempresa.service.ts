import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCreTipoempresaDto } from './dto/create-cre_tipoempresa.dto';
import { UpdateCreTipoempresaDto } from './dto/update-cre_tipoempresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreTipoempresa } from './entities/cre_tipoempresa.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';


@Injectable()
export class CreTipoempresaService {

	private readonly logger = new Logger('CreTipoempresaService');

	constructor(
		@InjectRepository(CreTipoempresa)
		private readonly creTipoempresaRepository: Repository<CreTipoempresa>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) { }

	async findAll() {
		const cacheKey = 'cre_tipoempresa_all';
		const cached = await this.cacheManager.get<CreTipoempresa[]>(cacheKey);
		if (cached) {
			this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
			return cached;
		}
		this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
		const result = await this.creTipoempresaRepository.find();
		await this.cacheManager.set(cacheKey, result, CacheTTL.cre_tipoempresa);
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
