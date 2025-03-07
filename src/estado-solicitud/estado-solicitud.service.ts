import { Injectable } from '@nestjs/common';
import { CreateEstadoSolicitudDto } from './dto/create-estado-solicitud.dto';
import { UpdateEstadoSolicitudDto } from './dto/update-estado-solicitud.dto';
import { EstadoSolicitud } from './entities/estado-solicitud.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class EstadoSolicitudService {
private readonly logger = new Logger('EstadoSolicitudService');
  constructor(
    @InjectRepository(EstadoSolicitud)
    private readonly estadoSolicitudRepository: Repository<EstadoSolicitud>,
  ) { } 

 async finByEstado(idEstado: number) {
    return await this.estadoSolicitudRepository.find({
      where: { idEstado }, 
    });
  }
}
