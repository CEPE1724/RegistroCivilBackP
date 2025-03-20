import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialObservacioneDto } from './create-historial-observacione.dto';

export class UpdateHistorialObservacioneDto extends PartialType(CreateHistorialObservacioneDto) {}
