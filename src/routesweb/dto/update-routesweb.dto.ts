import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteswebDto } from './create-routesweb.dto';

export class UpdateRouteswebDto extends PartialType(CreateRouteswebDto) {}
