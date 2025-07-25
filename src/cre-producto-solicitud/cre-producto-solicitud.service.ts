import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreProductoSolicitud } from './entities/cre-producto-solicitud.entity';

@Injectable()
export class CreProductoSolicitudService {
  constructor(
    @InjectRepository(CreProductoSolicitud)
    private readonly creProductoSolicitudRepository: Repository<CreProductoSolicitud>,
  ) {}

  async findAll(): Promise<CreProductoSolicitud[]> {
    return this.creProductoSolicitudRepository.find();
  }
}
