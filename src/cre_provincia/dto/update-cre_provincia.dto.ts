import { PartialType } from '@nestjs/mapped-types';
import { CreateCreProvinciaDto } from './create-cre_provincia.dto';

export class UpdateCreProvinciaDto extends PartialType(CreateCreProvinciaDto) {}
