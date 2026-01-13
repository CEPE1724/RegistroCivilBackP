import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAnalisisdeidentidadDto } from './dto/create-analisisdeidentidad.dto';
import { UpdateAnalisisdeidentidadDto } from './dto/update-analisisdeidentidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analisisdeidentidad } from './entities/analisisdeidentidad.entity';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
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

  async updateCresolicitud(identificacion: string, cre_solicitud: string) {
    try {
      /* solo actualizar el campo cre_solicitud 
       update analisisdeidentidad set idCre_SolicitudWeb = cre_solicitud where idAnalisisDeIdentidad = idAnalisisDeIdentidad; */
      this.logger.log(`🔄 Actualizando cre_solicitud para identificacion: ${identificacion} -> cre_solicitud: ${cre_solicitud}`);
      const analisis = await this.analisisDeIdentidadRepository.findOne({ where: { identificacion, idEstadoAnalisisDeIdentidad: 1 } });

      if (!analisis) {
        this.logger.error(`❌ No se encontró un análisis de identidad con identificacion ${identificacion}`);
        throw new InternalServerErrorException('Análisis de identidad no encontrado');
      }
      analisis.sCreSolicitudWeb = cre_solicitud;

      const actualizado = await this.analisisDeIdentidadRepository.save(analisis);
      this.logger.log(`✅ cre_solicitud actualizado correctamente para identificacion ${identificacion}`);
      return actualizado;
    } catch (error) {
      this.logger.error('❌ Error al actualizar cre_solicitud de análisis de identidad', error.stack);
      throw new InternalServerErrorException('Error al actualizar cre_solicitud de análisis de identidad');
    }
  }

  async findAll(identificacion: string, idEstadoAnalisisDeIdentidad: number) {
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
          //idCre_SolicitudWeb: cre_solicitud,
          idEstadoAnalisisDeIdentidad: idEstadoAnalisisDeIdentidad,
        },
        order: { idAnalisisDeIdentidad: 'DESC' },
      });

      return {
        count: analisis ? 1 : 0,
        url: analisis ? analisis.url : null,
        identificacion: analisis ? analisis.identificacion : null,
        short_url: analisis ? analisis.short_url : null,
        valido_hasta: analisis ? analisis.valido_hasta : null,
        codigo: analisis ? analisis.codigo : null,
      };
    } catch (error) {
      this.logger.error('❌ Error al obtener análisis de identidad', error.stack);
      throw new InternalServerErrorException('Error al obtener análisis de identidad');
    }
  }

  async updateRegistrosCaducados(identificacion: string) {
    try {
      /* buscar con la cedula los registros caducados y actualizar su estado a 3 (caducado) */
      const horaActual = new Date();
      horaActual.setHours(horaActual.getHours() - 5);
      this.logger.log(`🔄 Actualizando registros caducados para identificacion: ${identificacion}`);
      const registrosCaducados = await this.analisisDeIdentidadRepository.find({
        where: {
          identificacion: identificacion,
          valido_hasta: LessThan(horaActual), // 👈 ahora sí compara menor a la fecha actual
          idEstadoAnalisisDeIdentidad: 1,
        },
      });
      for (const registro of registrosCaducados) {
        registro.idEstadoAnalisisDeIdentidad = 2;
        await this.analisisDeIdentidadRepository.save(registro);
        this.logger.log(`✅ Registro caducado actualizado: ${registro.idAnalisisDeIdentidad}`);
      }
    } catch (error) {
      this.logger.error('❌ Error al actualizar registros caducados', error.stack);
      throw new InternalServerErrorException('Error al actualizar registros caducados');
    }
  }

  async findAnalisis(identidad: string) {
    try {

      const analisis = await this.analisisDeIdentidadRepository.findOne(
        { where: { identificacion: identidad, 
          idEstadoAnalisisDeIdentidad: In([1, 3]) } });
      return analisis;
    }
    catch (error) {
      this.logger.error('❌ Error al obtener análisis de identidad por cre_solicitud', error.stack);
      throw new InternalServerErrorException('Error al obtener análisis de identidad por cre_solicitud');
    }
  }
  async updateEstadoPorCodigo(codigo: string, idEstadoAnalisisDeIdentidad: number, mensajeError?: string) {
    try {
      this.logger.log(`🔄 Actualizando estado por código: ${codigo} -> Estado ${idEstadoAnalisisDeIdentidad}`);
      // fecha actual
      const fechaActual = new Date();

      const analisis = await this.analisisDeIdentidadRepository.findOne({ where: { codigo } });

      if (!analisis) {
        this.logger.error(`❌ No se encontró un análisis de identidad con código ${codigo}`);
        throw new InternalServerErrorException('Análisis de identidad no encontrado');
      }

      analisis.idEstadoAnalisisDeIdentidad = idEstadoAnalisisDeIdentidad;
      analisis.FechaRespuesta = fechaActual;
      if (mensajeError) {
        analisis.Mensaje = mensajeError;
      }

      const actualizado = await this.analisisDeIdentidadRepository.save(analisis);

      this.logger.log(`✅ Estado actualizado correctamente para código ${codigo}`);
      return actualizado;
    } catch (error) {
      this.logger.error('❌ Error al actualizar estado de análisis de identidad', error.stack);
      throw new InternalServerErrorException('Error al actualizar estado de análisis de identidad');
    }
  }
}