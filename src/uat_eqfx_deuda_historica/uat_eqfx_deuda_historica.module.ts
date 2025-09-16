import { Module } from '@nestjs/common';
import { UatEqfxDeudaHistoricaService } from './uat_eqfx_deuda_historica.service';
import { UatEqfxDeudaHistoricaController } from './uat_eqfx_deuda_historica.controller';
import { UatEqfxDeudaHistorica } from './entities/uat_eqfx_deuda_historica.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
	controllers: [UatEqfxDeudaHistoricaController],
	providers: [UatEqfxDeudaHistoricaService],
	imports: [TypeOrmModule.forFeature([UatEqfxDeudaHistorica]), AuthModule],
	exports: [UatEqfxDeudaHistoricaService]
})
export class UatEqfxDeudaHistoricaModule { }
