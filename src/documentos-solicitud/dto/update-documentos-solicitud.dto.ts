import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentosSolicitudDto } from './create-documentos-solicitud.dto';

export class UpdateDocumentosSolicitudDto extends PartialType(CreateDocumentosSolicitudDto) {}
