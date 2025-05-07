import { Module } from '@nestjs/common';
import { EqfxDeudaReportadaRfrService } from './eqfx-deuda-reportada-rfr.service';
import { EqfxDeudaReportadaRfrController } from './eqfx-deuda-reportada-rfr.controller';
import { EqfxDeudaReportadaRfr } from './entities/eqfx-deuda-reportada-rfr.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxDeudaReportadaRfrController],
  providers: [EqfxDeudaReportadaRfrService],
  imports: [TypeOrmModule.forFeature([EqfxDeudaReportadaRfr])],
  exports: [EqfxDeudaReportadaRfrService],
})
export class EqfxDeudaReportadaRfrModule {}
