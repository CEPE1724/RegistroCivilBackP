import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { Auth } from 'src/auth/decorators';

@Controller('usuario-bodega')
export class UsuarioBodegaController {
  constructor(
    private readonly usuarioBodegaService: UsuarioBodegaService,
  ) {}

  // Endpoint para obtener bodegas asociadas a un usuario específico
  @Get('usuario/bodegas')
  @Auth()
  async findBodegasByUser(
    @Query('userId') userId: number, // ID del usuario (vía URL)
    @Query('idTipoFactura') idTipoFactura: number, // idTipoFactura (vía query)
    @Query('fecha') fecha: string = new Date().toISOString(), // fecha (vía query), valor por defecto es la fecha actual
    @Query('recibeConsignacion') recibeConsignacion: boolean = false, // recibeConsignacion (vía query), valor por defecto es false
  ) {
    // Convertir fecha de string a Date
    const parsedFecha = new Date(fecha);

    // Llamamos al servicio pasando los parámetros obtenidos del request
    return this.usuarioBodegaService.getBodegasByUser(
      +userId, // Convertir el userId a número
      +idTipoFactura,
      parsedFecha,
      recibeConsignacion,
    );
  }
}
