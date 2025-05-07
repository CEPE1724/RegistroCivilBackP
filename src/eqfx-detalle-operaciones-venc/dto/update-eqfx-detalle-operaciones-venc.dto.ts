import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxDetalleOperacionesVencDto } from './create-eqfx-detalle-operaciones-venc.dto';

export class UpdateEqfxDetalleOperacionesVencDto extends PartialType(CreateEqfxDetalleOperacionesVencDto) {}
