import { PartialType } from '@nestjs/mapped-types';
import { CreateDflIndicadoresReversoDto } from './create-dfl_indicadores-reverso.dto';

export class UpdateDflIndicadoresReversoDto extends PartialType(CreateDflIndicadoresReversoDto) {}
