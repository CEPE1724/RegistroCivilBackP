import { Injectable, Logger } from '@nestjs/common';
import { MotivoContinuidadEntity } from './entities/motivo-continuidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MotivoContinuidadService {
  private readonly logger = new Logger('MotivoContinuidadService');
  constructor(
    @InjectRepository(MotivoContinuidadEntity)
    private readonly motivoContinuidadRepository: Repository<MotivoContinuidadEntity>,
  ) { }

  findAll() {
    return this.motivoContinuidadRepository.find();
  }

}
