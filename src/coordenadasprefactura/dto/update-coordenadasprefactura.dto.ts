import { PartialType } from '@nestjs/mapped-types';
import { CreateCoordenadasprefacturaDto } from './create-coordenadasprefactura.dto';

export class UpdateCoordenadasprefacturaDto extends PartialType(CreateCoordenadasprefacturaDto) {}
