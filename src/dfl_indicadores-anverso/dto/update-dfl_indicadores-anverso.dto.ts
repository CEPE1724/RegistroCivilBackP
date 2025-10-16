import { PartialType } from '@nestjs/mapped-types';
import { CreateDflIndicadoresAnversoDto } from './create-dfl_indicadores-anverso.dto';

export class UpdateDflIndicadoresAnversoDto extends PartialType(CreateDflIndicadoresAnversoDto) {}
