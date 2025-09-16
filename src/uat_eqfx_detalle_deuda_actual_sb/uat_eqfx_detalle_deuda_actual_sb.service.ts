import { Injectable } from '@nestjs/common';
import { UatEqfxDetalleDeudaActualSb } from './entities/uat_eqfx_detalle_deuda_actual_sb.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxDetalleDeudaActualSbService {

	constructor(
		@InjectRepository(UatEqfxDetalleDeudaActualSb)
		private readonly UatEqfxDetalleDeudaActualSbRepository:
			Repository<UatEqfxDetalleDeudaActualSb>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleDeudaActualSbRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
