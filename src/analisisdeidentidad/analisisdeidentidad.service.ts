import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAnalisisdeidentidadDto } from './dto/create-analisisdeidentidad.dto';
import { UpdateAnalisisdeidentidadDto } from './dto/update-analisisdeidentidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analisisdeidentidad } from './entities/analisisdeidentidad.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { url } from 'inspector';

@Injectable()
export class AnalisisdeidentidadService {
  private readonly logger = new Logger('AnalisisdeidentidadService');

  constructor(
    @InjectRepository(Analisisdeidentidad)
    private readonly analisisDeIdentidadRepository: Repository<Analisisdeidentidad>,
  ) { }

  async create(createAnalisisdeidentidadDto: CreateAnalisisdeidentidadDto) {
    try {
      const nuevoAnalisis = this.analisisDeIdentidadRepository.create(createAnalisisdeidentidadDto);
      return await this.analisisDeIdentidadRepository.save(nuevoAnalisis);
    } catch (error) {
      this.logger.error('❌ Error al crear análisis de identidad', error.stack);
      throw new InternalServerErrorException('Error al crear análisis de identidad');
    }
  }

  async findAll(identificacion: string, cre_solicitud: number) {
    try {
      /* Hora actual Ecuador (UTC-5) */
      const horaActual = new Date();
      horaActual.setHours(horaActual.getHours() - 5);

      this.logger.log(`⏰ Hora actual Ecuador: ${horaActual.toISOString()}`);

      /* Buscar registros con la misma identificación y fecha válida */
      const analisis = await this.analisisDeIdentidadRepository.findOne({
        where: {
          identificacion: identificacion,
          valido_hasta: MoreThan(horaActual), // 👈 clave: comparar fecha
          idCre_SolicitudWeb: cre_solicitud,
          idEstadoAnalisisDeIdentidad: 1,
        },
        order: { idAnalisisDeIdentidad: 'DESC' },
      });

      return {
        count: analisis ? 1 : 0,
        url: analisis ? analisis.url : null,
        identificacion: analisis ? analisis.identificacion : null,
        short_url: analisis ? analisis.short_url : null,
        valido_hasta: analisis ? analisis.valido_hasta : null,
      };
    } catch (error) {
      this.logger.error('❌ Error al obtener análisis de identidad', error.stack);
      throw new InternalServerErrorException('Error al obtener análisis de identidad');
    }
  }
}