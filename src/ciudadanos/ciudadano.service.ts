import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Ciudadano } from './ciudadano.entity';
import { HttpService } from '@nestjs/axios'; // Necesario para hacer peticiones HTTP
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
@Injectable()
export class CiudadanoService {
  constructor(
    @InjectRepository(Ciudadano)
    private ciudadanoRepository: Repository<Ciudadano>,
    private readonly httpService: HttpService, // Inyectamos el HttpService
    private readonly configService: ConfigService,
  ) {}

  async guardarCiudadano(data: any, dactilar: string): Promise<Ciudadano> {
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


  async findByNUI(NUI: string): Promise<Ciudadano> {
    try {
      const ciudadano = await this.ciudadanoRepository.findOneBy({ NUI });
      if (!ciudadano) {
        throw new HttpException(
          'Ciudadano no encontrado en nuestra BDD',
          HttpStatus.NOT_FOUND,
        );
      }
      return ciudadano;
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
    
    // Verificar que los valores se han cargado correctamente
   
    try {
      // Configuración de Axios con desactivación de validación SSL
      const axiosConfig = {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),  // Desactivar validación de certificado SSL
        headers: {
          'Content-Type': 'application/json',  // Asegurarse de que el tipo de contenido sea JSON
        },
      };

      // Realizar la solicitud POST con los valores de configuración
      const authResponse: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          authUrl,  // URL obtenida desde la configuración
          {
            username: username,
            password: password,
          },
          axiosConfig,  // Pasar la configuración que incluye desactivación SSL
        ),
      );

      // Verificar si la autenticación fue exitosa
      if (authResponse.data.mensaje.codigo === '000') {
        return authResponse.data.auth.token;  // Retornar el token de autenticación
      } else {
        // Si la autenticación falla, se lanza una excepción
        console.error('Error de autenticación:', authResponse.data.mensaje.mensaje);
        throw new HttpException(
          'Error en la autenticación con Registro Civil',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      // Manejo de errores de Axios con detalles adicionales
      if (error.response) {
        // Si hay respuesta pero el servidor devuelve un error
        console.error('Error de respuesta del servidor:', error.response.data);
        console.error('Código de error:', error.response.status);
      } else if (error.request) {
        // Si no hubo respuesta del servidor
        console.error('No hubo respuesta del servidor:', error.request);
      } else {
        // Error en la configuración de la solicitud
        console.error('Error en la configuración de la solicitud:', error.message);
      }

      // Lanzar una excepción si ocurre un error en la autenticación
      throw new HttpException(
        'Error en la autenticación con Registro Civil',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }


  // Método para consultar el registro dactilar
  async consultarDactilar(cedula: string, dactilar: string): Promise<any> {
    const tokenRC = await this.autenticarRegistroCivil();
    console.log('edison:', tokenRC);
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
  
    // Mostrar los datos antes de hacer la solicitud
    console.log('Headers:', requestHeaders);
    console.log('Body:', requestBody);
  
    try {
      const dacResponse: AxiosResponse = await lastValueFrom(
        this.httpService.post(apiUrl, requestBody, { headers: requestHeaders, httpsAgent: agent })
      );
  
      // Verificar si la respuesta fue exitosa
      if (dacResponse.data.codigo === '000') {
        return await this.guardarCiudadano(dacResponse.data.ciudadano, dactilar);
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
