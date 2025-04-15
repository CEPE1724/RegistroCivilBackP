import { PartialType } from '@nestjs/mapped-types';
import { CreateCreCantonDto } from './create-cre-canton.dto';

export class UpdateCreCantonDto extends PartialType(CreateCreCantonDto) {}
