import { Controller, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UatEqfxDetalleDeudaHistoricaSb } from './entities/uat_eqfx_detalle_deuda_historica_sb.entity';


@Injectable()
export class UatEqfxDetalleDeudaHistoricaSbService {

	constructor(
		@InjectRepository(UatEqfxDetalleDeudaHistoricaSb)
		private readonly UatEqfxDetalleDeudaHistoricaSbRepository: Repository<UatEqfxDetalleDeudaHistoricaSb>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleDeudaHistoricaSbRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}

		const dataWithSegmento = result.map((item) => ({
			...item,
			segmento: 'SB',
		}));

		return {
			success: true,
			data: dataWithSegmento,
		};
	}

}
