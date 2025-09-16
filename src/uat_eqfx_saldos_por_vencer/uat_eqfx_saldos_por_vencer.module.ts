import { Module } from '@nestjs/common';
import { UatEqfxSaldosPorVencerService } from './uat_eqfx_saldos_por_vencer.service';
import { UatEqfxSaldosPorVencerController } from './uat_eqfx_saldos_por_vencer.controller';
import { UatEqfxSaldosPorVencer } from './entities/uat_eqfx_saldos_por_vencer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UatEqfxSaldosPorVencerController],
	providers: [UatEqfxSaldosPorVencerService],
	imports: [TypeOrmModule.forFeature([UatEqfxSaldosPorVencer]), AuthModule],
	exports: [UatEqfxSaldosPorVencerService]
})
export class UatEqfxSaldosPorVencerModule { }
