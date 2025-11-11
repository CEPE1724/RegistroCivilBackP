import { Injectable } from '@nestjs/common';
import { CreateUatEqfxScoreDto } from './dto/create-uat_eqfx_score.dto';
import { UpdateUatEqfxScoreDto } from './dto/update-uat_eqfx_score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxScore } from './entities/uat_eqfx_score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxScoreService {

	constructor(
		@InjectRepository(UatEqfxScore) private readonly UatEqfxScoreRepository: Repository<UatEqfxScore>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxScoreRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
		const result = await this.UatEqfxScoreRepository.findOne({ where: { idEQFX_IdentificacionConsultada } });
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
