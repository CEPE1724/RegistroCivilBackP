import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxIdentificadorPerfilRiesgoDirecto } from './entities/uat_eqfx_identificador_perfil_riesgo_directo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxIdentificadorPerfilRiesgoDirectoService {

	constructor(
		@InjectRepository(UatEqfxIdentificadorPerfilRiesgoDirecto)
		private readonly UatEqfxIdentificadorPerfilRiesgoDirectoRepository: Repository<UatEqfxIdentificadorPerfilRiesgoDirecto>,
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxIdentificadorPerfilRiesgoDirectoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
