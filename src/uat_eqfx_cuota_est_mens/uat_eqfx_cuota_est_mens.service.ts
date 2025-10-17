import { Injectable, Logger } from '@nestjs/common';
import { UatEqfxCuotaEstMen } from './entities/uat_eqfx_cuota_est_men.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxCuotaEstMensService {
	private readonly logger = new Logger('UatEqfxCuotaEstMensService');

	constructor(
		@InjectRepository(UatEqfxCuotaEstMen)
		private readonly UatEqfxCuotaEstMenRepository: Repository<UatEqfxCuotaEstMen>
	) { }

	async findOne(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxCuotaEstMenRepository.findOne({ where: { idEQFX_IdentificacionConsultada } });
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
