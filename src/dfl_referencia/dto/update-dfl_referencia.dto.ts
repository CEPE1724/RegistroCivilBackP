import { PartialType } from '@nestjs/mapped-types';
import { CreateDflReferenciaDto } from './create-dfl_referencia.dto';

export class UpdateDflReferenciaDto extends PartialType(CreateDflReferenciaDto) {}
