import { PartialType } from '@nestjs/mapped-types';
import { CreateCboEdadDto } from './create-cbo-edad.dto';

export class UpdateCboEdadDto extends PartialType(CreateCboEdadDto) {}
