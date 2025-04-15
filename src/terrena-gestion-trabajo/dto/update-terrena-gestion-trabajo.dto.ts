import { PartialType } from '@nestjs/mapped-types';
import { CreateTerrenaGestionTrabajoDto } from './create-terrena-gestion-trabajo.dto';

export class UpdateTerrenaGestionTrabajoDto extends PartialType(CreateTerrenaGestionTrabajoDto) {}
