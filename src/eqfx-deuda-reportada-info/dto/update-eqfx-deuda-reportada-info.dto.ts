import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxDeudaReportadaInfoDto } from './create-eqfx-deuda-reportada-info.dto';

export class UpdateEqfxDeudaReportadaInfoDto extends PartialType(CreateEqfxDeudaReportadaInfoDto) {}
