import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxIndicadoresDeudaHistoricaDto } from './create-eqfx-indicadores-deuda-historica.dto';

export class UpdateEqfxIndicadoresDeudaHistoricaDto extends PartialType(CreateEqfxIndicadoresDeudaHistoricaDto) {}
