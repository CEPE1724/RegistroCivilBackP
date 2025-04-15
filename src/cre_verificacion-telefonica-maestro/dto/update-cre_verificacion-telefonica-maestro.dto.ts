import { PartialType } from '@nestjs/mapped-types';
import { CreateCreVerificacionTelefonicaMaestroDto } from './create-cre_verificacion-telefonica-maestro.dto';

export class UpdateCreVerificacionTelefonicaMaestroDto extends PartialType(CreateCreVerificacionTelefonicaMaestroDto) {}
