import { PartialType } from '@nestjs/mapped-types';
import { CreateCreEstadocivilDto } from './create-cre_estadocivil.dto';

export class UpdateCreEstadocivilDto extends PartialType(CreateCreEstadocivilDto) {}
