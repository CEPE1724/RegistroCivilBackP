import { PartialType } from '@nestjs/mapped-types';
import { CreateTerrenaGestionDomicilioDto } from './create-terrena-gestion-domicilio.dto';

export class UpdateTerrenaGestionDomicilioDto extends PartialType(CreateTerrenaGestionDomicilioDto) {}
