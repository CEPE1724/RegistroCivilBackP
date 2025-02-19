import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTiempoDto } from './create-cre_tiempo.dto';

export class UpdateCreTiempoDto extends PartialType(CreateCreTiempoDto) {}
