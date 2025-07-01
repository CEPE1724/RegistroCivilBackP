import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoSistemaDto } from './create-info-sistema.dto';

export class UpdateInfoSistemaDto extends PartialType(CreateInfoSistemaDto) {}
