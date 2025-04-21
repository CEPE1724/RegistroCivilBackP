import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FechaVerificador } from './entities/fecha-verificador.entity';

@Injectable()
export class FechaVerificadorService {
  private readonly logger = new Logger('FechaVerificadorService');

  constructor(
    @InjectRepository(FechaVerificador)
    private readonly fechaVerificadorRepository: Repository<FechaVerificador>
  ) {}

  // Método para obtener las fechas pasadas y la próxima semana
  async getFechaVerificadorWithNextWeek() {
    try {
      const query = `
         SELECT 
            idFechaVerificador, 
            CONVERT(VARCHAR, Desde, 103) + ' - ' + CONVERT(VARCHAR, Hasta, 103) AS DesdeHasta,
            convert(date, Desde) as Desde, convert(date, Hasta) as Hasta
        FROM FechaVerificador 
        WHERE GETDATE() > Desde
        UNION ALL
        SELECT TOP 1 
            idFechaVerificador, 
            CONVERT(VARCHAR, Desde, 103) + ' - ' + CONVERT(VARCHAR, Hasta, 103) AS DesdeHasta,
            convert(date, Desde) as Desde, convert(date, Hasta) as Hasta
        FROM FechaVerificador
        WHERE Desde > GETDATE()
        ORDER BY DesdeHasta
      `;

      const result = await this.fechaVerificadorRepository.query(query);
      return result;
    } catch (error) {
      this.logger.error('Error al obtener las fechas de verificador', error.stack);
      throw error;
    }
  }

  findAll() {
    return this.fechaVerificadorRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} fechaVerificador`;
  }

  remove(id: number) {
    return `This action removes a #${id} fechaVerificador`;
  }
}
