import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaHistoricaSep } from './entities/uat_eqfx_detalle_deuda_historica_sep.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxDetalleDeudaHistoricaSepsService {

	constructor(
		@InjectRepository(UatEqfxDetalleDeudaHistoricaSep)
		private readonly UatEqfxDetalleDeudaHistoricaSepRepository: Repository<UatEqfxDetalleDeudaHistoricaSep>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleDeudaHistoricaSepRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}

		const dataWithSegmento = result.map((item) => ({
			...item,
			segmento: 'SEPS',
		}));

		return {
			success: true,
			data: dataWithSegmento,
		};

	}
}
