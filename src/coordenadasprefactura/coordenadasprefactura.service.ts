import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coordenadasprefactura } from './entities/coordenadasprefactura.entity';
import { Repository } from 'typeorm';
import { PaginationGeoreferenciaDto } from 'src/common/dtos/paginationgeoreferencia.dto';

@Injectable()
export class CoordenadasprefacturaService {

  private readonly logger = new Logger('CoordenadasprefacturaService');

  constructor(
    @InjectRepository(Coordenadasprefactura)
    private readonly coordenadasprefacturaRepository: Repository<Coordenadasprefactura>
  ) { }

  async findAll(paginationGeoreferenciaDto: PaginationGeoreferenciaDto) {
    const {
      FechaInicio = new Date(),
      FechaFin = new Date(),
      Estado = 0,
      Tipo = 0,
      Cedula = '',
      limit = 10,
      offset = 0,
    } = paginationGeoreferenciaDto;

    console.log('FechaInicio:', FechaInicio);
    console.log('FechaFin:', FechaFin);
    console.log('Estado:', Estado);
    console.log('Tipo:', Tipo);
    console.log('Cedula:', Cedula);

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
