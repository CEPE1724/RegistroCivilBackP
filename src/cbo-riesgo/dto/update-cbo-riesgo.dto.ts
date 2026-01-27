import { PartialType } from '@nestjs/mapped-types';
import { CreateCboRiesgoDto } from './create-cbo-riesgo.dto';

export class UpdateCboRiesgoDto extends PartialType(CreateCboRiesgoDto) {}
