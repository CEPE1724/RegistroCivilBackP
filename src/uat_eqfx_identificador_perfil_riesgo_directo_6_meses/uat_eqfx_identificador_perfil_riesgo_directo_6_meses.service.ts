import { Injectable } from '@nestjs/common';
import { UatEqfxIdentificadorPerfilRiesgoDirecto6Mese } from './entities/uat_eqfx_identificador_perfil_riesgo_directo_6_mese.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxIdentificadorPerfilRiesgoDirecto6MesesService {

	constructor(
		@InjectRepository(UatEqfxIdentificadorPerfilRiesgoDirecto6Mese)
		private readonly UatEqfxIdentificadorPerfilRiesgoDirecto6MeseRepository: Repository<UatEqfxIdentificadorPerfilRiesgoDirecto6Mese>,
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxIdentificadorPerfilRiesgoDirecto6MeseRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
