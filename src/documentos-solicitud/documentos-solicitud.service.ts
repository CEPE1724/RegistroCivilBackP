import { Injectable } from '@nestjs/common';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentosSolicitudDto } from './dto/update-documentos-solicitud.dto';

@Injectable()
export class DocumentosSolicitudService {
  create(createDocumentosSolicitudDto: CreateDocumentosSolicitudDto) {
    return 'This action adds a new documentosSolicitud';
  }

  findAll() {
    return `This action returns all documentosSolicitud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentosSolicitud`;
  }

  update(id: number, updateDocumentosSolicitudDto: UpdateDocumentosSolicitudDto) {
    return `This action updates a #${id} documentosSolicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentosSolicitud`;
  }
}
