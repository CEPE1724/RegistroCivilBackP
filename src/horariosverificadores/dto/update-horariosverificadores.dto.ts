import { PartialType } from '@nestjs/mapped-types';
import { CreateHorariosverificadoresDto } from './create-horariosverificadores.dto';

export class UpdateHorariosverificadoresDto extends PartialType(CreateHorariosverificadoresDto) {}
