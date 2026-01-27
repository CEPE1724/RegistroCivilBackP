import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCboAlmaceneDto } from './dto/create-cbo-almacene.dto';
import { UpdateCboAlmaceneDto } from './dto/update-cbo-almacene.dto';
import { CboAlmacenes } from './entities/cbo-almacene.entity';
import { BodegaService } from 'src/Bodega/bodega.service';
@Injectable()
export class CboAlmacenesService {
  private readonly logger = new Logger('CboAlmacenesService');

  constructor(
    @InjectRepository(CboAlmacenes)
    private readonly cboAlmacenesRepository: Repository<CboAlmacenes>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly bodegaService: BodegaService
  ) { }
  create(createCboAlmaceneDto: CreateCboAlmaceneDto) {
    return 'This action adds a new cboAlmacene';
  }

  async findAll(cbo_almacenes: string) {
    const cacheKey = `cbo_almacenes_all_${cbo_almacenes || 'all'}`;
    const cached = await this.cacheManager.get<CboAlmacenes[]>(cacheKey);

    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }

    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

    let result: CboAlmacenes[];

    if (cbo_almacenes) {
      result = await this.cboAlmacenesRepository.find({
        where: { sCbo_Scores_Cobranzas: cbo_almacenes },
        
      });
    } else {
      result = await this.cboAlmacenesRepository.find();
    }

    await this.cacheManager.set(
      cacheKey,
      result,
      CacheTTL.cbo_almacenes,
    );

    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);

    return result;
  }




  findOne(id: number) {
    return `This action returns a #${id} cboAlmacene`;
  }

  update(id: number, updateCboAlmaceneDto: UpdateCboAlmaceneDto) {
    return `This action updates a #${id} cboAlmacene`;
  }

  remove(id: number) {
    return `This action removes a #${id} cboAlmacene`;
  }
}
