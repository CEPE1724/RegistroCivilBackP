import { Injectable } from '@nestjs/common';
import { UatEqfxCreditosOtorgado } from './entities/uat_eqfx_creditos_otorgado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxCreditosOtorgadosService {

	constructor(
		@InjectRepository(UatEqfxCreditosOtorgado)
		private readonly UatEqfxCreditosOtorgadoRepository: 
		Repository<UatEqfxCreditosOtorgado>,
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxCreditosOtorgadoRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
