import { PartialType } from '@nestjs/mapped-types';
import { CreateCreCiudadinmuebleDto } from './create-cre_ciudadinmueble.dto';

export class UpdateCreCiudadinmuebleDto extends PartialType(CreateCreCiudadinmuebleDto) {}
