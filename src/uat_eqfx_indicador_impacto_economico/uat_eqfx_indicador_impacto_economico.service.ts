import { Injectable } from '@nestjs/common';
import { CreateUatEqfxIndicadorImpactoEconomicoDto } from './dto/create-uat_eqfx_indicador_impacto_economico.dto';
import { UpdateUatEqfxIndicadorImpactoEconomicoDto } from './dto/update-uat_eqfx_indicador_impacto_economico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxIndicadorImpactoEconomico } from './entities/uat_eqfx_indicador_impacto_economico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxIndicadorImpactoEconomicoService {

	constructor(
		@InjectRepository(UatEqfxIndicadorImpactoEconomico) private readonly UatEqfxIndicadorImpactoEconomicoRepository: Repository<UatEqfxIndicadorImpactoEconomico>
	) { }


	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxIndicadorImpactoEconomicoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}
		return {
			success: true,
			data: result,
		};
	}


	async findOne(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxIndicadorImpactoEconomicoRepository.findOne({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento con el id: ${idEQFX_IdentificacionConsultada}`,
			};
		}
		return {
			success: true,
			data: result,
		};
	}
}
