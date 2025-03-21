import { PartialType } from '@nestjs/mapped-types';
import { CreateCreSituacionlaboralDto } from './create-cre-situacionlaboral.dto';

export class UpdateCreSituacionlaboralDto extends PartialType(CreateCreSituacionlaboralDto) {}
