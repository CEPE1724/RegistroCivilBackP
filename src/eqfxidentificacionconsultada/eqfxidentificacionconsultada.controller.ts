import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxidentificacionconsultadaService } from './eqfxidentificacionconsultada.service';
import { CreateEqfxidentificacionconsultadaDto } from './dto/create-eqfxidentificacionconsultada.dto';
import { UpdateEqfxidentificacionconsultadaDto } from './dto/update-eqfxidentificacionconsultada.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxidentificacionconsultada')
export class EqfxidentificacionconsultadaController {
  constructor(private readonly eqfxidentificacionconsultadaService: EqfxidentificacionconsultadaService) {}

  @Get(':NumeroDocumento')
  @Auth() 
  findOneByNumeroDocumento(@Param('NumeroDocumento') NumeroDocumento: string) {
    return this.eqfxidentificacionconsultadaService.findOne(NumeroDocumento);
  }

}
