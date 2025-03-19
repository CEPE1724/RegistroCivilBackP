
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentosSolicitud } from './entities/documentos-solicitud.entity';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentoStatusDto } from './dto/update-documentos-solicitud.dto';
import { HistorialObservaciones } from './entities/historial-observaciones.entity';
import { CreateHistorialObservacionesDto } from './dto/create-historial-observacion.dto';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { number } from 'joi';

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
    console.log(createDocumentosSolicitudDto); // Verifica que los datos del documento estén llegando correctamente
    const documento = this.documentosSolicitudRepository.create(createDocumentosSolicitudDto);
    const observacion = createDocumentosSolicitudDto.Observacion;
    const idCresolicitud = createDocumentosSolicitudDto.idCre_SolicitudWeb;
    const idTipoDocumentoWEB = createDocumentosSolicitudDto.idTipoDocumentoWEB;

    const savedDocumento = await this.documentosSolicitudRepository.save(documento);
    const idDocumentosSolicitudWeb = savedDocumento.idDocumentosSolicitudWeb;

    console.log(savedDocumento); // Verifica que el documento se guardó correctamente

    if (observacion != undefined && observacion != '' && observacion != null) {
    // Crear y guardar la observación después de guardar el documento
    await this.createObservacion({
      idCre_SolicitudWeb: idCresolicitud,
      idDocumentosSolicitudWeb: idDocumentosSolicitudWeb,
      Observacion: observacion,
      Fecha: new Date(),
      TipoUsuario: 1, // Puedes cambiarlo según sea necesario
      idTipoDocumentoWEB: idTipoDocumentoWEB
    });
    }

    return savedDocumento;
  }


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

  async findBySolicitudEstado(idSolicitud: number, estado: number) {
    return await this.documentosSolicitudRepository.find({
      where: { idCre_SolicitudWeb: idSolicitud, idEstadoDocumento: estado }, // Filtramos los documentos que pertenezcan a esa solicitud
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

  // Verifica si ya existe un archivo con el idCreSolicitudWeb y tipoDocumento con estado 1

  async checkIfFileExists(idCreSolicitudWeb: number, tipoDocumento: number): Promise<boolean> {
    console.log('Consultando en la base de datos con:', idCreSolicitudWeb, tipoDocumento);
  
    const result = await this.documentosSolicitudRepository.find({
      where: {
        idCre_SolicitudWeb: idCreSolicitudWeb,
        idTipoDocumentoWEB: tipoDocumento,
        idEstadoDocumento: 1,  // Asegúrate de que el estado sea el correcto
      }
    });
  
    console.log('Resultado de la consulta:', result);
    return result.length > 0; // Si hay resultados, devuelve true, si no, false
  }
  

  async updateEstado(idSolicitud: number): Promise<void> {
    const documentos = await this.documentosSolicitudRepository.find({
        where: { idCre_SolicitudWeb: idSolicitud, idEstadoDocumento: 1 }
    });

    if (!documentos.length) {
        throw new Error('No hay documentos en estado 1 para actualizar.');
    }

    for (const documento of documentos) {
        documento.idEstadoDocumento = 2;
    }

    await this.documentosSolicitudRepository.save(documentos);
}

}
