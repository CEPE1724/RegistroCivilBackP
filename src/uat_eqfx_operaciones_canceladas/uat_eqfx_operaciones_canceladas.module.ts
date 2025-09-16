import { Module } from '@nestjs/common';
import { UatEqfxOperacionesCanceladasService } from './uat_eqfx_operaciones_canceladas.service';
import { UatEqfxOperacionesCanceladasController } from './uat_eqfx_operaciones_canceladas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UatEqfxOperacionesCancelada } from './entities/uat_eqfx_operaciones_cancelada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [UatEqfxOperacionesCanceladasController],
	providers: [UatEqfxOperacionesCanceladasService],
	imports: [TypeOrmModule.forFeature([UatEqfxOperacionesCancelada]), AuthModule],
	exports: [UatEqfxOperacionesCanceladasService]
})
export class UatEqfxOperacionesCanceladasModule { }
