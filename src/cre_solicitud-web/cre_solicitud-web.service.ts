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

import { Socket } from 'dgram';

@Injectable()
export class CreSolicitudWebService {

  private readonly logger = new Logger('CreSolicitudWebService');

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>,
    private readonly authService: AuthService,
    private readonly eqfxidentificacionconsultadaService: EqfxidentificacionconsultadaService,
    private readonly creSolicitudwebWsGateway: CreSolicitudwebWsGateway,
    private readonly creSolicitudwebWsService : CreSolicitudwebWsService,
    private readonly notifierService : SolicitudWebNotifierService
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
    try {
      // Validar si el cliente es persona natural o jurídica

      const creSolicitudWeb = this.creSolicitudWebRepository.create(createCreSolicitudWebDto);
      await this.creSolicitudWebRepository.save(creSolicitudWeb);
      /* obtener el id de la solicitud creada y cedula */

      this.creSolicitudwebWsGateway.wss.emit('solicitud-web-changed', {
        id: creSolicitudWeb.idCre_SolicitudWeb,
        cambios: createCreSolicitudWebDto,
      });

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
      console.log('saveDataNatural', saveDataNatural);
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


      if (bApiDataTrabajo && apiDataTrabajo.trabajos && apiDataTrabajo.trabajos.length > 0 && apiDataTrabajo.trabajos[0].fechaActualizacion) {
        // Si tiene datos, se guarda la información
        await this.authService.createTrabajo(apiDataTrabajo, saveData.idCognoSolicitudCredito);
      }


      // validar tipo cliente

      const storedProcedureResult = await this.callStoredProcedureRetornaTipoCliente(cedula, idSolicitud);
      const tipoCliente = storedProcedureResult[0].TipoCliente;
      const Resultado = storedProcedureResult[0].Resultado;

      // actualizar el tipo de cliente en la tabla cre_solicitud_web
      const estado = Resultado === 0 ? 5 : 1;
      await this.creSolicitudWebRepository.update(idSolicitud, { idTipoCliente: tipoCliente ? tipoCliente : 0, Estado: estado });

      return creSolicitudWeb;
    } catch (error) {
      this.handleDBException(error);
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
      const apiData = await this.authService.getApiData(token, cedula);

      if (apiData.estado.codigo === "OK") {
        
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

        return { identificacion, nombre, fechaNacimiento, edad: age, codigo: apiData.estado.codigo,
          ...partesNombre
         };
      }
      return { codigo: false }; // Devuelve falso si el estado no es "OK"
    } catch (error) {
      this.logger.error('Error al obtener la solicitud de Cogno', error);
      return { codigo: false }; // Devuelve falso en caso de error
    }
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
    queryBuilder = queryBuilder.skip(offset).take(limit);

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
    const { limit = 10, offset = 0, fechaInicio, fechaFin, estado, vendedor = 0, analista = 0, EstadoSolicitud = 0, EstadoDocumental = 0, EstadoTelefonica = 0, cedula, nombres, numeroSolicitud } = paginationDto;


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
    if (bodega && bodega.length > 0) {
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
      const nombreBusqueda = `%${nombres}%`;
      queryBuilder.andWhere(
        `(cre_solicitud_web.PrimerNombre LIKE :nombreBusqueda OR 
          cre_solicitud_web.SegundoNombre LIKE :nombreBusqueda OR 
          cre_solicitud_web.ApellidoPaterno LIKE :nombreBusqueda OR 
          cre_solicitud_web.ApellidoMaterno LIKE :nombreBusqueda)`,
        { nombreBusqueda }
      );
    }
    // Obtener el conteo total de registros
    const totalCount = await queryBuilder.getCount();

    // Aplicar la paginación
    queryBuilder.skip(offset).take(limit);

    // Obtener los registros filtrados
    const creSolicitudWeb = await queryBuilder.getMany();

    return {
      data: creSolicitudWeb,
      total: totalCount,
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
