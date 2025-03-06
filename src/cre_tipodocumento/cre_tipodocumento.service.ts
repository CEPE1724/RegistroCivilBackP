import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTipodocumento } from './entities/cre_tipodocumento.entity';

@Injectable()
export class CreTipodocumentoService {
 /* control de errores y ubicaicondel archivo*/
  private readonly logger = new Logger('CreTipodocumentoService');

 constructor(
   @InjectRepository(CreTipodocumento)
   private readonly creTipodocumentoRepository: Repository<CreTipodocumento>,
 )
  { }

  findAll() {
    return this.creTipodocumentoRepository.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}
