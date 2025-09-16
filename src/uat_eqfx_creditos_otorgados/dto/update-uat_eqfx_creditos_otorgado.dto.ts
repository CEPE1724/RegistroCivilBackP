import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxCreditosOtorgadoDto } from './create-uat_eqfx_creditos_otorgado.dto';

export class UpdateUatEqfxCreditosOtorgadoDto extends PartialType(CreateUatEqfxCreditosOtorgadoDto) {}
