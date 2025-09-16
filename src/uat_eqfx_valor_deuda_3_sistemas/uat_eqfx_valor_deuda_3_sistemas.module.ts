import { Module } from '@nestjs/common';
import { UatEqfxValorDeuda3SistemasService } from './uat_eqfx_valor_deuda_3_sistemas.service';
import { UatEqfxValorDeuda3SistemasController } from './uat_eqfx_valor_deuda_3_sistemas.controller';
import { UatEqfxValorDeuda3Sistema } from './entities/uat_eqfx_valor_deuda_3_sistema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UatEqfxValorDeuda3SistemasController],
	providers: [UatEqfxValorDeuda3SistemasService],
	imports: [TypeOrmModule.forFeature([UatEqfxValorDeuda3Sistema]), AuthModule],
	exports: [UatEqfxValorDeuda3SistemasService]
})
export class UatEqfxValorDeuda3SistemasModule { }
