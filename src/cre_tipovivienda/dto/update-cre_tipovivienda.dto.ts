import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTipoviviendaDto } from './create-cre_tipovivienda.dto';

export class UpdateCreTipoviviendaDto extends PartialType(CreateCreTipoviviendaDto) {}
