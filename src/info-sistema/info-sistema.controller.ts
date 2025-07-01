import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InfoSistemaService } from './info-sistema.service';
import { InfoSistema } from './entities/info-sistema.entity';
import { Auth } from 'src/auth/decorators';

@Controller('info-sistema')
export class InfoSistemaController {
  constructor(private readonly infoSistemaService: InfoSistemaService) {}

  /** Verifica si el usuario ya ha registrado ingreso en el sistema */
  @Get('existe/:usuario')
   @Auth()
  async existe(@Param('usuario') usuario: string) {
    const existe = await this.infoSistemaService.existeIngreso(usuario);
    return { existe };
  }

  /** Registra el ingreso del usuario tras cambiar su contraseña */
  @Post('registrar')
   @Auth()
  async registrar(@Body() body: Partial<InfoSistema>) {
    const ingreso = await this.infoSistemaService.registrarIngreso(body);
    return { message: 'Ingreso registrado', ingreso };
  }
}
