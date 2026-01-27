import { PartialType } from '@nestjs/mapped-types';
import { CreateCboSegmentoDto } from './create-cbo-segmento.dto';

export class UpdateCboSegmentoDto extends PartialType(CreateCboSegmentoDto) {}
