import { PartialType } from '@nestjs/mapped-types';
import { CreateCreSolicitudWebDto } from './create-cre_solicitud-web.dto';

export class UpdateCreSolicitudWebDto extends PartialType(CreateCreSolicitudWebDto) {}
