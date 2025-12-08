import { Injectable, Inject, Logger } from '@nestjs/common';
import { Nomina } from './entities/nomina.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CacheTTL } from '../common/cache-ttl.config';
@Injectable()
export class NominaService {
  private readonly logger = new Logger(NominaService.name);
  constructor(
    @InjectRepository(Nomina)
    private readonly nominaRepository: Repository<Nomina>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  findOne(Codigo: string) {
    return this.nominaRepository.findOne({ where: { Codigo: Codigo } });
  }

  async findOneId(id: number) {
    const cacheKey = `nomina-id:${id}`;

    // Verificar cache
    const cached = await this.cacheManager.get<Nomina>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }

    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

    // Consultar base de datos
    const nomina = await this.nominaRepository.findOne({ where: { idPersonal: id } });

    // Guardar en cache (30 minutos)
    await this.cacheManager.set(cacheKey, nomina, CacheTTL.nominaById);

    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);

    return nomina;
  }


  // Método para recuperar email por código y cédula
  findEmailByCodigoAndCedula(codigo: string, cedula: string) {
    return this.nominaRepository.findOne({
      where: {
        Codigo: codigo,
        NIdentificacion: parseInt(cedula),
      },
      select: ['EMail', 'idCom_Estado']
    });
  }
}
