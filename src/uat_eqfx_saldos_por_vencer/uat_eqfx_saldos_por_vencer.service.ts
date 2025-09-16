import { Injectable } from '@nestjs/common';
import { CreateUatEqfxSaldosPorVencerDto } from './dto/create-uat_eqfx_saldos_por_vencer.dto';
import { UpdateUatEqfxSaldosPorVencerDto } from './dto/update-uat_eqfx_saldos_por_vencer.dto';
import { UatEqfxSaldosPorVencer } from './entities/uat_eqfx_saldos_por_vencer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UatEqfxSaldosPorVencerService {

	constructor(
		@InjectRepository(UatEqfxSaldosPorVencer) private readonly UatEqfxSaldosPorVencerRepository: Repository<UatEqfxSaldosPorVencer>
	) { }

	async findAll(idEQFX_IdentificacionConsultada: number) {
		const result = await this.UatEqfxSaldosPorVencerRepository.find({ where: { idEQFX_IdentificacionConsultada } });
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
