
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentosSolicitud } from './entities/documentos-solicitud.entity';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentosSolicitudDto } from './dto/update-documentos-solicitud.dto';
import {HistorialObservaciones} from './entities/historial-observaciones.entity';
import { CreateHistorialObservacionesDto } from './dto/create-historial-observacion.dto';

@Injectable()
export class DocumentosSolicitudService {

  constructor(
    @InjectRepository(DocumentosSolicitud)
    private readonly documentosSolicitudRepository: Repository<DocumentosSolicitud>,
    @InjectRepository(HistorialObservaciones)
    private readonly historialObservacionesRepository : Repository<HistorialObservaciones>
  ) {}


 

  // Crear un nuevo documento
  async create(createDocumentosSolicitudDto: CreateDocumentosSolicitudDto): Promise<DocumentosSolicitud> {
    const documento = this.documentosSolicitudRepository.create(createDocumentosSolicitudDto);
    const savedDocumento = await this.documentosSolicitudRepository.save(documento);

   
    
    console.log(savedDocumento); // Verifica que el documento se guardó correctamente
    return savedDocumento;
}


async createObservacion(createHistorialObservacionesDto: CreateHistorialObservacionesDto): Promise<HistorialObservaciones>
{
  const observaciones = this.historialObservacionesRepository.create(createHistorialObservacionesDto)


return 
}

  // Obtener todos los documentos
  async findAll(): Promise<DocumentosSolicitud[]> {
    return this.documentosSolicitudRepository.find();
  }

  // Actualizar un documento
 
=======

}
