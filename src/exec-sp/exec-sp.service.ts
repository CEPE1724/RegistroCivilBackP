import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Solo necesitamos esto para el acceso a la base de datos, no para una entidad específica
import { ConfigService } from '@nestjs/config'; // Importa ConfigService si lo necesitas para la configuración
import { ExecSp } from './entities/exec-sp.entity'; // Asegúrate de que la ruta sea correcta
@Injectable()
export class ExecSpService {
  private readonly logger = new Logger(ExecSpService.name);  // Logger para registrar mensajes

  constructor(
    @InjectRepository(ExecSp) // Inyecta el repositorio de ExecSp
    private readonly queryRepository: Repository<ExecSp>, // Cambia a Repository<ExecSp> si necesitas una entidad específica
    private readonly configService: ConfigService, // Inyecta ConfigService si lo necesitas para la configuración
  ) {}

  // Método async para ejecutar el procedimiento almacenado
  async findOne(Fecha: string, Bodega: number, Nivel: number) {
    try {
      // Log para ver los parámetros antes de ejecutar la consulta
      const fechaFormateada = new Date(Fecha);
      
      // Verificamos si la conversión de fecha fue exitosa
      if (isNaN(fechaFormateada.getTime())) {
        throw new Error('La fecha proporcionada no es válida.');
      }
      // Ejecutar el procedimiento almacenado con parámetros
      const result = await this.queryRepository.query(
        `EXEC FacturacionListaVendedoresWeb @Fecha = @0, @Bodega = @1, @Nivel = @2`, // Usamos parámetros con índices
        [fechaFormateada, Bodega, Nivel] // Pasamos los valores de los parámetros aquí
      );

      // Si el procedimiento devuelve algo, procesamos el resultado
      return result;
    } catch (error) {
      // En caso de error, logueamos el error y lanzamos una excepción
      this.logger.error('Error al llamar al procedimiento FacturacionListaVendedoresWeb', error.stack);
      throw new Error('Error al llamar al procedimiento FacturacionListaVendedoresWeb');
    }
  }
}
