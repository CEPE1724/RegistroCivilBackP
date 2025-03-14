import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentosSolicitud } from './entities/documentos-solicitud.entity';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentoStatusDto } from './dto/update-documentos-solicitud.dto';
import { HistorialObservaciones } from './entities/historial-observaciones.entity';
import { CreateHistorialObservacionesDto } from './dto/create-historial-observacion.dto';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DocumentosSolicitudService {
  private readonly logger = new Logger('DocumentosSolicitudService');

  constructor(
    @InjectRepository(DocumentosSolicitud)
    private readonly documentosSolicitudRepository: Repository<DocumentosSolicitud>,
    @InjectRepository(HistorialObservaciones)
    private readonly historialObservacionesRepository: Repository<HistorialObservaciones>
  ) {}

  // Crear un nuevo documento
  async create(createDocumentosSolicitudDto: CreateDocumentosSolicitudDto): Promise<DocumentosSolicitud> {
    const documento = this.documentosSolicitudRepository.create(createDocumentosSolicitudDto);
    const observacion = createDocumentosSolicitudDto.Observacion;
    const idCresolicitud = createDocumentosSolicitudDto.idCre_SolicitudWeb;
    const idTipoDocumentoWEB = createDocumentosSolicitudDto.idTipoDocumentoWEB;

    const savedDocumento = await this.documentosSolicitudRepository.save(documento);
    const idDocumentosSolicitudWeb = savedDocumento.idDocumentosSolicitudWeb;

    console.log(savedDocumento); // Verifica que el documento se guardó correctamente

    // Crear y guardar la observación después de guardar el documento
    await this.createObservacion({
      idCre_SolicitudWeb: idCresolicitud,
      idDocumentosSolicitudWeb: idDocumentosSolicitudWeb,
      Observacion: observacion,
      Fecha: new Date(),
      TipoUsuario: 1, // Puedes cambiarlo según sea necesario
      idTipoDocumentoWEB: idTipoDocumentoWEB
    });

    return savedDocumento;
  }

  // Crear observación
  async createObservacion(createHistorialObservacionesDto: CreateHistorialObservacionesDto): Promise<HistorialObservaciones> {
    const observaciones = this.historialObservacionesRepository.create(createHistorialObservacionesDto);
    return await this.historialObservacionesRepository.save(observaciones);
  }

  // Buscar documentos por solicitud
  async findBySolicitud(idSolicitud: number) {
    return await this.documentosSolicitudRepository.find({
      where: { idCre_SolicitudWeb: idSolicitud, idEstadoDocumento: 1 }, // Filtramos los documentos que pertenezcan a esa solicitud
    });
  }
  // Actualizar estado del documento
  async update(id: number, updateDocumentoStatusDto: UpdateDocumentoStatusDto): Promise<DocumentosSolicitud> {
    const documento = await this.documentosSolicitudRepository.findOne({ where: { idDocumentosSolicitudWeb: id } });
  
    if (!documento) {
      throw new Error('Documento no encontrado');
    }
  
    // Solo actualizamos el idEstadoDocumento
    documento.idEstadoDocumento = updateDocumentoStatusDto.idEstadoDocumento;
  
    return await this.documentosSolicitudRepository.save(documento);
  }
  
}
