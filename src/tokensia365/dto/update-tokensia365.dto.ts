import { PartialType } from '@nestjs/mapped-types';
import { CreateTokensia365Dto } from './create-tokensia365.dto';

export class UpdateTokensia365Dto extends PartialType(CreateTokensia365Dto) {}
