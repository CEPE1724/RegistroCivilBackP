import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTipocontratoDto } from './create-cre_tipocontrato.dto';

export class UpdateCreTipocontratoDto extends PartialType(CreateCreTipocontratoDto) {}
