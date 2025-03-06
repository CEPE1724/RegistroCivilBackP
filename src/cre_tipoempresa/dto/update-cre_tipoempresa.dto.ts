import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTipoempresaDto } from './create-cre_tipoempresa.dto';

export class UpdateCreTipoempresaDto extends PartialType(CreateCreTipoempresaDto) {}
