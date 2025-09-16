import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxEntidadesConsultadoDto } from './create-uat_eqfx_entidades_consultado.dto';

export class UpdateUatEqfxEntidadesConsultadoDto extends PartialType(CreateUatEqfxEntidadesConsultadoDto) {}
