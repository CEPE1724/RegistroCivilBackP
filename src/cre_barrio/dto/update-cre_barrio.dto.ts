import { PartialType } from '@nestjs/mapped-types';
import { CreateCreBarrioDto } from './create-cre_barrio.dto';

export class UpdateCreBarrioDto extends PartialType(CreateCreBarrioDto) {}
