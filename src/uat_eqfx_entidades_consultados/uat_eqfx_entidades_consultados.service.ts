import { Injectable } from '@nestjs/common';
import { UatEqfxEntidadesConsultado } from './entities/uat_eqfx_entidades_consultado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxEntidadesConsultadosService {

	constructor(
		@InjectRepository(UatEqfxEntidadesConsultado)
		private readonly UatEqfxEntidadesConsultadoRepository: Repository<UatEqfxEntidadesConsultado>,
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxEntidadesConsultadoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
