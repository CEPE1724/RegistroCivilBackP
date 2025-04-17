import { PartialType } from '@nestjs/mapped-types';
import { CreateListaNegraCellDto } from './create-lista-negra-cell.dto';

export class UpdateListaNegraCellDto extends PartialType(CreateListaNegraCellDto) {}
