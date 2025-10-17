import { Module } from '@nestjs/common';
import { UatEqfxScoreSobreendeudamientoService } from './uat_eqfx_score_sobreendeudamiento.service';
import { UatEqfxScoreSobreendeudamientoController } from './uat_eqfx_score_sobreendeudamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UatEqfxScoreSobreendeudamiento } from './entities/uat_eqfx_score_sobreendeudamiento.entity';


@Module({
	controllers: [UatEqfxScoreSobreendeudamientoController],
	providers: [UatEqfxScoreSobreendeudamientoService],
	imports: [TypeOrmModule.forFeature([UatEqfxScoreSobreendeudamiento]), AuthModule],
	exports: [UatEqfxScoreSobreendeudamientoService]
})
export class UatEqfxScoreSobreendeudamientoModule { }
