import { Module } from '@nestjs/common';
import { UatEqfxResultadoPoliticasService } from './uat_eqfx_resultado_politicas.service';
import { UatEqfxResultadoPoliticasController } from './uat_eqfx_resultado_politicas.controller';
import { UatEqfxResultadoPolitica } from './entities/uat_eqfx_resultado_politica.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [UatEqfxResultadoPoliticasController],
	providers: [UatEqfxResultadoPoliticasService],
	imports: [TypeOrmModule.forFeature([UatEqfxResultadoPolitica]), AuthModule],
	exports: [UatEqfxResultadoPoliticasService]
})
export class UatEqfxResultadoPoliticasModule { }
