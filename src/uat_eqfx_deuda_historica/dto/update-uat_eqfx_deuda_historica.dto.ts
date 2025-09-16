import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxDeudaHistoricaDto } from './create-uat_eqfx_deuda_historica.dto';

export class UpdateUatEqfxDeudaHistoricaDto extends PartialType(CreateUatEqfxDeudaHistoricaDto) {}
