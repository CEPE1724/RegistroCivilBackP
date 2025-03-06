import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreNiveleducacion } from './entities/cre_niveleducacion.entity';

@Injectable()
export class CreNiveleducacionService {
  /* control de errores y ubicaicondel archivo*/
  private readonly logger = new Logger('CreTipodocumentoService');

  constructor(
    @InjectRepository(CreNiveleducacion)
    private readonly creNiveleducacionRepository: Repository<CreNiveleducacion>,
  )
  { }


  findAll() {
    return this.creNiveleducacionRepository.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}
