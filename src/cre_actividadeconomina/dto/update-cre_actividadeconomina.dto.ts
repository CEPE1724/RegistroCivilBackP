import { PartialType } from '@nestjs/mapped-types';
import { CreateCreActividadeconominaDto } from './create-cre_actividadeconomina.dto';

export class UpdateCreActividadeconominaDto extends PartialType(CreateCreActividadeconominaDto) {}
