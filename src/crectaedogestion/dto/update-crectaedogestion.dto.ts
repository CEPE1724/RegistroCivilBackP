import { PartialType } from '@nestjs/mapped-types';
import { CreateCrectaedogestionDto } from './create-crectaedogestion.dto';

export class UpdateCrectaedogestionDto extends PartialType(CreateCrectaedogestionDto) {}
