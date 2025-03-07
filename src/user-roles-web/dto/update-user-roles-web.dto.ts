import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRolesWebDto } from './create-user-roles-web.dto';

export class UpdateUserRolesWebDto extends PartialType(CreateUserRolesWebDto) {}
