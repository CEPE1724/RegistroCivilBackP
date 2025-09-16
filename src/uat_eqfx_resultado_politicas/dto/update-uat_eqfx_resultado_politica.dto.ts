import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxResultadoPoliticaDto } from './create-uat_eqfx_resultado_politica.dto';

export class UpdateUatEqfxResultadoPoliticaDto extends PartialType(CreateUatEqfxResultadoPoliticaDto) {}
