import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxScoreInclusion } from './entities/uat_eqfx_score_inclusion.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UatEqfxScoreInclusionService {

	constructor(
		@InjectRepository(UatEqfxScoreInclusion) private readonly UatEqfxScoreInclusionRepository: Repository<UatEqfxScoreInclusion>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxScoreInclusionRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
		const result = await this.UatEqfxScoreInclusionRepository.findOne({ where: { idEQFX_IdentificacionConsultada } });
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
