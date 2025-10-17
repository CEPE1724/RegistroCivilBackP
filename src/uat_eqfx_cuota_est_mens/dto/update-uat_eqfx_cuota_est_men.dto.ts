import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxCuotaEstMenDto } from './create-uat_eqfx_cuota_est_men.dto';

export class UpdateUatEqfxCuotaEstMenDto extends PartialType(CreateUatEqfxCuotaEstMenDto) {}
