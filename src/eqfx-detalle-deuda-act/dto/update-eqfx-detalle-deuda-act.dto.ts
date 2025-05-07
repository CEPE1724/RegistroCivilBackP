import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxDetalleDeudaActDto } from './create-eqfx-detalle-deuda-act.dto';

export class UpdateEqfxDetalleDeudaActDto extends PartialType(CreateEqfxDetalleDeudaActDto) {}
