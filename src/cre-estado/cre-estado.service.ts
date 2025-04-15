import { Injectable } from '@nestjs/common';
import { CreateCreEstadoDto } from './dto/create-cre-estado.dto';
import { UpdateCreEstadoDto } from './dto/update-cre-estado.dto';
import {CreEstado} from './entities/cre-estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class CreEstadoService {
  
  private readonly logger = new Logger('CreEstadoService');
  constructor(
    @InjectRepository(CreEstado)
    private readonly creestadorepository: Repository<CreEstado>,
  ) { }

  findAll() {
    return this.creestadorepository.find();
  }


}
