import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxResultadoDto } from './create-uat_eqfx_resultado.dto';

export class UpdateUatEqfxResultadoDto extends PartialType(CreateUatEqfxResultadoDto) {}
