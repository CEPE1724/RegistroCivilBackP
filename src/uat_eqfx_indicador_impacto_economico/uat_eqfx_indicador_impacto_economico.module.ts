import { Module } from '@nestjs/common';
import { UatEqfxIndicadorImpactoEconomicoService } from './uat_eqfx_indicador_impacto_economico.service';
import { UatEqfxIndicadorImpactoEconomicoController } from './uat_eqfx_indicador_impacto_economico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxIndicadorImpactoEconomico } from './entities/uat_eqfx_indicador_impacto_economico.entity';

@Module({
	controllers: [UatEqfxIndicadorImpactoEconomicoController],
	providers: [UatEqfxIndicadorImpactoEconomicoService],
	imports: [TypeOrmModule.forFeature([UatEqfxIndicadorImpactoEconomico])],
	exports: [UatEqfxIndicadorImpactoEconomicoService]
})
export class UatEqfxIndicadorImpactoEconomicoModule { }
