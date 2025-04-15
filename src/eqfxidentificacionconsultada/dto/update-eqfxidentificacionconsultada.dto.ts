import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxidentificacionconsultadaDto } from './create-eqfxidentificacionconsultada.dto';

export class UpdateEqfxidentificacionconsultadaDto extends PartialType(CreateEqfxidentificacionconsultadaDto) {}
