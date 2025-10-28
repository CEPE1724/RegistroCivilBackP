import { Injectable } from '@nestjs/common';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {

	constructor(
		@InjectRepository(Cliente)
		private readonly clienteRepository: Repository<Cliente>,
	) { }

	async findOne(id: string) {
		const result = await this.clienteRepository.findOne({ where: { Ruc: id, Proveedor: false } })
		if (!result) {
			return {
				success: false,
				message: `No se encontró ningún cliente con la cedula ${id}`,
			};
		}
		return {
			success: true,
			data: result,
		};
	}
}
