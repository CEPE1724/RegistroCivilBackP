import { PartialType } from '@nestjs/mapped-types';
import { CreateCreInmuebleDto } from './create-cre_inmueble.dto';

export class UpdateCreInmuebleDto extends PartialType(CreateCreInmuebleDto) {}
