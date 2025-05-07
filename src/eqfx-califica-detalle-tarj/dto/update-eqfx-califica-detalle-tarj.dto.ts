import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxCalificaDetalleTarjDto } from './create-eqfx-califica-detalle-tarj.dto';

export class UpdateEqfxCalificaDetalleTarjDto extends PartialType(CreateEqfxCalificaDetalleTarjDto) {}
