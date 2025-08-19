import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateIngresoCobradorDto } from './dto/create-ingreso-cobrador.dto';
import { UpdateIngresoCobradorDto } from './dto/update-ingreso-cobrador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { IngresoCobrador } from './entities/ingreso-cobrador.entity';

@Injectable()
export class IngresoCobradorService {

	private readonly logger = new Logger('IngresoCobradorService')

	constructor(
		@InjectRepository(IngresoCobrador)
		private readonly ingresoCobradorRepository: Repository<IngresoCobrador>,
	) { }

	async findAll() {
		try {
			return await this.ingresoCobradorRepository.find({
				where: {
					idIngresoCobrador: Not(271),
					idCom_Estado: Not(2)
				},
				relations: ['dispositivos'],
				select: {
					idIngresoCobrador: true,
					Nombre: true,
					dispositivos: {
						TokenExpo: true
					}
				}
			});
		} catch (error) {
			this.handleDBException(error);
		}
	}


	/* PROCEIDMIENTO ALMACENADO PARA TRAER LOS COBRADORES POR ZONA */
	/*ALTER PROCEDURE [dbo].[RetornaVerificadorSolicitudWeb]
	@idCre_SolicitudWeb int, @iDomicilio int 
AS*/
	async findAllZona(idCre_SolicitudWeb: number, idDomicilio: number) {
		if (idCre_SolicitudWeb == null || idCre_SolicitudWeb == undefined) {
			throw new BadRequestException('El parámetro idCre_SolicitudWeb no puede ser nulo o indefinido');
		}
		if (idDomicilio == null || idDomicilio == undefined) {
			throw new BadRequestException('El parámetro idDomicilio no puede ser nulo o indefinido');
		}

		try {
			const query = `EXEC RetornaVerificadorSolicitudWeb @idCre_SolicitudWeb = ${idCre_SolicitudWeb}, @iDomicilio = ${idDomicilio}`;
			const result = await this.ingresoCobradorRepository.query(query);

			// Mapear el resultado al formato requerido
			const mapped = result.map(row => ({
				idIngresoCobrador: row.idIngresoCobrador,
				Nombre: row.Nombre,
				dispositivos: [
					{
						TokenExpo: row.TokenExpo || ""
					}
				]
			}));

			return mapped;
		} catch (error) {
			this.handleDBException(error);
		}
	}


	private handleDBException(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}
		this.logger.error(error);
		throw new InternalServerErrorException('Unexpected error');

	}
}
