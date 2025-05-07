import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxIndicadoresDeudaDto } from './create-eqfx-indicadores-deuda.dto';

export class UpdateEqfxIndicadoresDeudaDto extends PartialType(CreateEqfxIndicadoresDeudaDto) {}
