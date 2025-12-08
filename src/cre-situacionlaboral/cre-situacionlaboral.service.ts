import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCreSituacionlaboralDto } from './dto/create-cre-situacionlaboral.dto';
import { UpdateCreSituacionlaboralDto } from './dto/update-cre-situacionlaboral.dto';
import { CreSituacionlaboral } from './entities/cre-situacionlaboral.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CreSituacionlaboralService {
   private readonly logger = new Logger('CreSituacionlaboralService');
  
   constructor(
      @InjectRepository(CreSituacionlaboral)
      private readonly creSituacionlaboralRepository: Repository<CreSituacionlaboral>,
      @Inject(CACHE_MANAGER) private cacheManager: Cache,   
    ) { }

  async findAll() {
    const cacheKey = 'cre-situacionlaboral-all';

    // Verificar cache
    const cached = await this.cacheManager.get<CreSituacionlaboral[]>(cacheKey);
    if (cached) {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);
   
   
    const data = await this.creSituacionlaboralRepository.find({
      where: {
        idEntidadFinanciera: 4,
        
      },
    });
    await this.cacheManager.set(cacheKey, data,1800000); // Cache por 30 minutos
    this.logger.log(`💾 Datos guardados en Redis para: ${cacheKey}`);
    return data;
  }

  private handleDBException(error: any) {
     if (error.code === '23505') {
       throw new BadRequestException(error.detail);
     }
     this.logger.error(error);
     throw new InternalServerErrorException('Unexpected error');
 
   }
}
