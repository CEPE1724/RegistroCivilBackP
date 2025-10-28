import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoreferenciaEntregaDomicilioDto } from './create-georeferencia-entrega-domicilio.dto';

export class UpdateGeoreferenciaEntregaDomicilioDto extends PartialType(CreateGeoreferenciaEntregaDomicilioDto) {}
