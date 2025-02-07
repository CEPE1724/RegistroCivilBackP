import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { UseGuards } from '@nestjs/common';

@Controller('api/v1/historico')
export class HistoricoController {
  constructor(
    private readonly historicoService: HistoricoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async obtenerHistorial() {
    return this.historicoService.obtenerHistorial();
  }

  @UseGuards(JwtAuthGuard)
  @Post('registrar')
  async registrarConsulta(@Req() request: Request, @Body('cedula') cedula: string, @Body('apiRC') apiRC: boolean) {
    const usuario = request.user.Nombre; // JWT contiene la información del usuario
    const ip = request.ip;
    const idUsuario = request.user.idUsuario;
    // Aquí envías la cédula, el usuario y la IP al servicio para registrar la consulta
    return this.historicoService.registrarConsulta(usuario, ip, cedula, idUsuario, apiRC);
  }
}
