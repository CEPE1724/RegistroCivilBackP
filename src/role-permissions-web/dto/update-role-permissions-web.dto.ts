import { PartialType } from '@nestjs/mapped-types';
import { CreateRolePermissionsWebDto } from './create-role-permissions-web.dto';

export class UpdateRolePermissionsWebDto extends PartialType(CreateRolePermissionsWebDto) {}
