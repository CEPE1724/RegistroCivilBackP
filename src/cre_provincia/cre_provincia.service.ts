import { Inject, Injectable } from '@nestjs/common';
import { CreateCreProvinciaDto } from './dto/create-cre_provincia.dto';
import { UpdateCreProvinciaDto } from './dto/update-cre_provincia.dto';
import {CreProvincia} from './entities/cre_provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';

@Injectable()
export class CreProvinciaService {


 private readonly logger = new Logger('CreProvinciaService');

  constructor(
    @InjectRepository(CreProvincia)
    private readonly creprovinicarepository: Repository<CreProvincia>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async findAll() {
    const cacheKey = 'cre_provincia_all';
    const cached = await this.cacheManager.get<CreProvincia[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
    const result = await this.creprovinicarepository.find();
    await this.cacheManager.set(cacheKey, result, CacheTTL.cre_provincia);
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return result;
  }
  

  findOne(id: number) {
    return `This action returns a #${id} creProvincia`;
  }

  update(id: number, updateCreProvinciaDto: UpdateCreProvinciaDto) {
    return `This action updates a #${id} creProvincia`;
  }

  remove(id: number) {
    return `This action removes a #${id} creProvincia`;
  }
}
