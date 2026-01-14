import { Controller, Post, Body, Logger, BadRequestException, Param } from '@nestjs/common';
import { CorporacionDflService } from './corporacion-dfl.service';
import { DFLAnalisisBiometrico } from '../corporacion-dfl/interfaces/corporacion-dfl-response.interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser } from '../auth/decorators';
@Controller('corporacion-dfl')
export class CorporacionDflController {
  private readonly logger = new Logger(CorporacionDflController.name);

  constructor(private readonly corporacionDflService: CorporacionDflService) { }

  @Post('serviciosia365pro/biometrico')
  async create(
    @Body() formData: {
      identificacion: string;
      callback: string;
      motivo: string;
      cre_solicitud: string;
      usuario: string;
    },
  ) {

    const { identificacion, callback, motivo, cre_solicitud, usuario } = formData;

    if (!identificacion || !callback || !motivo || cre_solicitud === undefined || !usuario) {
      this.logger.error('❌ Faltan campos obligatorios en el formulario');
      throw new BadRequestException('Faltan campos obligatorios en el formulario');
    }


    return this.corporacionDflService.create({
      ...formData,
      cre_solicitud: cre_solicitud,
    });
  }

  @Post('serviciosia365pro/biometrico/callback')
  async callback(@Body() callbackData: DFLAnalisisBiometrico) {
    return this.corporacionDflService.handleCallback(callbackData);
  }

  @Post('serviciosia365pro/biometrico/crear-firma-digital/:sSolicitud/:Identidad')
  async crearFirmaDigital(@Param('sSolicitud') sSolicitud: string, @Param('Identidad') identidad: string) {
    return this.corporacionDflService.crearFirmaDigital(sSolicitud, identidad);
  }

  @Post('serviciosia365pro/biometrico/callback-firma-digital')
  async callbackFirmaDigital(@Body() callbackData: any) {
    return this.corporacionDflService.guardarOperacionFirma(callbackData);
  }

}
