import { Controller, Get, Query } from '@nestjs/common';  // Agregar @Query() desde @nestjs/common
import { CboGestorCobranzasService } from './cbo-gestor-cobranzas.service';
import { FindAllFiltersDto, ResponseDto } from './cbo-gestor-cobranzas.dto';

@Controller('cbo-gestor-cobranzas')
export class CboGestorCobranzasController {
  constructor(private readonly cboGestorCobranzasService: CboGestorCobranzasService) {}

  // Obtener todos los registros de CboGestorCobranzas con filtros y paginación
  @Get()
   findAll(@Query() filters: FindAllFiltersDto): Promise<ResponseDto<any>> {
    return this.cboGestorCobranzasService.findAll(filters);
  }
}
