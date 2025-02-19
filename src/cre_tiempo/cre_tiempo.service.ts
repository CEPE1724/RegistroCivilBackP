import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreTiempo } from './entities/cre_tiempo.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CreTiempoService {

  private readonly logger = new Logger('CreTiempoService');

  constructor(
    @InjectRepository(CreTiempo)
    private readonly creTiempoReposiroty: Repository<CreTiempo>,
  ) { }


  findAll(Activo: number) {
    return this.creTiempoReposiroty.find({ where: { Activo } });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }


}
