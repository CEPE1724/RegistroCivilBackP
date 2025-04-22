import { PartialType } from '@nestjs/mapped-types';
import { CreateFechaVerificadorDto } from './create-fecha-verificador.dto';

export class UpdateFechaVerificadorDto extends PartialType(CreateFechaVerificadorDto) {}
