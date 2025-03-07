import { PartialType } from '@nestjs/mapped-types';
import { CreateCreSexoDto } from './create-cre_sexo.dto';

export class UpdateCreSexoDto extends PartialType(CreateCreSexoDto) {}
