import { PartialType } from '@nestjs/mapped-types';
import { CreateCreEstadoDto } from './create-cre-estado.dto';

export class UpdateCreEstadoDto extends PartialType(CreateCreEstadoDto) {}
