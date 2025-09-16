import { Module } from '@nestjs/common';
import { UatEqfxIdentificadorPerfilRiesgoDirectoService } from './uat_eqfx_identificador_perfil_riesgo_directo.service';
import { UatEqfxIdentificadorPerfilRiesgoDirectoController } from './uat_eqfx_identificador_perfil_riesgo_directo.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxIdentificadorPerfilRiesgoDirecto } from './entities/uat_eqfx_identificador_perfil_riesgo_directo.entity';

@Module({
	controllers: [UatEqfxIdentificadorPerfilRiesgoDirectoController],
	providers: [UatEqfxIdentificadorPerfilRiesgoDirectoService],
	imports: [TypeOrmModule.forFeature([UatEqfxIdentificadorPerfilRiesgoDirecto]), AuthModule],
	exports: [UatEqfxIdentificadorPerfilRiesgoDirectoService]
})
export class UatEqfxIdentificadorPerfilRiesgoDirectoModule { }
