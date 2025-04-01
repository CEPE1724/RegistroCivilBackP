import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Crectaedogestion } from './entities/crectaedogestion.entity';

@Injectable()
export class CrectaedogestionService {

   /* control de errores y ubicaicondel archivo*/
   private readonly logger = new Logger('CreTipodocumentoService');

   constructor(
      @InjectRepository(Crectaedogestion)
      private readonly crectaedogestionRepository: Repository<Crectaedogestion>,
    )
    { } 

  findAll() {
    return this.crectaedogestionRepository.find(
      {
        where: { activo: 1 }
      },
    );
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }
}
