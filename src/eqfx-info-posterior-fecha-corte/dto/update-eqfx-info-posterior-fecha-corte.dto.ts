import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxInfoPosteriorFechaCorteDto } from './create-eqfx-info-posterior-fecha-corte.dto';

export class UpdateEqfxInfoPosteriorFechaCorteDto extends PartialType(CreateEqfxInfoPosteriorFechaCorteDto) {}
