import { PartialType } from '@nestjs/mapped-types';
import { CreateDflResultadoDto } from './create-dfl_resultado.dto';

export class UpdateDflResultadoDto extends PartialType(CreateDflResultadoDto) {}
