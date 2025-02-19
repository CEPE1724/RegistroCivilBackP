import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compraencuesta } from './entities/compraencuesta.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CompraencuestaService {

  private readonly logger = new Logger('CompraencuestaService');

  constructor(
    @InjectRepository(Compraencuesta)
    private readonly compraencuestaReposiroty: Repository<Compraencuesta>,
  ) { }


  findAll(Estado: number) {
    return this.compraencuestaReposiroty.find({ where: { Estado } });
  }
  

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}