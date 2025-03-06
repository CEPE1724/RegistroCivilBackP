import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTiposueldoDto } from './create-cre_tiposueldo.dto';

export class UpdateCreTiposueldoDto extends PartialType(CreateCreTiposueldoDto) {}
