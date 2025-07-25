import { Controller, Get } from '@nestjs/common';
import { CreProductoSolicitudService } from './cre-producto-solicitud.service';

@Controller('cre-producto-solicitud')
export class CreProductoSolicitudController {
  constructor(private readonly creProductoSolicitudService: CreProductoSolicitudService) {}

  @Get()
  findAll() {
    return this.creProductoSolicitudService.findAll();
  }
}
