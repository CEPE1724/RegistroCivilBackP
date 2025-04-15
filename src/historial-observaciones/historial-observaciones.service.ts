import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateHistorialObservacioneDto } from './dto/create-historial-observacione.dto';
import { UpdateHistorialObservacioneDto } from './dto/update-historial-observacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentosSolicitud } from 'src/documentos-solicitud/entities/documentos-solicitud.entity';
import { HistorialObservaciones } from 'src/documentos-solicitud/entities/historial-observaciones.entity';

@Injectable()
export class HistorialObservacionesService {
  private readonly logger = new Logger('HistorialObservacionesService');

  constructor(
    @InjectRepository(HistorialObservaciones)
    private readonly historialObservacionesRepository: Repository<HistorialObservaciones>
  ) { }

  async create(createHistorialObservacioneDto: CreateHistorialObservacioneDto) {
    return this.historialObservacionesRepository.save(createHistorialObservacioneDto).catch((error) => {
      this.handleDBException(error);
  }
    );
  }

  findAll() {
    return this.historialObservacionesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} historialObservacione`;
  }

  update(id: number, updateHistorialObservacioneDto: UpdateHistorialObservacioneDto) {
    return `This action updates a #${id} historialObservacione`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }

}
