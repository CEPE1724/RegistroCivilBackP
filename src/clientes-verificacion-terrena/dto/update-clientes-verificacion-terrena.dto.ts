import { PartialType } from '@nestjs/mapped-types';
import { CreateClientesVerificacionTerrenaDto } from './create-clientes-verificacion-terrena.dto';

export class UpdateClientesVerificacionTerrenaDto extends PartialType(CreateClientesVerificacionTerrenaDto) {}
