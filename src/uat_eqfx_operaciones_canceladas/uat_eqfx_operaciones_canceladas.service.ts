import { Injectable } from '@nestjs/common';
import { UatEqfxOperacionesCancelada } from './entities/uat_eqfx_operaciones_cancelada.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxOperacionesCanceladasService {

	constructor(
		@InjectRepository(UatEqfxOperacionesCancelada) private readonly UatEqfxOperacionesCanceladaRepository: Repository<UatEqfxOperacionesCancelada>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxOperacionesCanceladaRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
