import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UatEqfxDetalleDeudaHistoricaSicom } from './entities/uat_eqfx_detalle_deuda_historica_sicom.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UatEqfxDetalleDeudaHistoricaSicomService {

	constructor(
		@InjectRepository(UatEqfxDetalleDeudaHistoricaSicom)
		private readonly UatEqfxDetalleDeudaHistoricaSicomRepository: Repository<UatEqfxDetalleDeudaHistoricaSicom>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxDetalleDeudaHistoricaSicomRepository.find({ where: { idEQFX_IdentificacionConsultada } });
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún documento`,
			};
		}

		const dataWithSegmento = result.map((item) => ({
			...item,
			segmento: 'SICOM',
		}));

		return {
			success: true,
			data: dataWithSegmento,
		};
	}
}
