import { PartialType } from '@nestjs/mapped-types';
import { CreateCreGcTelefonoDto } from './create-cre-gc-telefono.dto';

export class UpdateCreGcTelefonoDto extends PartialType(CreateCreGcTelefonoDto) {}
