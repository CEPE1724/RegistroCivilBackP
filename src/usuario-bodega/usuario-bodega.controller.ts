import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario-bodega.service';
import { Auth } from 'src/auth/decorators';

@Controller('usuario-bodega')
export class UsuarioBodegaController {
  constructor(
    private readonly usuarioBodegaService: UsuarioBodegaService,
  ) {}

  // Endpoint para obtener bodegas asociadas a un usuario específico
  @Post('usuario/bodegas')
  @Auth()
  async findBodegasByUser(
    @Body('userId') userId: number, // ID del usuario (en el body)
    @Body('idTipoFactura') idTipoFactura: number, // idTipoFactura (en el body)
    @Body('fecha') fecha: string = new Date().toISOString(), // fecha (en el body), valor por defecto es la fecha actual
    @Body('recibeConsignacion') recibeConsignacion: boolean = false, // recibeConsignacion (en el body), valor por defecto es false
  ) {
    // Convertir fecha de string a Date
    const parsedFecha = new Date(fecha);
    console.log('Parsed Fecha:', parsedFecha);
    // Llamamos al servicio pasando los parámetros obtenidos del request
    return this.usuarioBodegaService.getBodegasByUser(
      +userId, // Convertir el userId a número
      +idTipoFactura,
      parsedFecha,
      recibeConsignacion,
    );
  }
}
