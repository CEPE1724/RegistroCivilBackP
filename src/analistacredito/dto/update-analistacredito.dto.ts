import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalistacreditoDto } from './create-analistacredito.dto';

export class UpdateAnalistacreditoDto extends PartialType(CreateAnalistacreditoDto) {}
