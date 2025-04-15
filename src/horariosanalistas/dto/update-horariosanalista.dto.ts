import { PartialType } from '@nestjs/mapped-types';
import { CreateHorariosanalistaDto } from './create-horariosanalista.dto';

export class UpdateHorariosanalistaDto extends PartialType(CreateHorariosanalistaDto) {}
