import { Injectable } from '@nestjs/common';
import { CreateTipoTrabajoDto } from './dto/create-tipo-trabajo.dto';
import { UpdateTipoTrabajoDto } from './dto/update-tipo-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoTrabajo } from './entities/tipo-trabajo.entity';
import { Logger } from '@nestjs/common';
@Injectable()
export class TipoTrabajoService {
 
  private readonly logger = new Logger('TipoTrabajoService');
  constructor(@InjectRepository
  (TipoTrabajo)
  private readonly tipotrabajorepository: Repository<TipoTrabajo>,
  ) { }

  findAll() {
    return this.tipotrabajorepository.find();
  }


}
