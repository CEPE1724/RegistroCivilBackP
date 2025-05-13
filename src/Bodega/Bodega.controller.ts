import { Controller, Get } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { ResponseDto } from './bodega.dto';  // Importar el DTO de respuesta
import { Bodega } from './bodega.entity';  // Asegúrate de importar el tipo adecuado de Bodega
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('bodega')
export class BodegaController {
  constructor(private readonly bodegaService: BodegaService) {}

  // Obtener todos los registros de Bodega con filtros y paginación
  @Get()
  @Auth()
  async findAll(): Promise<ResponseDto<Bodega[]>> {  // Cambiar BodegaService[] a Bodega[]
    const data = await this.bodegaService.findAll();
    return { statusCode: 200, message: 'Bodegas obtenidas correctamente', data };  // Devolver los datos correctamente
  }
}
