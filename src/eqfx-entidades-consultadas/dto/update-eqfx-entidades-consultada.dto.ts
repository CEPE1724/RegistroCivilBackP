import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxEntidadesConsultadaDto } from './create-eqfx-entidades-consultada.dto';

export class UpdateEqfxEntidadesConsultadaDto extends PartialType(CreateEqfxEntidadesConsultadaDto) {}
