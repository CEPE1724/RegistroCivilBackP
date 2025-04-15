import { PartialType } from '@nestjs/mapped-types';
import { CreateCreParentescoDto } from './create-cre_parentesco.dto';

export class UpdateCreParentescoDto extends PartialType(CreateCreParentescoDto) {}
