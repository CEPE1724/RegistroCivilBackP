import { Controller, Post, Body, Logger, BadRequestException } from '@nestjs/common';
import { CorporacionDflService } from './corporacion-dfl.service';
import {DFLAnalisisBiometrico } from '../corporacion-dfl/interfaces/corporacion-dfl-response.interfaces';
@Controller('corporacion-dfl')
export class CorporacionDflController {
  private readonly logger = new Logger(CorporacionDflController.name);

  constructor(private readonly corporacionDflService: CorporacionDflService) { }

  @Post('serviciosia365pro/biometrico')
  async create(
    @Body() formData: {
      identificacion: string;
      callback: string;
      codigo_interno: string;
      motivo: string;
      cre_solicitud: number | string;
      usuario: string;
    },
  ) {

    const { identificacion, callback, codigo_interno, motivo, cre_solicitud, usuario } = formData;

    if (!identificacion || !callback || !codigo_interno || !motivo || cre_solicitud === undefined || !usuario) {
      this.logger.error('❌ Faltan campos obligatorios en el formulario');
      throw new BadRequestException('Faltan campos obligatorios en el formulario');
    }

    const solicitudNumber = Number(cre_solicitud);
    if (isNaN(solicitudNumber) || solicitudNumber <= 0) {
      this.logger.error(`❌ El campo "cre_solicitud" debe ser un número válido. Valor recibido: ${cre_solicitud}`);
      throw new BadRequestException('El campo "cre_solicitud" debe ser un número válido y mayor que cero');
    }

    return this.corporacionDflService.create({
      ...formData,
      cre_solicitud: solicitudNumber,
    });
  }

  @Post('serviciosia365pro/biometrico/callback')
 async callback(@Body() callbackData: DFLAnalisisBiometrico) {
    return this.corporacionDflService.handleCallback(callbackData);
  }
}
