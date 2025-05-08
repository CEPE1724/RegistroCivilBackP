import { Module } from '@nestjs/common';
import { EqfxDeudaReportadaInfoService } from './eqfx-deuda-reportada-info.service';
import { EqfxDeudaReportadaInfoController } from './eqfx-deuda-reportada-info.controller';
import { EqfxDeudaReportadaInfo } from './entities/eqfx-deuda-reportada-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxDeudaReportadaInfoController],
  providers: [EqfxDeudaReportadaInfoService],
  imports: [TypeOrmModule.forFeature([EqfxDeudaReportadaInfo]) , AuthModule],
  exports: [EqfxDeudaReportadaInfoService],
})
export class EqfxDeudaReportadaInfoModule {}
