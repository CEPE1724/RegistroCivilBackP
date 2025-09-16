import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxSaldosPorVencerDto } from './create-uat_eqfx_saldos_por_vencer.dto';

export class UpdateUatEqfxSaldosPorVencerDto extends PartialType(CreateUatEqfxSaldosPorVencerDto) {}
