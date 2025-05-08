import { Module } from '@nestjs/common';
import { EqfxDeudaReportadaRfrService } from './eqfx-deuda-reportada-rfr.service';
import { EqfxDeudaReportadaRfrController } from './eqfx-deuda-reportada-rfr.controller';
import { EqfxDeudaReportadaRfr } from './entities/eqfx-deuda-reportada-rfr.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxDeudaReportadaRfrController],
  providers: [EqfxDeudaReportadaRfrService],
  imports: [TypeOrmModule.forFeature([EqfxDeudaReportadaRfr]) , AuthModule],
  exports: [EqfxDeudaReportadaRfrService],
})
export class EqfxDeudaReportadaRfrModule {}
