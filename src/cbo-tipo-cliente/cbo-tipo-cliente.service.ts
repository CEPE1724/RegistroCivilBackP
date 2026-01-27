
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboTipoClienteDto } from './dto/create-cbo-tipo-cliente.dto';
import { UpdateCboTipoClienteDto } from './dto/update-cbo-tipo-cliente.dto';
import { CboTipoCliente } from './entities/cbo-tipo-cliente.entity';

@Injectable()
export class CboTipoClienteService {
  private readonly logger = new Logger('CboTipoClienteService');

  constructor(
    @InjectRepository(CboTipoCliente)
    private readonly cboTipoClienteRepository: Repository<CboTipoCliente>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }


  async findAll(sCbo_Scores_Cobranzas: string) {
    const cacheKey = `cbo_tipo_cliente_all_${sCbo_Scores_Cobranzas || 'all'}`;
    const cached = await  this.cacheManager.get<CboTipoCliente[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    let result: CboTipoCliente[];
    if (sCbo_Scores_Cobranzas) {
      result = await this.cboTipoClienteRepository.find({
        where: { sCbo_Scores_Cobranzas },
      });
    } else {
      result = await this.cboTipoClienteRepository.find();
    }
    await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_tipo_cliente);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
}
   