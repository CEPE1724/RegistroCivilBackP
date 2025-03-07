import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario-bodega.service';

@Controller('usuario-bodega')
export class UsuarioBodegaController {
  constructor(
    private readonly usuarioBodegaService: UsuarioBodegaService,
  ) {}

  // Endpoint para obtener bodegas asociadas a un usuario específico
  @Get('usuario/:userId/bodegas')
  async findBodegasByUser(
    @Param('userId') userId: string, // ID del usuario (vía URL)
    @Query('idTipoFactura') idTipoFactura: number, // idTipoFactura (vía query)
    @Query('fecha') fecha: string = new Date().toISOString(), // fecha (vía query), valor por defecto es la fecha actual
    @Query('recibeConsignacion') recibeConsignacion: boolean = false, // recibeConsignacion (vía query), valor por defecto es false
  ) {
    // Convertir fecha de string a Date
    const parsedFecha = new Date(fecha);
    console.log(parsedFecha);
    console.log(recibeConsignacion);
    console.log(idTipoFactura);
    console.log(userId);
    // Llamamos al servicio pasando los parámetros obtenidos del request
    return this.usuarioBodegaService.getBodegasByUser(
      +userId, // Convertir el userId a número
      idTipoFactura,
      parsedFecha,
      recibeConsignacion,
    );
  }
}
