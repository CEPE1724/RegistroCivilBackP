import { PartialType } from '@nestjs/mapped-types';
import { CreateDflAnalisisBiometricoDto } from './create-dfl_analisis-biometrico.dto';

export class UpdateDflAnalisisBiometricoDto extends PartialType(CreateDflAnalisisBiometricoDto) {}
