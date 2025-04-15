import { PartialType } from '@nestjs/mapped-types';
import { CreateCreverificaciontelefonicaDto } from './create-creverificaciontelefonica.dto';

export class UpdateCreverificaciontelefonicaDto extends PartialType(CreateCreverificaciontelefonicaDto) {}
