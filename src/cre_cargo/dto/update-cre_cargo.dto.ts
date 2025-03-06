import { PartialType } from '@nestjs/mapped-types';
import { CreateCreCargoDto } from './create-cre_cargo.dto';

export class UpdateCreCargoDto extends PartialType(CreateCreCargoDto) {}
