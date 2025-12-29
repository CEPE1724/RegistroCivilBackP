import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalBddDto } from './create-personal-bdd.dto';

export class UpdatePersonalBddDto extends PartialType(CreatePersonalBddDto) {}
