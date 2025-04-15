import { PartialType } from '@nestjs/mapped-types';
import { CreateFechaAnalistaDto } from './create-fecha-analista.dto';

export class UpdateFechaAnalistaDto extends PartialType(CreateFechaAnalistaDto) {}
