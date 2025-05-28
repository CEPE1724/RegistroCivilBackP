import { PartialType } from '@nestjs/mapped-types';
import { CreateListaNegraCedulaDto } from './create-lista-negra-cedula.dto'

export class UpdateListaNegraCedulaDto extends PartialType(CreateListaNegraCedulaDto) {}
