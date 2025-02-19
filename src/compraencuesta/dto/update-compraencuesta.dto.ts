import { PartialType } from '@nestjs/mapped-types';
import { CreateCompraencuestaDto } from './create-compraencuesta.dto';

export class UpdateCompraencuestaDto extends PartialType(CreateCompraencuestaDto) {}
