import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CacheTTL } from '../common/cache-ttl.config';
import { UsuarioBodega } from './entities/usuario-bodega.entity';
import { Usuario } from './entities/usuario.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';
@Injectable()
export class UsuarioBodegaService {
  private readonly logger = new Logger(UsuarioBodegaService.name);
  constructor(
    @InjectRepository(UsuarioBodega)
    private usuarioBodegaRepository: Repository<UsuarioBodega>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Almacen)
    private almacenRepository: Repository<Almacen>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,


  ) { }

  async getBodegasByUser(
    idUsuario: number,
    idTipoFactura: number,
    fecha: Date = new Date(),
    recibeConsignacion: boolean = false,
  ): Promise<{ Codigo: string, Nombre: string, Bodega: number }[]> {
    const cacheKey = `bodegas-user:${idUsuario}:${idTipoFactura}:${recibeConsignacion}`;

    // Verificar cache
    const cached = await this.cacheManager.get<{ Codigo: string, Nombre: string, Bodega: number }[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }

    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

    const queryBuilder = this.almacenRepository
      .createQueryBuilder('b')
      .select(['b.Codigo', 'b.Nombre', 'b.Bodega'])
      .innerJoin(UsuarioBodega, 'ub', 'ub.Bodega = b.Bodega')
      .innerJoin(Usuario, 'u', 'u.idUsuario = ub.idUsuario')
      .where('u.idUsuario = :idUsuario', { idUsuario })
      .andWhere('b.CrediDigital = 1') // Solo bodegas con CrediDigital = 1

    queryBuilder.orderBy('b.Nombre', 'ASC');

    const data = await queryBuilder.getRawMany();

    // Guardar en cache (30 minutos)
    await this.cacheManager.set(cacheKey, data, CacheTTL.bodegasUsuario);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);

    return data;


  }
}
