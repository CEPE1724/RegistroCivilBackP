import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Brackets, In, Repository } from 'typeorm';
import axios from 'axios';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterCreSolicitudWebDto } from './dto/filter-cre-solicitud-web.dto';
import { AuthService } from 'src/cognosolicitudcredito/auth/auth.service';
import { EqfxidentificacionconsultadaService } from 'src/eqfxidentificacionconsultada/eqfxidentificacionconsultada.service';
import { CreSolicitudwebWsGateway } from "../cre_solicitudweb-ws/cre_solicitudweb-ws.gateway";
import { CreSolicitudwebWsService } from 'src/cre_solicitudweb-ws/cre_solicitudweb-ws.service';
import { SolicitudWebNotifierService } from './solicitud-web-notifier.service';
import { EmailService } from 'src/email/email.service';
import { Socket } from 'dgram';
import { where } from 'sequelize';
import { DeudaEmovDto } from 'src/cognosolicitudcredito/dto/deudaEmov/deuda-emov.dto';
import { AfiliacionesDto } from 'src/cognosolicitudcredito/dto/afiliaciones/afiliaciones.dto';
import { AfiliacionIessDto } from 'src/cognosolicitudcredito/dto/afiliacion_iess/afiliacionesIess.dto';


@Injectable()
export class CreSolicitudWebService {
  private readonly EQFX_UAT = process.env.EQFX_UAT;
  private readonly EQFX_UAT_url = process.env.EQFX_UAT_url;
  private readonly EQFX_UAT_token = process.env.EQFX_UAT_token;
  private readonly logger = new Logger('CreSolicitudWebService');

  private readonly processingRequests = new Map<string, { timestamp: number }>();
  private readonly LOCK_TIMEOUT = 30000; // 30 segundos

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>,
    private readonly authService: AuthService,
    private readonly eqfxidentificacionconsultadaService: EqfxidentificacionconsultadaService,
    private readonly creSolicitudwebWsGateway: CreSolicitudwebWsGateway,
    private readonly creSolicitudwebWsService: CreSolicitudwebWsService,
    private readonly notifierService: SolicitudWebNotifierService,
    private readonly emailService: EmailService,

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

  private async EquifaxDataUAT(tipoDocumento: string, numeroDocumento: string): Promise<{ success: boolean, message: string }> {

    const PostData = {
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento
    };
    try {
      const response = await axios.post(this.EQFX_UAT_url, PostData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.EQFX_UAT_token}`
        }
      });
      console.log('Respuesta Equifax UAT:', response.data);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error("Error al obtener datos de Equifax:", error);
      return { success: false, message: "Error al obtener datos de Equifax." };
    }
  }
  private async callStoredProcedureRetornaTipoCliente(cedula: string, idSolicitud: number): Promise<any> {
    try {

      // Ejecutamos la consulta y pasamos el parámetro correctamente
      const result = await this.creSolicitudWebRepository.query(
        `EXEC Cre_RetornaTipoCliente @Cedula = @0, @idSolicitud = @1`, // Usamos el nombre del parámetro en la consulta
        [cedula, idSolicitud] // Aseguramos que el parámetro se pase como un objeto con el tipo correcto
      );
      // Si el procedimiento devuelve algo, procesamos el resultado
      return result;
    } catch (error) {
      this.logger.error('Error al llamar al procedimiento Cre_RetornaTipoCliente', error);
      throw new Error('Error al llamar al procedimiento almacenado Cre_RetornaTipoCliente');
    }
  }



  async create(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
  const cedula = createCreSolicitudWebDto.Cedula;


  const processing = this.processingRequests.get(cedula);
  if (processing && Date.now() - processing.timestamp < this.LOCK_TIMEOUT) {
    return {
      success: false,
      mensaje: 'Ya existe una solicitud en proceso para esta cédula. Por favor espere.',
      errorOrigen: 'SolicitudEnProceso',
      data: null,
    };
  }
  this.processingRequests.set(cedula, { timestamp: Date.now() });

  try {

    const existingSolicitud = await this.creSolicitudWebRepository.findOne({
      where: { Cedula: cedula, Estado: In([1, 2]) },
    });

    if (existingSolicitud) {
      return {
        success: false,
        mensaje: `Ya existe una solicitud activa (N° ${existingSolicitud.NumeroSolicitud}) para la cédula ${cedula}.`,
        errorOrigen: 'SolicitudExistente',
        data: null,
      };
    }


    let debeConsultarEquifax = true;
    let eqfxData = await this.eqfxidentificacionconsultadaService.findOneUAT(cedula);

    if (eqfxData.success) {
      const fechaConsulta = new Date(eqfxData.data.FechaSistema);
      const fechaActual = new Date();
      if (fechaConsulta.getMonth() === fechaActual.getMonth() &&
          fechaConsulta.getFullYear() === fechaActual.getFullYear()) {
        debeConsultarEquifax = false; // Datos recientes, no consultar API externa
      }
    }


    if (debeConsultarEquifax) {
      const equifaxResult = await this.EquifaxDataUAT('C', cedula);
      if (!equifaxResult.success) {
        return {
          success: false,
          mensaje: 'No se pudo consultar los datos en Equifax. Intente nuevamente más tarde.',
          errorOrigen: 'Equifax',
          data: null,
        };
      }
    }

    const token = await this.authService.getToken(cedula);
    if (!token) {
      return {
        success: false,
        mensaje: 'Token Cogno falló. No se pudo continuar con el proceso.',
        errorOrigen: 'AuthService',
        data: null,
      };
    }

    const apiResult = await this.authService.getApiData(token, cedula);
    if (!apiResult.success) {
      return {
        success: false,
        mensaje: `Error desde API externa: ${apiResult.mensaje}`,
        errorOrigen: 'ApiExterna',
        data: null,
      };
    }

    // Datos laborales
    const trabajoResult = await this.authService.getApiDataTrabajo(token, cedula);
    const JubiladoResult = await this.authService.getApiDataJubilado(token, cedula);

    const creSolicitudWeb = this.creSolicitudWebRepository.create(createCreSolicitudWebDto);
    const savedSolicitud = await this.creSolicitudWebRepository.save(creSolicitudWeb);


    await this.authService.create(apiResult.data, trabajoResult.success && trabajoResult.data?.trabajos?.length > 0, savedSolicitud.idCre_SolicitudWeb);

    if (JubiladoResult.success && JubiladoResult.data?.trabajos?.length) {
      await this.authService.createTrabajoLite(JubiladoResult.data.trabajos, savedSolicitud.idCre_SolicitudWeb);
    }

    const storedProcedureResult = await this.creSolicitudWebRepository.query(
      `EXEC Cre_RetornaTipoCliente @Cedula = @0, @idSolicitud = @1`,
      [cedula, savedSolicitud.idCre_SolicitudWeb]
    );

    const tipoCliente = storedProcedureResult?.[0]?.TipoCliente || 0;
    const estado = storedProcedureResult?.[0]?.Resultado === 0 ? 5 : 1;

    await this.creSolicitudWebRepository.update(savedSolicitud.idCre_SolicitudWeb, {
      idTipoCliente: tipoCliente,
      Estado: estado,
    });


    this.creSolicitudwebWsGateway.wss.emit('solicitud-web-changed', {
      id: savedSolicitud.idCre_SolicitudWeb,
      cambios: createCreSolicitudWebDto,
    });

    return {
      success: true,
      mensaje: `Solicitud N° ${savedSolicitud.NumeroSolicitud} creada exitosamente.`,
      data: await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb: savedSolicitud.idCre_SolicitudWeb } }),
    };

  } catch (error) {
    this.logger.error(`Error en create para cédula ${cedula}: ${error.message}`, error.stack);
    return {
      success: false,
      mensaje: 'Ocurrió un error inesperado al procesar la solicitud.',
      error: error.message,
      errorOrigen: 'Servidor',
    };
  } finally {
    this.processingRequests.delete(cedula);
  }
}



  async procesarDatosCogno(cedula: string) {
    try {

      const token = await this.authService.getToken(cedula);
      if (!token) {
        return {
          success: false,
          mensaje: 'Error al obtener token de COGNO.',
          errorOrigen: 'AuthService',
          data: null,
        };
      }


      const apiResult = await this.authService.getApiData(token, cedula);
      if (!apiResult.success) {
        return {
          success: false,
          mensaje: `Error desde API externa: ${apiResult.mensaje}`,
          errorOrigen: 'ApiExterna',
          data: null,
        };
      }
      const apiData = apiResult.data;

      /** ────────────────────────────────
       * 💼 3. Consultar datos laborales y deuda EMOV
       * ──────────────────────────────── */
      const trabajoResult = await this.authService.getApiDataTrabajo(token, cedula);

      const deudaEmovResult = await this.authService.getApiDataDeudaEmov(token, cedula);
      const deudaData: DeudaEmovDto = deudaEmovResult.data?.deudaEmov?.[0];

      const IssfacCertMedico = await this.authService.getApiIssfacCertMedico(token, cedula);
      const IssfacCertMedicoData: AfiliacionesDto = IssfacCertMedico.data?.afiliaciones || [];

      const afiliacionIess = await this.authService.getafilicacion_iess(token, cedula);
      const afiliacionIessData: AfiliacionIessDto = afiliacionIess.data?.afiliacionIess?.[0];

      console.log('Afiliacion IESS Data:', afiliacionIess);
      const trabajos = trabajoResult.data?.trabajos || [];
      const bApiDataTrabajo = trabajos.length > 0;

      /** ────────────────────────────────
       * 💾 4. Guardar datos de COGNO
       * ──────────────────────────────── */
      const saveData = await this.authService.create(apiData, bApiDataTrabajo, 0);

      // Guardar persona natural
      await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

      // Guardar conyugue si existe
      const conyuge = apiData.personaNaturalConyuge?.personaConyuge;
      if (conyuge?.identificacion && conyuge?.nombre) {
        await this.authService.createNaturalConyugue(apiData, saveData.idCognoSolicitudCredito, 1);
      }

      // Guardar lugar nacimiento si existe
      const lugarNacimiento = apiData.personaNatural?.lugarNacimiento;
      if (lugarNacimiento) {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
      }

      // Si está casado, guardar domicilio conyuge
      if (apiData.estadoCivil?.estadoCivil?.descripcion === 'CASADO') {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
      }

      // Nacionalidades y profesiones
      await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);
      await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);

      // Deuda EMOV
      if (deudaData) {
        await this.authService.guardarDeudaEmovConInfracciones(deudaData, saveData.idCognoSolicitudCredito);
      }

      // Afiliaciones ISSFAC
      if (IssfacCertMedicoData) {
        await this.authService.saveCognoIssfacCertMedico(IssfacCertMedicoData, saveData.idCognoSolicitudCredito);
      }

      // Afiliacion IESS
      if (afiliacionIessData) {
        await this.authService.saveCognoAfiliacionIess(afiliacionIessData, saveData.idCognoSolicitudCredito);
      }

      // Trabajos (si existen)
      if (bApiDataTrabajo && trabajos[0]?.fechaActualizacion) {
        await this.authService.createTrabajo(trabajos, saveData.idCognoSolicitudCredito);
      }



      return {
        success: true,
        mensaje: 'Datos de COGNO procesados correctamente.',
        data: saveData,
      };
    } catch (error) {
      this.logger.error(`❌ Error al procesar datos COGNO: ${error.message}`);
      return {
        success: false,
        mensaje: 'Error al procesar datos de COGNO.',
        error: error.message,
        errorOrigen: 'Cogno',
      };
    }
  }



  private readonly preposiciones = ['DE', 'DEL', 'LA', 'LOS', 'LAS'];

  private isPrepositional(word: string): boolean {
    return this.preposiciones.includes(word.toUpperCase());
  }

  private agruparCompuesto(palabras: string[], startIndex: number): { valor: string, nextIndex: number } {
    let compuesto = palabras[startIndex];
    let i = startIndex + 1;

    while (i < palabras.length && this.isPrepositional(palabras[i])) {
      compuesto += ' ' + palabras[i];
      i++;
      if (i < palabras.length) {
        compuesto += ' ' + palabras[i];
        i++;
      }
    }

    return { valor: compuesto, nextIndex: i };
  }

  private splitNombreCompleto(nombreCompleto: string) {
    const palabras = nombreCompleto.trim().split(/\s+/);
    let i = 0;

    // Apellido Paterno
    const apellido1 = this.agruparCompuesto(palabras, i);
    const apellidoPaterno = apellido1.valor;
    i = apellido1.nextIndex;

    // Apellido Materno
    const apellido2 = this.agruparCompuesto(palabras, i);
    const apellidoMaterno = apellido2.valor;
    i = apellido2.nextIndex;

    // Resto son nombres
    const nombresRestantes = palabras.slice(i);
    const primerNombre = nombresRestantes[0] || '';
    const segundoNombre = nombresRestantes.slice(1).join(' ') || '';

    return {
      apellidoPaterno: apellidoPaterno.toUpperCase(),
      apellidoMaterno: apellidoMaterno.toUpperCase(),
      primerNombre: primerNombre.toUpperCase(),
      segundoNombre: segundoNombre.toUpperCase(),
    };
  }

  private toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }

  async getSolicitudCogno(cedula: string) {
    try {
      const token = await this.authService.getToken(cedula); // Llamada a AuthService para obtener el token

      const apiData = await this.authService.getApiDataFind(token, cedula);
      const apiJubilado = await this.authService.getApiDataJubilado(token, cedula);

      if (apiData.estado.codigo === "OK") {
        const apiLaboral = await this.authService.getApiDataTrabajo(token, cedula);
        let afiliado = false;
        let afiliadoVoluntario = false;

        if (
          apiLaboral?.success === true &&
          apiLaboral?.data?.estado?.codigo === 'OK' &&
          Array.isArray(apiLaboral.data.trabajos) &&
          apiLaboral.data.trabajos.length > 0
        ) {
          afiliado = true;

          const trabajos = apiLaboral?.data?.trabajos;

          if (Array.isArray(trabajos) && trabajos.length > 0) {
            const cargoNombre = trabajos[0].cargo?.nombre || '';

            if (cargoNombre.toUpperCase().includes('VOLUNTA')) {
              afiliado = false;
              afiliadoVoluntario = true;
            }
          }

        } else {
          afiliado = false;
        }

        const trabajoJubilado = apiJubilado.success && Array.isArray(apiJubilado.data?.trabajos) && apiJubilado.data.trabajos.length > 0 ? true : false;

        const { identificacion, nombre, fechaNacimiento } = apiData.personaNatural;
        const partesNombre = this.splitNombreCompleto(nombre);

        // Calcular la edad actual en años
        const birthDate = new Date(fechaNacimiento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        afiliado = trabajoJubilado ? true : afiliado;

        return {
          identificacion, nombre, fechaNacimiento, edad: age, codigo: apiData.estado.codigo, afiliado: afiliado, afiliadoVoluntario: afiliadoVoluntario,
          trabajoJubilado: trabajoJubilado, jubilado: trabajoJubilado,
          ...partesNombre
        };
      }
      return {
        codigo: false,

      }; // Devuelve falso si el estado no es "OK"
    } catch (error) {
      this.logger.error('Error al obtener la solicitud de Cogno', error);
      return { codigo: false }; // Devuelve falso en caso de error
    }
  }

  async getMotivoContinuidad(Vendedor: number) {
    // consultar solicitud web con idMotivoContinuidad = 0 i estado in [1,2] y devolver solo NumeroSolicitud-Cedula-Fecha and la fecha sea mayor a 13/08/2025 y menor al dia actual
    //console .log('Vendedor:', Vendedor);
    const fechaInicio = new Date('2025-08-17');
    // Obtener la fecha actual en la zona horaria de Ecuador (UTC-5)
    const fechaFin = new Date(
      new Date(new Date().toLocaleString("en-US", { timeZone: "America/Guayaquil" }))
        .setDate(new Date().getDate() - 1)
    );
    const queryBuilder = this.creSolicitudWebRepository
      .createQueryBuilder('cre')
      .select(['cre.NumeroSolicitud', 'cre.Cedula', 'cre.Fecha', 'cre.ApellidoMaterno',
        'cre.ApellidoPaterno', 'cre.PrimerNombre', 'cre.SegundoNombre', 'cre.idCre_SolicitudWeb'


      ])
      .where('cre.idMotivoContinuidad = :idMotivoContinuidad', { idMotivoContinuidad: 0 })
      .andWhere('cre.Estado IN (:...estados)', { estados: [1, 2] })
      .andWhere('CONVERT(date, cre.Fecha) BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin });

    if (Vendedor > 0) {
      queryBuilder.andWhere('cre.idVendedor = :Vendedor', { Vendedor });
    }

    queryBuilder.orderBy('cre.Fecha', 'DESC');

    // count de registros
    const totalCount = await queryBuilder.getCount();
    // Ejecutar la consulta para obtener los resultados
    const creSolicitudWeb = await queryBuilder.getMany();
    // Retornar los resultados con el total count
    return {
      totalCount,
      data: creSolicitudWeb,
    };
  }


  async findAllFilter(filterCreSolicitudWebDto: FilterCreSolicitudWebDto) {
    const { limit = 10, offset = 0, Filtro = '', bodega = 0 } = filterCreSolicitudWebDto;

    let queryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Filtro por bodega
    if (bodega > 0) {
      queryBuilder = queryBuilder.andWhere('cre_solicitud_web.Bodega = :bodega', { bodega });
    }

    // Filtro general por nombre o cualquier otro campo
    if (Filtro) {
      queryBuilder = queryBuilder.andWhere(
        `cre_solicitud_web.NumeroSolicitud LIKE :Filtro OR cre_solicitud_web.PrimerNombre LIKE :Filtro OR cre_solicitud_web.SegundoNombre LIKE :Filtro`,
        { Filtro: `%${Filtro}%` },
      );
    }

    // Para obtener el total count de los registros
    const totalCountQueryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Reaplicar los mismos filtros sin paginación
    if (bodega > 0) {
      totalCountQueryBuilder.andWhere('cre_solicitud_web.Bodega = :bodega', { bodega });
    }
    if (Filtro) {
      totalCountQueryBuilder.andWhere(
        `cre_solicitud_web.NumeroSolicitud LIKE :Filtro OR cre_solicitud_web.PrimerNombre LIKE :Filtro OR cre_solicitud_web.SegundoNombre LIKE :Filtro`,
        { Filtro: `%${Filtro}%` },
      );
    }

    // Ejecutar la consulta para el total count
    const totalCount = await totalCountQueryBuilder.getCount();

    // Aplicar paginación a la consulta principal
    // queryBuilder = queryBuilder.skip(offset).take(limit);
    if (limit && limit > 0) {
      queryBuilder.skip(offset).take(limit);
    }
    // Ejecutar la consulta para obtener los resultados
    try {
      const creSolicitudWeb = await queryBuilder.getMany();

      // Retornar los resultados con el total count
      return {
        totalCount,
        data: creSolicitudWeb,
      };
    } catch (error) {
      throw new Error(`Error al obtener solicitudes: ${error.message}`);
    }
  }






  async findAll(paginationDto: PaginationDto, bodega: number[]) {
    const { limit, offset = 0, fechaInicio, fechaFin, estado, vendedor = 0, analista = 0, EstadoSolicitud = 0, EstadoDocumental = 0, EstadoTelefonica = 0, cedula, nombres, numeroSolicitud, idTipoCliente = 0, idCompraEncuesta = 0, operador = 0 } = paginationDto;


    const queryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Aplicar los filtros de fechas con las horas ajustadas
    if (fechaInicio && fechaFin) {
      const fechaInicioStr = fechaInicio.toISOString().split('T')[0];
      const fechaFinStr = fechaFin.toISOString().split('T')[0];

      queryBuilder.andWhere(
        'CONVERT(date, cre_solicitud_web.Fecha) BETWEEN CONVERT(date, :fechaInicio) AND CONVERT(date, :fechaFin)',
        { fechaInicio: fechaInicioStr, fechaFin: fechaFinStr }
      );
    }

    if (estado !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.estado = :estado OR :estado = 0)', { estado });
    }

    if (vendedor !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idVendedor = :vendedor OR :vendedor = 0)', { vendedor });
    }

    if (analista !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idAnalista = :analista OR :analista = 0)', { analista });
    }

    if (operador !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idOperador = :operador OR :operador = 0)', { operador });
    }


    if (EstadoSolicitud !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idEstadoVerificacionSolicitud = :EstadoSolicitud OR :EstadoSolicitud = 0)', { EstadoSolicitud });
    }

    if (EstadoDocumental !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idEstadoVerificacionDocumental = :EstadoDocumental OR :EstadoDocumental = 0)', { EstadoDocumental });
    }

    if (EstadoTelefonica !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idEstadoVerificacionTelefonica = :EstadoTelefonica OR :EstadoTelefonica = 0)', { EstadoTelefonica });
    }
    // Agregar el filtro para bodegas usando IN si el array de bodegasIds no está vacío
    if (bodega && bodega.length === 1) {
      queryBuilder.andWhere('cre_solicitud_web.bodega IN (:...bodega)', { bodega });
    }

    if (cedula) {
      queryBuilder.andWhere('cre_solicitud_web.Cedula LIKE :cedula', {
        cedula: `%${cedula}%`,
      });
    }

    // Filtro por número de solicitud
    if (numeroSolicitud) {
      queryBuilder.andWhere('cre_solicitud_web.NumeroSolicitud LIKE :numeroSolicitud', {
        numeroSolicitud: `%${numeroSolicitud}%`,
      });
    }

    // Filtro por nombres y apellidos (búsqueda parcial)
    if (nombres) {
      const nombreBusqueda = `${nombres}%`; // Buscar por inicio es más rápido
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('cre_solicitud_web.PrimerNombre LIKE :nombreBusqueda', { nombreBusqueda })
            .orWhere('cre_solicitud_web.SegundoNombre LIKE :nombreBusqueda', { nombreBusqueda })
            .orWhere('cre_solicitud_web.ApellidoPaterno LIKE :nombreBusqueda', { nombreBusqueda })
            .orWhere('cre_solicitud_web.ApellidoMaterno LIKE :nombreBusqueda', { nombreBusqueda });
        })
      );
    }
    // Filtro por idTipoCliente
    if (idTipoCliente !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idTipoCliente = :idTipoCliente OR :idTipoCliente = 0)', { idTipoCliente });
    }
    // Filtro por idCompraEncuesta
    if (idCompraEncuesta !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idCompraEncuesta = :idCompraEncuesta OR :idCompraEncuesta = 0)', { idCompraEncuesta });
    }

    // Optimización: Ejecutar data y count en paralelo
    const [data, totalCount] = await Promise.all([
      queryBuilder
        .clone()
        .orderBy('cre_solicitud_web.Fecha', 'DESC')
        .skip(offset)
        .take(limit)
        .getMany(),
      queryBuilder
        .clone()
        .select('COUNT(1)', 'cnt')
        .getRawOne()
        .then(r => parseInt(r.cnt, 10))
    ]);

    return {
      data,          // ya contiene los registros paginados
      total: totalCount, // total sin paginación
    };

  }




  /*async findAll(paginationDto: PaginationDto) {
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
  }*/



  async getSolicitudesWebRepositorio(anio?: number, mes?: number): Promise<any[]> {

    const anioValue = (anio != null && !isNaN(anio)) ? anio : 'NULL';
    const mesValue = (mes != null && !isNaN(mes)) ? mes : 'NULL';
    const query = `EXEC sp_GetSolicitudWebRepositorio @Anio = ${anioValue}, @Mes = ${mesValue}`;


    const result = await this.creSolicitudWebRepository.query(query);
    return result;
  }

  findOne(id: number) {
    return this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb: id } });
  }

  async update(
    idCre_SolicitudWeb: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {

      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };
      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);













      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;
    } catch (error) {
      this.handleDBException(error);
    }
  }




  async updateTelefonica(
    idCre_SolicitudWeb: number,
    idEstadoVerificacionDocumental: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {

      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };
      creSolicitudWeb.idEstadoVerificacionDocumental = idEstadoVerificacionDocumental;
      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,

      });

      return updated;
    } catch (error) {
      this.handleDBException(error);
    }
  }



  // cre_solicitud-web.service.ts
  async updateSolicitud(
    idCre_SolicitudWeb: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    console.log('➡️ Ejecutando updateSolicitud');

    const idUsuarioEjecutor = usuarioEjecutor?.idUsuario;
    const idGrupoEjecutor = usuarioEjecutor?.idGrupo;

    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({
      where: { idCre_SolicitudWeb },
    });

    if (!creSolicitudWeb) {
      console.log('❌ Registro no encontrado');
      throw new NotFoundException('Registro no encontrado');
    }

    try {
      // Actualizar la entidad
      // Asegúrate de que no estás asignando valores a los métodos
      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };


      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      // ✅ Emitir evento y notificaciones desde un único punto
      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;

    } catch (error) {
      console.error('❗ Error al actualizar la solicitud:', error);
      this.handleDBException(error);
    }
  }
  async verificarCedulaBodega(cedula: string): Promise<{ existe: boolean, solicitud: object }> {
    // Optimización: Usar queryBuilder para select específico
    const solicitudExistente = await this.creSolicitudWebRepository
      .createQueryBuilder('csw')
      .select([
        'csw.idCre_SolicitudWeb',
        'csw.NumeroSolicitud',
        'csw.Cedula',
        'csw.PrimerNombre',
        'csw.ApellidoPaterno'
      ])
      .where('csw.Cedula = :cedula', { cedula })
      .andWhere('csw.Estado IN (:...estados)', { estados: [1, 2] })
      .getOne();

    return {
      existe: !!solicitudExistente,
      solicitud: solicitudExistente || null,
    };
  }



  async updateCodDactilar(
    idCre_SolicitudWeb: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {

      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };

      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;
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
