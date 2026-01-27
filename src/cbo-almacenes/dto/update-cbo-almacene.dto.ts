import { PartialType } from '@nestjs/mapped-types';
import { CreateCboAlmaceneDto } from './create-cbo-almacene.dto';

export class UpdateCboAlmaceneDto extends PartialType(CreateCboAlmaceneDto) {}
