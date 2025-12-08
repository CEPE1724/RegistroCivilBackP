import { BadRequestException, Inject,Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreCiudadinmueble } from './entities/cre_ciudadinmueble.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreCiudadinmuebleService {

	private readonly logger = new Logger('CreCiudadinmuebleService');

	constructor(
			@InjectRepository(CreCiudadinmueble)
			private readonly creCiudadinmuebleRepository: Repository<CreCiudadinmueble>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) { }
	

  async findAll() {
    const cacheKey = 'cre_ciudadinmueble_all';
    const cached = await this.cacheManager.get<CreCiudadinmueble[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creCiudadinmuebleRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_ciudadinmueble);
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
