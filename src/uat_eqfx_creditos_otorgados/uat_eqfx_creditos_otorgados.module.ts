import { Module } from '@nestjs/common';
import { UatEqfxCreditosOtorgadosService } from './uat_eqfx_creditos_otorgados.service';
import { UatEqfxCreditosOtorgadosController } from './uat_eqfx_creditos_otorgados.controller';
import { UatEqfxCreditosOtorgado } from './entities/uat_eqfx_creditos_otorgado.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [UatEqfxCreditosOtorgadosController],
	providers: [UatEqfxCreditosOtorgadosService],
	imports: [TypeOrmModule.forFeature([UatEqfxCreditosOtorgado]), AuthModule],
	exports: [UatEqfxCreditosOtorgadosService]
})
export class UatEqfxCreditosOtorgadosModule { }
