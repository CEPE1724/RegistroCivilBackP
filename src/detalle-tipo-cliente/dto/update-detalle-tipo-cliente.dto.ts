import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleTipoClienteDto } from './create-detalle-tipo-cliente.dto';

export class UpdateDetalleTipoClienteDto extends PartialType(CreateDetalleTipoClienteDto) {}
