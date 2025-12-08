import { Injectable, Inject, Logger } from "@nestjs/common";
import { Cbo_EstadosTipoContactoEntity } from "./Cbo_EstadosTipoContacto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class Cbo_EstadosTipoContactoService {
    private readonly logger = new Logger('Cbo_EstadosTipoContactoService');
    constructor(
        @InjectRepository(Cbo_EstadosTipoContactoEntity)
        private readonly repository: Repository<Cbo_EstadosTipoContactoEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    //obtener un registro por id

    async find(idCbo_EstadoGestion: number): Promise<Cbo_EstadosTipoContactoEntity[]> {
        const cacheKey = `cbo_estados_tipo_contacto_${idCbo_EstadoGestion}`;
        const cached = await this.cacheManager.get<Cbo_EstadosTipoContactoEntity[]>(cacheKey);
        if (cached) {
            this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
            return cached;
        }
        this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
        const result = await this.repository.find({ where: { idCbo_EstadoGestion } });
        await this.cacheManager.set(cacheKey, result, CacheTTL.cbo_estados_tipo_contacto); // Cache por tiempo definido
        this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
        return result;
    }

}