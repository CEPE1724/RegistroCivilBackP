import { PartialType } from '@nestjs/mapped-types';
import { CreateTiemposolicitudeswebDto } from './create-tiemposolicitudesweb.dto';

export class UpdateTiemposolicitudeswebDto extends PartialType(CreateTiemposolicitudeswebDto) {}
