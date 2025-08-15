import { PartialType } from '@nestjs/mapped-types';
import { CreateMotivoContinuidadDto } from './create-motivo-continuidad.dto';

export class UpdateMotivoContinuidadDto extends PartialType(CreateMotivoContinuidadDto) {}
