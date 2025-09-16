import { Injectable } from '@nestjs/common';
import { UatEqfxDeudaHistorica } from './entities/uat_eqfx_deuda_historica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxDeudaHistoricaService {

	constructor(
		@InjectRepository(UatEqfxDeudaHistorica)
		private readonly UatEqfxDeudaHistoricaRepository: Repository<UatEqfxDeudaHistorica>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDeudaHistoricaRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
