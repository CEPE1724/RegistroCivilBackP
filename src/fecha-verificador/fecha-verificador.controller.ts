import { Controller, Get, Param } from '@nestjs/common';
import { FechaVerificadorService } from './fecha-verificador.service';

@Controller('fecha-verificador')
export class FechaVerificadorController {
  constructor(private readonly fechaVerificadorService: FechaVerificadorService) {}

  @Get()
  findAll() {
    return this.fechaVerificadorService.getFechaVerificadorWithNextWeek();
  }
}
