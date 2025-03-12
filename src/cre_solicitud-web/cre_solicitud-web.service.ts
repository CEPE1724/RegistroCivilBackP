import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Brackets, In, Repository } from 'typeorm';
import axios from 'axios';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthService } from 'src/cognosolicitudcredito/auth/auth.service';
import { EqfxidentificacionconsultadaService } from 'src/eqfxidentificacionconsultada/eqfxidentificacionconsultada.service';
@Injectable()
export class CreSolicitudWebService {

  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>,
    private readonly authService: AuthService,
    private readonly eqfxidentificacionconsultadaService: EqfxidentificacionconsultadaService
  ) { }

  private async EquifaxData(tipoDocumento: string, numeroDocumento: string): Promise<{ success: boolean, message: string }> {
    const PostData = {
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento
    };
    try {
      const response = await axios.post('https://appservices.com.ec/v1/equifax/consultarEquifax', PostData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error("Error al obtener datos de Equifax:", error);
      return { success: false, message: "Error al obtener datos de Equifax." };
    }
  }

  private async callStoredProcedureRetornaTipoCliente(cedula: string): Promise<any> {
    try {

      // Ejecutamos la consulta y pasamos el parámetro correctamente
      const result = await this.creSolicitudWebRepository.query(
        `EXEC Cre_RetornaTipoCliente @Cedula = @0`, // Usamos el nombre del parámetro en la consulta
        [cedula] // Aseguramos que el parámetro se pase como un objeto con el tipo correcto
      );
      // Si el procedimiento devuelve algo, procesamos el resultado
      return result;
    } catch (error) {
      this.logger.error('Error al llamar al procedimiento Cre_RetornaTipoCliente', error);
      throw new Error('Error al llamar al procedimiento almacenado Cre_RetornaTipoCliente');
    }
  }

  async create(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
    try {
      // Validar si el cliente es persona natural o jurídica

      const creSolicitudWeb = this.creSolicitudWebRepository.create(createCreSolicitudWebDto);
      await this.creSolicitudWebRepository.save(creSolicitudWeb);
      /* obtener el id de la solicitud creada y cedula */
      const idSolicitud = creSolicitudWeb.idCre_SolicitudWeb;
      const cedula = creSolicitudWeb.Cedula;
      const token = await this.authService.getToken(cedula); // Llamada a AuthService para obtener el token
      // llamamao a la api de equifax con la cedula
      const eqfxData = await this.eqfxidentificacionconsultadaService.findOne(cedula);
      if (eqfxData.success) {
        const FechaConsulta = eqfxData.data.FechaSistema;

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Convertir la fecha de sistema a un objeto Date
        const fechaSistema = new Date(FechaConsulta);

        // Calcular la diferencia en milisegundos
        const diferenciaTiempo = fechaActual.getTime() - fechaSistema.getTime();

        // Convertir la diferencia a meses (milisegundos en un mes = 1000 * 60 * 60 * 24 * 30)
        const diferenciaMeses = diferenciaTiempo / (1000 * 60 * 60 * 24 * 30);

        // Validar si la diferencia es mayor a 3 meses
        if (diferenciaMeses > 3) {
          await this.EquifaxData('C', cedula);
        }
        // Mostrar el resultado
      }
      else {
        // si no existe busca o consume la api de equifax
        await this.EquifaxData('C', cedula);
      }

      // Llamamos a getApiData con el token obtenido
      const apiData = await this.authService.getApiData(token, cedula);

      // Lógica adicional para manejar los datos obtenidos
      const apiDataTrabajo = await this.authService.getApiDataTrabajo(token, cedula);
      let bApiDataTrabajo = false;

      if (apiDataTrabajo.trabajos) {
        bApiDataTrabajo = apiDataTrabajo.trabajos.length > 0;
      }

      // Guardamos los datos
      const saveData = await this.authService.create(apiData, bApiDataTrabajo, idSolicitud);

      const saveDataNatural = await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

      if (apiData.personaNaturalConyuge.personaConyuge.identificacion && apiData.personaNaturalConyuge.personaConyuge.nombre) {
        if (apiData.personaNaturalConyuge.personaConyuge.identificacion !== null && apiData.personaNaturalConyuge.personaConyuge.nombre !== '') {
          await this.authService.createNaturalConyugue(apiData, saveData.idCognoSolicitudCredito, 1);
        }
      }

      // Crear lugar de nacimiento primeor validar si exiten datos
      if (apiData.personaNatural.lugarNacimiento !== null && apiData.personaNatural.lugarNacimiento !== '') {

        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
      }

      // Domicilio del cónyuge
      if (apiData.estadoCivil.estadoCivil.descripcion === 'CASADO') {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 2);
      }

      // Crear nacionalidades, profesiones y trabajos
      await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);
      await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);


      if (bApiDataTrabajo && apiDataTrabajo.trabajos.personaPatrono && apiDataTrabajo.trabajos.personaPatrono.identificacion) {
        await this.authService.createTrabajo(apiDataTrabajo, saveData.idCognoSolicitudCredito);
      }


      // validar tipo cliente
      const storedProcedureResult = await this.callStoredProcedureRetornaTipoCliente(cedula);
      const tipoCliente = storedProcedureResult[0].TipoCliente;

      // actualizar el tipo de cliente en la tabla cre_solicitud_web
      await this.creSolicitudWebRepository.update(idSolicitud, { idTipoCliente: tipoCliente ? tipoCliente : 0 });

      return creSolicitudWeb;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, Filtro = '' } = paginationDto;

    let creSolicitudWeb: CreSolicitudWeb[];

    const queryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Solo agregar el filtro si Filtro tiene un valor
    if (Filtro) {

      // Aplica un filtro a las columnas
      queryBuilder.where(
        new Brackets(qb => {
          qb.where('LOWER(cre_solicitud_web.NumeroSolicitud) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Cedula) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Apellidos) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Nombres) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Celular) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` })
            .orWhere('LOWER(cre_solicitud_web.Email) LIKE LOWER(:Filtro)', { Filtro: `%${Filtro}%` });
        })
      );
    }

    // Aplicar la paginación
    const totalCount = await queryBuilder.getCount();

    // Aplicar la paginación
    queryBuilder.skip(offset).take(limit);

    // Ejecutar la consulta para obtener los registros
    creSolicitudWeb = await queryBuilder.getMany();

    if (creSolicitudWeb.length === 0) {
      throw new NotFoundException('No se encontraron registros');
    }

    // Devolver los registros junto con el total de registros
    return {
      data: creSolicitudWeb,
      total: totalCount, // Total de registros sin paginación
    };
  }

  findOne(id: number) {
    return this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb: id } });
  }

  async update(idCre_SolicitudWeb: number, updateCreSolicitudWebDto: UpdateCreSolicitudWebDto) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }
    try {
      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      await this.creSolicitudWebRepository.save(creSolicitudWeb);
      return creSolicitudWeb;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} creSolicitudWeb`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
}
