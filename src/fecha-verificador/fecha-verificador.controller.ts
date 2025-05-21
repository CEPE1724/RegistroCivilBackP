import { Controller, Get, Param } from '@nestjs/common';
import { FechaVerificadorService } from './fecha-verificador.service';
import { Auth } from 'src/auth/decorators';

@Controller('fecha-verificador')
export class FechaVerificadorController {
  constructor(private readonly fechaVerificadorService: FechaVerificadorService) {}

  @Get()
  @Auth() 
  findAll() {
    return this.fechaVerificadorService.getFechaVerificadorWithNextWeek();
  }
}
