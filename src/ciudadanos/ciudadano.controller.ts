import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { RawHeaders, GetUser, Auth } from '../auth/decorators';
import { CiudadanoService } from './ciudadano.service';
import { ValidRoles } from '../auth/interfaces';

@Controller('dactilar')

export class CiudadanoController {
  constructor(private readonly ciudadanoService: CiudadanoService) {}

  
  @Auth() 
  @Post('consulta')
  async consultarDactilar(
    @Body() body: { cedula: string; dactilar: string; usuario: string },
  ): Promise<any> {
    const { cedula, dactilar, usuario } = body;

    try {
      // Iniciar la consulta dactilar
      const ciudadanoGuardado = await this.ciudadanoService.consultarDactilar(
        cedula,
        dactilar,
        usuario
      );

      if (!ciudadanoGuardado) {
        throw new HttpException(
          'No se pudo encontrar ni guardar los datos del ciudadano',
          HttpStatus.NOT_FOUND,
        );
      }

      // Respuesta exitosa
      return {
        statusCode: HttpStatus.OK,
        message: 'Consulta dactilar realizada con éxito',
        data: ciudadanoGuardado,
      };
    } catch (error) {
      // Capturar el error y devolver un mensaje apropiado
      console.error('Error en la consulta dactilar:', error.message);

      if (error instanceof HttpException) {
        throw error; // Lanzar la excepción HTTP si es un HttpException
      }

      throw new HttpException(
        'Error interno en la consulta dactilar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Auth() 
  @Get()
  async obtenerTodos(
    @Query('NOMBRE') NOMBRE?: string,
    @Query('NUI') NUI?: string,
    @Query('page') page: number = 1, // Paginación: página, por defecto es 1
    @Query('pageSize') pageSize: number = 10, // Paginación: tamaño de página, por defecto es 10
  ): Promise<any> {
    try {
      // Parámeteros de consulta
      const queryParams = { NOMBRE, NUI };

      // Obtener los ciudadanos con la paginación
      const ciudadanos = await this.ciudadanoService.obtenerTodos(
        queryParams,
        page,
        pageSize,
      );

      // Verificar si se encontraron ciudadanos
      if (!ciudadanos || ciudadanos.data.length === 0) {
        throw new HttpException(
          'No se encontraron ciudadanos',
          HttpStatus.NOT_FOUND,
        );
      }

      // Respuesta exitosa con paginación
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudadanos obtenidos exitosamente',
        data: ciudadanos.data,
        totalRecords: ciudadanos.totalRecords,  // Número total de registros
        currentPage: ciudadanos.currentPage,    // Página actual
        totalPages: ciudadanos.totalPages,      // Total de páginas
      };
    } catch (error) {
      console.error('Error al obtener todos los ciudadanos:', error.message);

      // Manejar errores internos
      throw new HttpException(
        'Error interno al obtener los ciudadanos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Auth() 
  @Get(':cedula')
  async findByNUI(@Param('cedula') cedula: string): Promise<any> {
    try {
      const ciudadano = await this.ciudadanoService.findByNUI(cedula);

      if (!ciudadano) {
        throw new HttpException(
          `No se encontró un ciudadano con la cédula ${cedula}`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Respuesta exitosa
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudadano encontrado',
        data: ciudadano,
      };
    } catch (error) {
      console.error(
        error.message,
      );

      throw new HttpException(
        'Error interno al buscar el ciudadano',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
