import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


import { CreSexo } from './entities/cre_sexo.entity';

@Injectable()
export class CreSexoService {
   /* control de errores y ubicaicondel archivo*/
   private readonly logger = new Logger('CreTipodocumentoService');

  constructor(
    @InjectRepository(CreSexo)
    private readonly creSexoRepository: Repository<CreSexo>,
  )
   { }

  findAll() {
    return this.creSexoRepository.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }
}
