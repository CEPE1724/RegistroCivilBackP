import { PartialType } from '@nestjs/mapped-types';
import { CreateCboTipoClienteDto } from './create-cbo-tipo-cliente.dto';

export class UpdateCboTipoClienteDto extends PartialType(CreateCboTipoClienteDto) {}
