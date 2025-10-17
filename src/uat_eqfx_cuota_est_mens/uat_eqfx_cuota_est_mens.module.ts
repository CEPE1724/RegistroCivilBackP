import { Module } from '@nestjs/common';
import { UatEqfxCuotaEstMensService } from './uat_eqfx_cuota_est_mens.service';
import { UatEqfxCuotaEstMensController } from './uat_eqfx_cuota_est_mens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UatEqfxCuotaEstMen } from './entities/uat_eqfx_cuota_est_men.entity';


@Module({
	controllers: [UatEqfxCuotaEstMensController],
	providers: [UatEqfxCuotaEstMensService],
	imports: [TypeOrmModule.forFeature([UatEqfxCuotaEstMen]), AuthModule],
	exports: [UatEqfxCuotaEstMensService]
})
export class UatEqfxCuotaEstMensModule { }
