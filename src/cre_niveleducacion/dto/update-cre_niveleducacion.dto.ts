import { PartialType } from '@nestjs/mapped-types';
import { CreateCreNiveleducacionDto } from './create-cre_niveleducacion.dto';

export class UpdateCreNiveleducacionDto extends PartialType(CreateCreNiveleducacionDto) {}
