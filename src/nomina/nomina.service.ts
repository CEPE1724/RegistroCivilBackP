import { Injectable } from '@nestjs/common';
import {Nomina} from './entities/nomina.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class NominaService {

  constructor(
    @InjectRepository(Nomina)
    private readonly nominaRepository: Repository<Nomina>,
  ) {}

  findOne(Codigo: string) {
    return  this.nominaRepository.findOne({ where: { Codigo: Codigo } });
  }

}
