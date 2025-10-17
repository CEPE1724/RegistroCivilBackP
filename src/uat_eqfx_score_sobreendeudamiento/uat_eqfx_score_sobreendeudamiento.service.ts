import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxScoreSobreendeudamiento } from './entities/uat_eqfx_score_sobreendeudamiento.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UatEqfxScoreSobreendeudamientoService {
	private readonly logger = new Logger('UatEqfxScoreSobreendeudamientoService')
	constructor(
		@InjectRepository(UatEqfxScoreSobreendeudamiento)
		private readonly UatEqfxScoreSobreendeudamientoRepository: Repository<UatEqfxScoreSobreendeudamiento>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxScoreSobreendeudamientoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
		const result = await this.UatEqfxScoreSobreendeudamientoRepository.findOne({ where: { idEQFX_IdentificacionConsultada } });
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
