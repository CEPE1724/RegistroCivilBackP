import { PartialType } from '@nestjs/mapped-types';
import { CreateComAsignacionDeVendedoreDto } from './create-com_asignacion-de-vendedore.dto';

export class UpdateComAsignacionDeVendedoreDto extends PartialType(CreateComAsignacionDeVendedoreDto) {}
