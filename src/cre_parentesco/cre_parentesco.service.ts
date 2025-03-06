import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreParentesco } from './entities/cre_parentesco.entity';


@Injectable()
export class CreParentescoService {
  /* control de errores y ubicacion del archivo*/
  private readonly logger = new Logger('CreParentescoService');

  constructor(
    @InjectRepository(CreParentesco)
    private readonly creParentescoRepository: Repository<CreParentesco>,
  ) { }

  findAll() {
    return this.creParentescoRepository.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }
}
