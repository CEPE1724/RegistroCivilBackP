import { PartialType } from '@nestjs/mapped-types';
import { CreateCupoCreditoDto } from './create-cupo-credito.dto';

export class UpdateCupoCreditoDto extends PartialType(CreateCupoCreditoDto) {}
