import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FechaAnalista } from './entities/fecha-analista.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class FechaAnalistaService {
  private readonly logger = new Logger('FechaAnalistaService');

  constructor(
    @InjectRepository(FechaAnalista)
    private readonly fechaAnalistaRepository: Repository<FechaAnalista>
  ) { }

  // Método para obtener las fechas pasadas y la próxima semana
  async getFechaAnalistaWithNextWeek() {
    try {
      // Consulta SQL para obtener las semanas pasadas y la próxima semana
      const query = `
         SELECT 
            idFechaAnalista, 
            CONVERT(VARCHAR, Desde, 103) + ' - ' + CONVERT(VARCHAR, Hasta, 103) AS DesdeHasta,
            convert(date, Desde) as Desde, convert(date, Hasta) as Hasta
        FROM FechaAnalista 
        WHERE GETDATE() > Desde
        UNION ALL
        SELECT TOP 1 
            idFechaAnalista, 
            CONVERT(VARCHAR, Desde, 103) + ' - ' + CONVERT(VARCHAR, Hasta, 103) AS DesdeHasta,
            convert(date, Desde) as Desde, convert(date, Hasta) as Hasta
        FROM FechaAnalista
        WHERE Desde > GETDATE()
        ORDER BY DesdeHasta
      `;

      // Ejecutamos la consulta usando query() de TypeORM
      const result = await this.fechaAnalistaRepository.query(query);

      // Devolvemos el resultado de la consulta
      return result;
    } catch (error) {
      this.logger.error('Error al obtener las fechas de analista', error.stack);
      throw error;
    }
  }



  findAll() {
    return this.fechaAnalistaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} fechaAnalista`;
  }



  remove(id: number) {
    return `This action removes a #${id} fechaAnalista`;
  }
}
