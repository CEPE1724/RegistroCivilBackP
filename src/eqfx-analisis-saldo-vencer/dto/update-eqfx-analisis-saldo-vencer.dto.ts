import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxAnalisisSaldoVencerDto } from './create-eqfx-analisis-saldo-vencer.dto';

export class UpdateEqfxAnalisisSaldoVencerDto extends PartialType(CreateEqfxAnalisisSaldoVencerDto) {}
