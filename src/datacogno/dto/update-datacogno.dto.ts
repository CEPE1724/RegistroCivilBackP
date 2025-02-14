import { PartialType } from '@nestjs/mapped-types';
import { CreateDatacognoDto } from './create-datacogno.dto';

export class UpdateDatacognoDto extends PartialType(CreateDatacognoDto) {}
