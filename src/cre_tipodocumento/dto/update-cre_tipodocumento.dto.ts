import { PartialType } from '@nestjs/mapped-types';
import { CreateCreTipodocumentoDto } from './create-cre_tipodocumento.dto';

export class UpdateCreTipodocumentoDto extends PartialType(CreateCreTipodocumentoDto) {}
