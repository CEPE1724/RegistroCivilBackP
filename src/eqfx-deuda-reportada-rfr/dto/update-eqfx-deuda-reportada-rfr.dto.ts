import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxDeudaReportadaRfrDto } from './create-eqfx-deuda-reportada-rfr.dto';

export class UpdateEqfxDeudaReportadaRfrDto extends PartialType(CreateEqfxDeudaReportadaRfrDto) {}
