import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalBdd } from './entities/personal-bdd.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class PersonalBddService {
  private readonly logger = new Logger('PersonalBddService');

  constructor(
    @InjectRepository(PersonalBdd)
    private readonly personalbddrepository: Repository<PersonalBdd>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private buildQueryByGrupo(nombre: string, grupo: number) {
    const qb = this.personalbddrepository.createQueryBuilder('p');
    qb.leftJoin('p.usuario', 'u');
    if (grupo === 19 || grupo === 33) {
      qb.where('p.codigo = :codigo', { codigo: nombre });
    } else if (grupo === 31) {
      qb.where('u.idGrupo = :grupo', { grupo: 33 });
    } else {
      qb.where('u.idGrupo IN (:...grupos)', { grupos: [19, 33] });
    }
    qb.addSelect(['u.idGrupo AS "idGrupo"']);
    qb.orderBy('p.apellidoPaterno', 'ASC');
    return qb;
  }

  async findAllgestor(usuarioAutenticado: { nombre: string; grupo: number }) {
    const cacheKey = `personal_bdd_gestor_${usuarioAutenticado.nombre}_${usuarioAutenticado.grupo}`;
    const cached = await this.cacheManager.get<any[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

    const result = await this.buildQueryByGrupo(usuarioAutenticado.nombre, usuarioAutenticado.grupo).getRawAndEntities();
    const response = result.entities.map((item, idx) => ({
      ...item,
      idGrupo: result.raw[idx]?.idGrupo ?? null
    }));
    await this.cacheManager.set(cacheKey, response, CacheTTL.personal_bdd);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return response;
  }
}