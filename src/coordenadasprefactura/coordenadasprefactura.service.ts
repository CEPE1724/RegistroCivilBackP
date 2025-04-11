import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coordenadasprefactura } from './entities/coordenadasprefactura.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { PaginationGeoreferenciaDto } from 'src/common/dtos/paginationgeoreferencia.dto';
import { CreateCoordenadasprefacturaDto } from './dto/create-coordenadasprefactura.dto';

@Injectable()
export class CoordenadasprefacturaService {

  private readonly logger = new Logger('CoordenadasprefacturaService');

  constructor(
    @InjectRepository(Coordenadasprefactura)
    private readonly coordenadasprefacturaRepository: Repository<Coordenadasprefactura>
  ) { }

  async create(createDto: CreateCoordenadasprefacturaDto): Promise<Coordenadasprefactura> {
    console.log(createDto);

    const existingCoordenada = await this.coordenadasprefacturaRepository.findOne({
      where: { id: createDto.id,
        web: 1,
        Tipo: createDto.Tipo,
       }, // Assuming `id` is the unique identifier
    });
    

    if (existingCoordenada) {
      // Update the existing record
      const updatedCoordenada = this.coordenadasprefacturaRepository.merge(existingCoordenada, createDto);
      return await this.coordenadasprefacturaRepository.save(updatedCoordenada);
    } else {
      // Create a new record
      const nuevaCoordenada = this.coordenadasprefacturaRepository.create(createDto);
      return await this.coordenadasprefacturaRepository.save(nuevaCoordenada);
    }
  }

  async existsAndCount(id: number, Tipo: number): Promise<{ exists: boolean; count: number }> {
	console.log('ID:', id);
	console.log('Tipo:', Tipo);
  
	const [result, count] = await Promise.all([
	  this.coordenadasprefacturaRepository.findOne({
		where: {
		  id,
		  Tipo,
		  web: 1,
		  latitud: Not(IsNull()),
		  longitud: Not(IsNull()),
		},
	  }),
	  this.coordenadasprefacturaRepository.count({
		where: {
		  id,
		  Tipo,
		  web: 1,
		},
	  }),
	]);
  
	const exists = !!result && result.latitud !== 0 && result.longitud !== 0;
  
	return { exists, count };
  }
  

  async findAll(paginationGeoreferenciaDto: PaginationGeoreferenciaDto) {
    const {
      FechaInicio = new Date(),
      FechaFin = new Date(),
      Estado = 0,
      Tipo = 0,
      Cedula = '',
      limit = 10,
      offset = 0,
      orderBy = 'FechaSistema', // Default order by field (can be modified based on your database schema)
      orderDirection = 'asc', // Default order direction
    } = paginationGeoreferenciaDto;

    console.log('FechaInicio:', FechaInicio);
    console.log('FechaFin:', FechaFin);
    console.log('Estado:', Estado);
    console.log('Tipo:', Tipo);
    console.log('Cedula:', Cedula);
    console.log('Ordenar por:', orderBy);
    console.log('Dirección del orden:', orderDirection);

    // Construimos el filtro de la consulta
    const query = this.coordenadasprefacturaRepository.createQueryBuilder('coordenadas')
      .where('coordenadas.FechaSistema BETWEEN :fechaInicio AND :fechaFin', { fechaInicio: FechaInicio, fechaFin: FechaFin });

    // Condicionales para `Estado`, `Tipo`, y `Cedula`
    if (Estado !== 0) {
      query.andWhere('coordenadas.iEstado = :estado', { estado: Estado });
    }

    if (Tipo !== 0) {
      query.andWhere('coordenadas.Tipo = :tipo', { tipo: Tipo });
    }

    if (Cedula) {
      query.andWhere('coordenadas.cedula LIKE :cedula', { cedula: `%${Cedula}%` });
    }

    // Condicional para ordenar
    if (orderBy) {
      query.orderBy(`coordenadas.${orderBy}`, orderDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');
    }

    // Contamos el total de registros que coinciden con los filtros sin paginación
    const totalCount = await query.getCount();

    // Paginación
    query.take(limit);
    query.skip(offset);

    try {
      // Ejecutamos la consulta para obtener los datos paginados
      const creSolicitudWeb = await query.getMany();

      // Devolvemos los datos con el total de registros
      return {
        data: creSolicitudWeb,
        total: totalCount, // Total de registros sin paginación
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }
}
