import { PartialType } from '@nestjs/mapped-types';
import { CreateCreReferenciasclienteswebDto } from './create-cre-referenciasclientesweb.dto';

export class UpdateCreReferenciasclienteswebDto extends PartialType(CreateCreReferenciasclienteswebDto) {}
