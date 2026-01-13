import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTiemposolicitudeswebDto } from './dto/create-tiemposolicitudesweb.dto';
import { UpdateTiemposolicitudeswebDto } from './dto/update-tiemposolicitudesweb.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TiempoSolicitudesWeb } from './entities/tiemposolicitudesweb.entity';
@Injectable()
export class TiemposolicitudeswebService {
    private readonly logger = new Logger('TiemposolicitudeswebService');
  
    constructor(
      @InjectRepository(TiempoSolicitudesWeb)
      private readonly tiemposolicitudeswebRepository: Repository<TiempoSolicitudesWeb>
    ) { }

    
  create(createTiemposolicitudeswebDto: CreateTiemposolicitudeswebDto) {
    return this.tiemposolicitudeswebRepository.save(createTiemposolicitudeswebDto);
  }


  findAllTipo(idCre_SolicitudWeb: number , tipo: number) {
    return this.tiemposolicitudeswebRepository.find({
      where: {
        idCre_SolicitudWeb: idCre_SolicitudWeb,
        Tipo: tipo
      },
      order: {
        FechaSistema: 'DESC'
      }
    });
  }

  findAllTiempo(tipo: number, idCre_SolicitudWeb: number, idEstadoVerificacionDocumental: number[]) {
    return this.tiemposolicitudeswebRepository.find({
      where: {
        idCre_SolicitudWeb: idCre_SolicitudWeb,
        Tipo: tipo,
        idEstadoVerificacionDocumental: In(idEstadoVerificacionDocumental)
      },
      order: {
        FechaSistema: 'ASC'
      }
    });
  }

  findAll(idCre_SolicitudWeb: number) {
    return this.tiemposolicitudeswebRepository.find({
      where: {
        idCre_SolicitudWeb: idCre_SolicitudWeb
      },
      order: {
        FechaSistema: 'DESC'
      }
    });
  }

  

  findOne(id: number) {
    return `This action returns a #${id} tiemposolicitudesweb`;
  }

  update(id: number, updateTiemposolicitudeswebDto: UpdateTiemposolicitudeswebDto) {
    return `This action updates a #${id} tiemposolicitudesweb`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiemposolicitudesweb`;
  }
}
