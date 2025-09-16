import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxEstructuraVencimientoDto } from './create-uat_eqfx_estructura_vencimiento.dto';

export class UpdateUatEqfxEstructuraVencimientoDto extends PartialType(CreateUatEqfxEstructuraVencimientoDto) {}
