import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreProfesion } from './entities/cre_profesion.entity';

@Injectable()
export class CreProfesionService {

  /* control de errores y ubicacion del archivo*/
  private readonly logger = new Logger('CreProfesionService');

  constructor(
    @InjectRepository(CreProfesion)
    private readonly creProfesionRepository: Repository<CreProfesion>,
  ) { }

  findAll() {
    return this.creProfesionRepository.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}
