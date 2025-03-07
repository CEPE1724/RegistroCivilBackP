import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleswebDto } from './create-rolesweb.dto';

export class UpdateRoleswebDto extends PartialType(CreateRoleswebDto) {}
