import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTipocalificacionDto } from './create-cre-tipocalificacion.dto';

export class UpdateCreTipocalificacionDto extends PartialType(CreateCreTipocalificacionDto) {}
