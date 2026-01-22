import { Controller, Post, Body, Logger, BadRequestException, Param, Get } from '@nestjs/common';
import { CorporacionDflService } from './corporacion-dfl.service';
import { DFLAnalisisBiometrico } from '../corporacion-dfl/interfaces/corporacion-dfl-response.interfaces';
import { Auth, GetUser } from '../auth/decorators';
@Controller('corporacion-dfl')
export class CorporacionDflController {

  private readonly logger = new Logger('CorporacionDflController');

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

  @Post('serviciosia365pro/biometrico/crear-firma-digital')
  @Auth()
  async crearFirmaDigital(
    @Body() formData: {
      identificacion: string;
      cre_solicitud: string;
      Estado?: number;
    },
    @GetUser() usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean }
  ) {
    console.log('formData recibido:', formData);
    const { identificacion, cre_solicitud, Estado } = formData;
    const sSolicitud = cre_solicitud;
    const identidad = identificacion;

    if (!identidad || !sSolicitud) {
      this.logger.error('❌ Faltan campos obligatorios para crear la firma digital');
      throw new BadRequestException('Faltan campos obligatorios para crear la firma digital');
    }
    this.logger.log(`Iniciando creación de firma digital para solicitud: ${sSolicitud} y identidad: ${identidad}`);
    return this.corporacionDflService.crearFirmaDigital(sSolicitud, identidad, Estado, usuario);
  }

  @Post('serviciosia365pro/biometrico/callback-firma-digital')
  async callbackFirmaDigital(@Body() callbackData: any) {
    return this.corporacionDflService.guardarOperacionFirma(callbackData);
  }
  /*
  @Get('serviciosia365pro/biometrico/callback-firma-digital/:idOperacionFirma')
  @Auth()
  async obtenerEstadoFirmaDigital(@Param('idOperacionFirma') idOperacionFirma: string) {
    return this.corporacionDflService.obtenerEstadoFirmaDigital(idOperacionFirma);
  }*/

}
