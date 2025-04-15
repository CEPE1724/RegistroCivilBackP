import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTiempoviviendaDto } from './create-cre_tiempovivienda.dto';

export class UpdateCreTiempoviviendaDto extends PartialType(CreateCreTiempoviviendaDto) {}
