import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxEvolucionHistDisEndeudamientoDto } from './create-eqfx-evolucion-hist-dis-endeudamiento.dto';

export class UpdateEqfxEvolucionHistDisEndeudamientoDto extends PartialType(CreateEqfxEvolucionHistDisEndeudamientoDto) {}
