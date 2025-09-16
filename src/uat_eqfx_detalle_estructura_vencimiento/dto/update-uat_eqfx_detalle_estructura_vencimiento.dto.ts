import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxDetalleEstructuraVencimientoDto } from './create-uat_eqfx_detalle_estructura_vencimiento.dto';

export class UpdateUatEqfxDetalleEstructuraVencimientoDto extends PartialType(CreateUatEqfxDetalleEstructuraVencimientoDto) {}
