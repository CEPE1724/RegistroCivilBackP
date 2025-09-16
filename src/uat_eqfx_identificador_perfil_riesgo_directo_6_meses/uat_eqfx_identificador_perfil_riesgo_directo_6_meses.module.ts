import { Module } from '@nestjs/common';
import { UatEqfxIdentificadorPerfilRiesgoDirecto6MesesService } from './uat_eqfx_identificador_perfil_riesgo_directo_6_meses.service';
import { UatEqfxIdentificadorPerfilRiesgoDirecto6MesesController } from './uat_eqfx_identificador_perfil_riesgo_directo_6_meses.controller';
import { UatEqfxIdentificadorPerfilRiesgoDirecto6Mese } from './entities/uat_eqfx_identificador_perfil_riesgo_directo_6_mese.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UatEqfxIdentificadorPerfilRiesgoDirecto6MesesController],
	providers: [UatEqfxIdentificadorPerfilRiesgoDirecto6MesesService],
	imports: [TypeOrmModule.forFeature([UatEqfxIdentificadorPerfilRiesgoDirecto6Mese]), AuthModule],
	exports: [UatEqfxIdentificadorPerfilRiesgoDirecto6MesesService]
})
export class UatEqfxIdentificadorPerfilRiesgoDirecto6MesesModule { }
