import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxResultadoPoliticaDto } from './create-eqfx-resultado-politica.dto';

export class UpdateEqfxResultadoPoliticaDto extends PartialType(CreateEqfxResultadoPoliticaDto) {}
