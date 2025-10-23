import { Controller, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}


  @Get('cedula/:id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

}
