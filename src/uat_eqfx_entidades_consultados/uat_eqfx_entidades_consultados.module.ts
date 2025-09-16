import { Module } from '@nestjs/common';
import { UatEqfxEntidadesConsultadosService } from './uat_eqfx_entidades_consultados.service';
import { UatEqfxEntidadesConsultadosController } from './uat_eqfx_entidades_consultados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxEntidadesConsultado } from './entities/uat_eqfx_entidades_consultado.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UatEqfxEntidadesConsultadosController],
	providers: [UatEqfxEntidadesConsultadosService],
	imports: [TypeOrmModule.forFeature([UatEqfxEntidadesConsultado]), AuthModule],
	exports: [UatEqfxEntidadesConsultadosService]
})
export class UatEqfxEntidadesConsultadosModule { }
