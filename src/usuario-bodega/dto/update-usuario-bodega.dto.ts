import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioBodegaDto } from './create-usuario-bodega.dto';

export class UpdateUsuarioBodegaDto extends PartialType(CreateUsuarioBodegaDto) {}
