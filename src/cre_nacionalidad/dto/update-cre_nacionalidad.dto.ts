import { PartialType } from '@nestjs/mapped-types';
import { CreateCreNacionalidadDto } from './create-cre_nacionalidad.dto';

export class UpdateCreNacionalidadDto extends PartialType(CreateCreNacionalidadDto) {}
