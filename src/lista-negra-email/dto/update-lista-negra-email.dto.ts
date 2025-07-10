import { PartialType } from '@nestjs/mapped-types';
import { CreateListaNegraEmailDto } from './create-lista-negra-email.dto';

export class UpdateListaNegraEmailDto extends PartialType(CreateListaNegraEmailDto) {}
