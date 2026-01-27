import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboGestorCobranzas } from '../Cbo_Gestor_Cobranzas/cbo-gestor-cobranzas.entity';
import { CboGestores } from './cbo-gestores.entity';
import { CboGestoresEstrategia } from '../Cbo_Gestores_Estrategia/Cbo_Gestores_Estrategia.entity';
import {ResponseDto} from './cbo-gestores.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CboGestoresService {
    private readonly logger = new Logger('CboGestoresService');
  constructor(
    @InjectRepository(CboGestores)
    private cboGestoresRepository: Repository<CboGestores>,
     @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(cboGestores: Partial<CboGestores>): Promise<CboGestores> {
    const newCboGestor = this.cboGestoresRepository.create(cboGestores);
    return this.cboGestoresRepository.save(newCboGestor);
  }

 
  async findAll(): Promise<ResponseDto<CboGestores[]>> {
    const cacheKey = `cbo_gestores_all`;
    const cached = await this.cacheManager.get<CboGestores[]>(cacheKey);
    if (cached) {
        this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
        return new ResponseDto(200, 'Registros obtenidos con éxito', cached);
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const cboGestores = await this.cboGestoresRepository.find();
    await this.cacheManager.set(cacheKey, cboGestores, CacheTTL.cbo_gestores);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return new ResponseDto(200, 'Registros obtenidos con éxito', cboGestores);
  }
  async findOne(id: number): Promise<CboGestores> {
    return this.cboGestoresRepository.findOneBy({ idCbo_Gestores: id });
  }

  async update(id: number, cboGestores: Partial<CboGestores>): Promise<CboGestores> {
    await this.cboGestoresRepository.update(id, cboGestores);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cboGestoresRepository.delete(id);
  }
}
