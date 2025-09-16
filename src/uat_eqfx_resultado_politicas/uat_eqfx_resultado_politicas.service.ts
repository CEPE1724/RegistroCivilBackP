import { Injectable } from '@nestjs/common';
import { UatEqfxResultadoPolitica } from './entities/uat_eqfx_resultado_politica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxResultadoPoliticasService {

	constructor(
		@InjectRepository(UatEqfxResultadoPolitica) private readonly UatEqfxResultadoPoliticaRepository: Repository<UatEqfxResultadoPolitica>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxResultadoPoliticaRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
}
