import { PartialType } from '@nestjs/mapped-types';
import { CreateCreParroquiaDto } from './create-cre_parroquia.dto';

export class UpdateCreParroquiaDto extends PartialType(CreateCreParroquiaDto) {}
