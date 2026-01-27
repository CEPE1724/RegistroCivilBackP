import { PartialType } from '@nestjs/mapped-types';
import { CreateCboSaldoDto } from './create-cbo-saldo.dto';

export class UpdateCboSaldoDto extends PartialType(CreateCboSaldoDto) {}
