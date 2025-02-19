import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreActividadeconomina } from './entities/cre_actividadeconomina.entity';
@Injectable()
export class CreActividadeconominaService {

   private readonly logger = new Logger('CreActividadeconominaService');
 
   constructor(
      @InjectRepository(CreActividadeconomina)
      private readonly creActividadeconominaReposiroty: Repository<CreActividadeconomina>,
    ) { }

  findAll(Tipo: number) {
    return this.creActividadeconominaReposiroty.find({ where: { Tipo } });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

  
}
