import { Injectable, Inject, Logger } from "@nestjs/common";
import { Cbo_EstadosGestionEntity } from "./Cbo_EstadosGestion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { Cache } from 'cache-manager';
@Injectable()
export class Cbo_EstadosGestionService {
 
 private readonly logger = new Logger('Cbo_EstadosGestionService');

    constructor(
        @InjectRepository(Cbo_EstadosGestionEntity)
        private readonly repository: Repository<Cbo_EstadosGestionEntity>, 
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

//obtener todos los registros

    async findAll(): Promise<Cbo_EstadosGestionEntity[]> {
        const cacheKey = 'cbo_estados_gestion_all';
        const cached = await this.cacheManager.get<Cbo_EstadosGestionEntity[]>(cacheKey);
        if (cached) {
            this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
          return cached;
        }
        this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
        const result = await this.repository.find(
            {
                where: { Activo: true },
            }
        );
        await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_estados_gestion ); // Cache por tiempo definido
        this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
        return result;
    }
}