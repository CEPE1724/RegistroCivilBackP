import { Injectable, Inject } from '@nestjs/common';
import { CreateTipoClienteDto } from './dto/create-tipo-cliente.dto';
import { UpdateTipoClienteDto } from './dto/update-tipo-cliente.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { TipoCliente } from './entities/tipo-cliente.entity'; 
@Injectable()
export class TipoClienteService {
  private readonly logger = new Logger('TipoClienteService');
  constructor(
    @InjectRepository(TipoCliente)
    private readonly tipoClienteRepository: Repository<TipoCliente>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }
  

  async findAll() {
    const cacheKey = 'tipo-cliente-findAll';
    const cached = await this.cacheManager.get<TipoCliente[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.tipoClienteRepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.tipo_cliente ); // Cache por tiempo definido
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
}


