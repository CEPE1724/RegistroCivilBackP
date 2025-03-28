import { PartialType } from '@nestjs/mapped-types';
import { CreateIngresoCobradorDto } from './create-ingreso-cobrador.dto';

export class UpdateIngresoCobradorDto extends PartialType(CreateIngresoCobradorDto) {}
