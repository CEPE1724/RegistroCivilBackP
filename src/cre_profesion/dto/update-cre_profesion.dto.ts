import { PartialType } from '@nestjs/mapped-types';
import { CreateCreProfesionDto } from './create-cre_profesion.dto';

export class UpdateCreProfesionDto extends PartialType(CreateCreProfesionDto) {}
