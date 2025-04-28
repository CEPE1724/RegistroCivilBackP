
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const documento = this.documentosSolicitudRepository.create(createDocumentosSolicitudDto);
    const observacion = createDocumentosSolicitudDto.Observacion;
    const idCresolicitud = createDocumentosSolicitudDto.idCre_SolicitudWeb;
    const idTipoDocumentoWEB = createDocumentosSolicitudDto.idTipoDocumentoWEB;
    const usuario = createDocumentosSolicitudDto.Usuario;
    const IdUsuario = createDocumentosSolicitudDto.IdUsuario;
   

    const savedDocumento = await this.documentosSolicitudRepository.save(documento);
    const idDocumentosSolicitudWeb = savedDocumento.idDocumentosSolicitudWeb;


    if (observacion != undefined && observacion != '' && observacion != null) {
    // Crear y guardar la observación después de guardar el documento
    await this.createObservacion({
      idCre_SolicitudWeb: idCresolicitud,
      idDocumentosSolicitudWeb: idDocumentosSolicitudWeb,
      Observacion: observacion,
      Fecha: new Date(),
      TipoUsuario: 1, // Puedes cambiarlo según sea necesario
      idTipoDocumentoWEB: idTipoDocumentoWEB,
      Usuario: usuario,
      idUsuario: IdUsuario
    });
    }

    return savedDocumento;
  }


  async createObservacion(createHistorialObservacionesDto: CreateHistorialObservacionesDto): Promise<HistorialObservaciones> {
    const observaciones = this.historialObservacionesRepository.create(createHistorialObservacionesDto);
    return await this.historialObservacionesRepository.save(observaciones);
  }



  // Buscar documentos por solicitud
  async findBySolicitud(idSolicitud: number, idEstadoVerificacionDocumental: number) {
    /// si idEstadoVerificacionDocumental == 1 buscamos por estado 1 y 2
    if (idEstadoVerificacionDocumental == 1) {
      return await this.documentosSolicitudRepository.find({
        where: { idCre_SolicitudWeb: idSolicitud, idEstadoDocumento: In([1,4]) }
      });
    }

    if (idEstadoVerificacionDocumental == 3) {
      return await this.documentosSolicitudRepository.find({
        where: { idCre_SolicitudWeb: idSolicitud, idEstadoDocumento: In([5,4,1]) }
      });
    }
    
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


   // Método para cancelar documentos con estado 5 o 4
   async updateCancelados(idSolicitud: number): Promise<void> {
    const documentos = await this.documentosSolicitudRepository.find({
      where: {
        idCre_SolicitudWeb: idSolicitud,  // Filtrar por solicitud
        idEstadoDocumento: In([5, 4]),    // Filtrar por estados 5 o 4
      },
    });
  
    if (!documentos.length) {
      // Si no se encuentran documentos, log de advertencia y lanzar error
      this.logger.warn(`No se encontraron documentos con estado 5 o 4 para la solicitud ${idSolicitud}`);
      throw new Error(`No se encontraron documentos con estado 5 o 4 para la solicitud ${idSolicitud}`);
    }
  
    // Actualizar todos los documentos encontrados a estado 6
    try {
      await this.documentosSolicitudRepository.update(
        { idCre_SolicitudWeb: idSolicitud, idEstadoDocumento: In([5, 4]) },
        { idEstadoDocumento: 6 }
      );
      this.logger.log(`Documentos cancelados correctamente para la solicitud ${idSolicitud}`);
    } catch (error) {
      this.logger.error(`Error al cancelar documentos para la solicitud ${idSolicitud}: ${error.message}`);
      throw new Error(`Hubo un error al cancelar documentos para la solicitud ${idSolicitud}`);
    }
  }
  




  // Verifica si ya existe un archivo con el idCreSolicitudWeb y tipoDocumento con estado 1

  async checkIfFileExists(idCreSolicitudWeb: number, tipoDocumento: number): Promise<boolean> {

    const result = await this.documentosSolicitudRepository.find({
      where: {
        idCre_SolicitudWeb: idCreSolicitudWeb,
        idTipoDocumentoWEB: tipoDocumento,
        idEstadoDocumento: 1,  // Asegúrate de que el estado sea el correcto
      }
    });
  

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


async getObservaciones(idSolicitud: number, idTipoDocumento: number): Promise<HistorialObservaciones[]> {
  return await this.historialObservacionesRepository.find({
    where: { 
      idCre_SolicitudWeb: idSolicitud,
      idTipoDocumentoWEB: idTipoDocumento
    },
    order: { Fecha: 'DESC' }, // Ordena las observaciones por fecha descendente
  });
}


async areThreeDocsApproved(idSolicitud: number): Promise<boolean> {
  const tiposRequeridos = [14, 13, 12];

  const documentos = await this.documentosSolicitudRepository.find({
    where: {
      idCre_SolicitudWeb: idSolicitud,
      idTipoDocumentoWEB: In(tiposRequeridos),
      idEstadoDocumento: 3
    }
  });

  const tiposEncontrados = documentos.map(doc => doc.idTipoDocumentoWEB);
  const tiposAprobadosSet = new Set(tiposEncontrados);

  // Verifica que todos los tipos requeridos estén en estado 3
  return tiposRequeridos.every(tipo => tiposAprobadosSet.has(tipo));
}


}
