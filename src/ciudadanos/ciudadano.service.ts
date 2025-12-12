import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Ciudadano } from './ciudadano.entity';
import { HttpService } from '@nestjs/axios'; // Necesario para hacer peticiones HTTP
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import * as fs from 'fs';
@Injectable()
export class CiudadanoService {
  constructor(
    @InjectRepository(Ciudadano)
    private ciudadanoRepository: Repository<Ciudadano>,
    private readonly httpService: HttpService, // Inyectamos el HttpService
    private readonly configService: ConfigService,
  ) { }

  /**
   * Método principal: Busca ciudadano en BD local, si no existe consulta Registro Civil
   */
  async buscarOConsultarCiudadano(cedula: string, dactilar: string, usuario: string): Promise<{
    success: boolean;
    message: string;
    source: 'local' | 'registro_civil' | null;
    data: Ciudadano | null;
    error?: string;
  }> {
    try {
      // 1. Buscar primero en la base de datos local
      console.log(`🔍 Buscando ciudadano ${cedula} en base de datos local...`);
      let ciudadano = await this.findByNUI(cedula);
      
      // 2. Si se encuentra en BD local, retornar
      if (ciudadano) {
        console.log(`✅ Ciudadano ${cedula} encontrado en BD local`);
        return {
          success: true,
          message: 'Ciudadano encontrado en base de datos local',
          source: 'local',
          data: ciudadano,
        };
      }

      // 3. Si no existe en BD local, consultar al Registro Civil
      console.log(`🌐 Ciudadano ${cedula} no encontrado en BD. Consultando Registro Civil...`);
      
      try {
        ciudadano = await this.consultarDactilar(cedula, dactilar, usuario);

        console.log(`✅ Ciudadano ${cedula} consultado y guardado desde Registro Civil`);
        
        return {
          success: true,
          message: 'Ciudadano consultado desde Registro Civil y guardado exitosamente',
          source: 'registro_civil',
          data: ciudadano,
        };
      } catch (rcError) {
        console.error(`❌ Error al consultar Registro Civil para ${cedula}:`, rcError.message);
        
        // Si falla la consulta al Registro Civil
        return {
          success: false,
          message: `No se pudo encontrar el ciudadano con cédula ${cedula} en el Registro Civil`,
          source: null,
          data: null,
          error: rcError.message,
        };
      }
    } catch (error) {
      console.error(`❌ Error general en búsqueda de ciudadano ${cedula}:`, error.message);
      
      return {
        success: false,
        message: 'Error interno al buscar el ciudadano',
        source: null,
        data: null,
        error: error.message,
      };
    }
  }

  async guardarCiudadano(data: any, dactilar: string, usuario: string): Promise<Ciudadano> {
    try {
      const ciudadano = new Ciudadano();
      ciudadano.NUI = data.NUI;
      ciudadano.CODIGODACTILAR = dactilar;
      ciudadano.NOMBRE = data.NOMBRE;
      ciudadano.NOMBRES = data.NOMBRES;
      ciudadano.APELLIDOS = data.APELLIDOS;
      ciudadano.SEXO = data.SEXO;
      ciudadano.FECHANACIMIENTO = data.FECHANACIMIENTO;
      ciudadano.FECHACEDULACION = data.FECHACEDULACION;
      ciudadano.INSTRUCCION = data.INSTRUCCION;
      ciudadano.PROFESION = data.PROFESION;
      ciudadano.NACIONALIDAD = data.NACIONALIDAD;
      ciudadano.CONDICIONCEDULADO = data.CONDICIONCEDULADO;
      ciudadano.ESTADOCIVIL = data.ESTADOCIVIL;
      ciudadano.NOMBREPADRE = data.NOMBREPADRE;
      ciudadano.NOMBREMADRE = data.NOMBREMADRE;
      ciudadano.FOTO = data.FOTO;
      ciudadano.FIRMA = data.FIRMA;
      ciudadano.DOMICILIO = data.DOMICILIO.DOMICILIO;
      ciudadano.CALLE = data.DOMICILIO.CALLE;
      ciudadano.NUMEROCASA = data.DOMICILIO.NUMEROCASA;
      ciudadano.LUGARNACIMIENTO = data.NACIMIENTO.LUGARNACIMIENTO;
      ciudadano.CONYUGE = data.CONYUGE.CONYUGE;
      ciudadano.FECHAMATRIMONIO = data.CONYUGE.FECHAMATRIMONIO;
      ciudadano.FECHAFALLECIMIENTO = data.DEFUNCION.FECHAFALLECIMIENTO;
      ciudadano.USUARIO = usuario; // Guardar el usuario que realizó la consulta
      ciudadano.FECHACONSULTA = new Date();
      return await this.ciudadanoRepository.save(ciudadano);
    } catch (error) {
      console.error('Error al guardar ciudadano:', error.message);
      throw new HttpException(
        'Error al guardar los datos del ciudadano',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async obtenerTodos(queryParams: {
    NOMBRE?: string;
    NUI?: string;
    FECHACONSULTA?: Date;
  }, page: number = 1, pageSize: number = 10): Promise<any> {
    try {
      // Crear filtros dinámicos según los parámetros
      const filters: FindOptionsWhere<Ciudadano> = {};

      if (queryParams.NOMBRE) {
        filters.NOMBRE = Like(`%${queryParams.NOMBRE}%`); // Búsqueda parcial por nombre
      }

      if (queryParams.NUI) {
        filters.NUI = queryParams.NUI; // Búsqueda exacta por NUI
      }

      // Calcular skip (offset) y take (limit) para la paginación
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      // Realizar la consulta con los filtros y la paginación
      const [ciudadanos, total] = await this.ciudadanoRepository.findAndCount({
        where: filters,
        skip, // El salto de registros a omitir
        take, // El número de registros a tomar
      });

      // Retornar los ciudadanos junto con la información de la paginación
      return {
        data: ciudadanos,
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      console.error('Error al obtener ciudadanos con filtros y paginación:', error.message);
      throw new Error('Error al obtener los ciudadanos');
    }
  }


  async findByNUI(NUI: string): Promise<Ciudadano | null> {
    try {
      const ciudadano = await this.ciudadanoRepository.findOneBy({ NUI });
      return ciudadano || null;
    } catch (error) {
      console.error(
        `Error al buscar ciudadano con Cédula ${NUI}:`,
        error.message,
      );
      throw new HttpException(
        'Error al buscar el ciudadano',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async autenticarRegistroCivil(): Promise<string> {
    // Cargar los valores de configuración desde configService
    const authUrl = this.configService.get<string>('API_URL_AUTH');  // URL de autenticación
    const username = this.configService.get<string>('RC_USERNAME');  // Nombre de usuario
    const password = this.configService.get<string>('RC_PASSWORD');  // Contraseña

    if (!authUrl || !username || !password) {
      //console.error('❌ Configuración incompleta para autenticación con Registro Civil');
      throw new HttpException('Faltan variables de entorno de autenticación', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Verificar que los valores se han cargado correctamente

    try {
      // ✅ Crear agente HTTPS con el certificado .pfx
      const httpsAgent = new https.Agent({
        pfx: fs.readFileSync('C:\\Deployment\\SSL\\app.services.pfx'),
        passphrase: 'P01nT$2025_APP_sevices', // ⚠️ pon la contraseña que usaste al exportar el certificado
        rejectUnauthorized: false,           // Desactivar validación solo si es entorno de pruebas
        secureProtocol: 'TLSv1_2_method',    // Fuerza uso de TLS 1.2
      });

      // ✅ Configuración de Axios
      const axiosConfig = {
        httpsAgent,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.32.2', // Simula Postman
        },
      };

      // ✅ Petición al Registro Civil
      const authResponse: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          authUrl,
          { username, password },
          axiosConfig,
        ),
      );

     // console.log('✅ Respuesta completa:', authResponse.data);

      // ✅ Validar respuesta
      if (authResponse.data?.mensaje?.codigo === '000') {
       // console.log('🔐 Token recibido correctamente');
        return authResponse.data.auth.token;
      } else {
        console.error('⚠️ Error de autenticación:', authResponse.data?.mensaje?.mensaje);
        throw new HttpException(
          'Error en la autenticación con Registro Civil',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      // 🔻 Manejo detallado de errores
      console.error('❌ Error durante la autenticación con Registro Civil');

      if (error.response) {
        console.error('🔸 Respuesta del servidor:', error.response.data);
        console.error('🔸 Código HTTP:', error.response.status);
      } else if (error.request) {
        console.error('🔸 No hubo respuesta del servidor:', error.request);
      } else {
        console.error('🔸 Error interno:', error.message);
      }

      throw new HttpException(
        'Error en la autenticación con Registro Civil',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }


  // Método para consultar el registro dactilar
  async consultarDactilar(cedula: string, dactilar: string, usuario: string): Promise<any> {
    const tokenRC = await this.autenticarRegistroCivil();
    const dactilarTruncado = dactilar.slice(0, 6);
    const apiUrl = this.configService.get<string>('API_URL_ADC');

    const username = this.configService.get<string>('RC_USERNAME');
    const codigoInstitucion = this.configService.get<string>('RC_CODIGO_INST');
    const codigoAgencia = this.configService.get<string>('RC_CODIGO_AG');

    // Crear un agente HTTPS sin validación de SSL
    const agent = new https.Agent({
      rejectUnauthorized: false  // Esto desactiva la validación del certificado SSL
    });

    // Preparar el body y los headers
    const requestBody = {
      username: username,
      codigoInstitucion: codigoInstitucion,
      codigoAgencia: codigoAgencia,
      nui: cedula,
      codigoDactilar: dactilarTruncado,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenRC}`,
    };



    try {
      const dacResponse: AxiosResponse = await lastValueFrom(
        this.httpService.post(apiUrl, requestBody, { headers: requestHeaders, httpsAgent: agent })
      );

      // Verificar si la respuesta fue exitosa
      if (dacResponse.data.codigo === '000') {
        return await this.guardarCiudadano(dacResponse.data.ciudadano, dactilar, usuario);
      } else {
        throw new HttpException(
          'Consulta fallida en Registro Civil',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      // Manejo detallado del error
      console.error('Error al consultar dactilar:', error);

      // Si el error tiene respuesta, mostrarla
      if (error.response) {
        console.error('Error de respuesta del servidor:', error.response.data);
        throw new HttpException(
          `Error de consulta: ${JSON.stringify(error.response.data)}`,
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      // Si el error tiene una solicitud pero no respuesta
      else if (error.request) {
        console.error('No hubo respuesta del servidor:', error.request);
        throw new HttpException(
          'No se obtuvo respuesta del servidor de Registro Civil',
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }
      // Si el error ocurrió en la configuración de la solicitud
      else {
        console.error('Error en la configuración de la solicitud:', error.message);
        throw new HttpException(
          'Error interno en la configuración de la consulta',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // Manejo de errores de Axios
  private handleAxiosError(error: any): void {
    if (error.response) {
      console.error('Error de respuesta del servidor:', error.response.data);
      throw new HttpException(
        `Error en la consulta: ${JSON.stringify(error.response.data)}`,
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
      throw new HttpException(
        'No se obtuvo respuesta del servidor de Registro Civil',
        HttpStatus.GATEWAY_TIMEOUT,
      );
    } else {
      console.error(
        'Error en la configuración de la solicitud:',
        error.message,
      );
      throw new HttpException(
        'Error interno en la configuración de la consulta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
