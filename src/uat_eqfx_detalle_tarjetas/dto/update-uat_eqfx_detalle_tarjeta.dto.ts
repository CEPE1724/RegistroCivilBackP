import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxDetalleTarjetaDto } from './create-uat_eqfx_detalle_tarjeta.dto';

export class UpdateUatEqfxDetalleTarjetaDto extends PartialType(CreateUatEqfxDetalleTarjetaDto) {}
