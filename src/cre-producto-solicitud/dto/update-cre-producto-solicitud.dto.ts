import { PartialType } from '@nestjs/mapped-types';
import { CreateCreProductoSolicitudDto } from './create-cre-producto-solicitud.dto';

export class UpdateCreProductoSolicitudDto extends PartialType(CreateCreProductoSolicitudDto) {}
