import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cognotrabajocargo } from './entities/cognotrabajocargo.entity';
@Injectable()
export class CognotrabajocargoService {
  private readonly logger = new Logger('CognotrabajocargoService');

  constructor(
    @InjectRepository(Cognotrabajocargo)
    private readonly cognotrabajocargoReposiroty: Repository<Cognotrabajocargo>,
  ) { }

  findAll() {
    return this.cognotrabajocargoReposiroty.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }

}
