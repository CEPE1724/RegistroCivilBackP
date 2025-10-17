import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalisisdeidentidadDto } from './create-analisisdeidentidad.dto';

export class UpdateAnalisisdeidentidadDto extends PartialType(CreateAnalisisdeidentidadDto) {}
