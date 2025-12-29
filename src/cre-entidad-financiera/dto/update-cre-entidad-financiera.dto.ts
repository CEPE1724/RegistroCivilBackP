import { PartialType } from '@nestjs/mapped-types';
import { CreateCreEntidadFinancieraDto } from './create-cre-entidad-financiera.dto';

export class UpdateCreEntidadFinancieraDto extends PartialType(CreateCreEntidadFinancieraDto) {}
