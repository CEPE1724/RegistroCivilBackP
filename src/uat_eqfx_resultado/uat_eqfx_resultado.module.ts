import { Module } from '@nestjs/common';
import { UatEqfxResultadoService } from './uat_eqfx_resultado.service';
import { UatEqfxResultadoController } from './uat_eqfx_resultado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxResultado } from './entities/uat_eqfx_resultado.entity';

@Module({
	controllers: [UatEqfxResultadoController],
	providers: [UatEqfxResultadoService],
	imports: [TypeOrmModule.forFeature([UatEqfxResultado])],
	exports: [UatEqfxResultadoService]
})
export class UatEqfxResultadoModule { }
