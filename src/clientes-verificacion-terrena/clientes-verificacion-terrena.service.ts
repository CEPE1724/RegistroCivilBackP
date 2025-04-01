import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClientesVerificacionTerrenaDto } from './dto/create-clientes-verificacion-terrena.dto';
import { UpdateClientesVerificacionTerrenaDto } from './dto/update-clientes-verificacion-terrena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesVerificacionTerrena } from './entities/clientes-verificacion-terrena.entity';

@Injectable()
export class ClientesVerificacionTerrenaService {

	private readonly logger = new Logger('ClientesVerificacionTerrenaService');

	constructor(
			@InjectRepository(ClientesVerificacionTerrena)
			private readonly clientesVerificacionTerrenaRepository: Repository<ClientesVerificacionTerrena>,
	) {}

  create(createClientesVerificacionTerrenaDto: CreateClientesVerificacionTerrenaDto) {
    return 'This action adds a new clientesVerificacionTerrena';
  }

  async createVerificacionBasica(data: {
	idCre_solicitud?: number;
	idVerificador?: number;
	bDomicilio?: boolean;
	bTrabajo?: boolean;
	Usuario?: string;
  }): Promise<ClientesVerificacionTerrena> {
	try {
	  const nuevaVerificacion = this.clientesVerificacionTerrenaRepository.create({
		idCre_solicitud: data.idCre_solicitud,
		idVerificador: data.idVerificador,
		bDomicilio: data.bDomicilio,
		bTrabajo: data.bTrabajo,
		Usuario: data.Usuario,
	  });
  
	  return await this.clientesVerificacionTerrenaRepository.save(nuevaVerificacion);
	} catch (error) {
	  this.handleDBException(error);
	}
  }
  

  findAll() {
    return `This action returns all clientesVerificacionTerrena`;
  }

  async findOne(idCreSolicitud: number) {
    return await this.clientesVerificacionTerrenaRepository.findOne({
      where: { idCre_solicitud: idCreSolicitud, Web: 1 }, 
      select: ['idTerrenaGestionDomicilio', 'idTerrenaGestionTrabajo'],
    });
  }
  update(id: number, updateClientesVerificacionTerrenaDto: UpdateClientesVerificacionTerrenaDto) {
    return `This action updates a #${id} clientesVerificacionTerrena`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientesVerificacionTerrena`;
  }

	private handleDBException(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException(error.detail);
		}
		this.logger.error(error);
		throw new InternalServerErrorException('Unexpected error');

	}
}
