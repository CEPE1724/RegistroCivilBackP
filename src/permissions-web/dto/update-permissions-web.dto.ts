import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionsWebDto } from './create-permissions-web.dto';

export class UpdatePermissionsWebDto extends PartialType(CreatePermissionsWebDto) {}
