import { PartialType } from '@nestjs/mapped-types';
import { CreateListacuentasdepositoDto } from './create-listacuentasdeposito.dto';

export class UpdateListacuentasdepositoDto extends PartialType(CreateListacuentasdepositoDto) {}
