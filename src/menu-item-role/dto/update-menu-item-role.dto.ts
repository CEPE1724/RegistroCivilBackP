import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemRoleDto } from './create-menu-item-role.dto';

export class UpdateMenuItemRoleDto extends PartialType(CreateMenuItemRoleDto) {}
