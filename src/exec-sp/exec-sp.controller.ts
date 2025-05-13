import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExecSpService } from './exec-sp.service';
import { CreateExecSpDto } from './dto/create-exec-sp.dto';
import { UpdateExecSpDto } from './dto/update-exec-sp.dto';
import { Auth } from 'src/auth/decorators';

@Controller('exec-sp')
export class ExecSpController {
  constructor(private readonly execSpService: ExecSpService) {}

 
  @Get('FacturacionListaVendedoresWeb/:Fecha/:Bodega/:Nivel')
  @Auth() 
  findOne(@Param('Fecha') Fecha: string, @Param('Bodega') Bodega: number, @Param('Nivel') Nivel: number) {
    return this.execSpService.findOne(Fecha, Bodega, Nivel);
  }

}
