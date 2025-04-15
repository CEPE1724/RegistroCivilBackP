import { PartialType } from '@nestjs/mapped-types';
import { CreateExecSpDto } from './create-exec-sp.dto';

export class UpdateExecSpDto extends PartialType(CreateExecSpDto) {}
