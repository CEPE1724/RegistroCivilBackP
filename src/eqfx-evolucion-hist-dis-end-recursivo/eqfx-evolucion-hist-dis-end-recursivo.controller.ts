import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxEvolucionHistDisEndRecursivoService } from './eqfx-evolucion-hist-dis-end-recursivo.service';
import { CreateEqfxEvolucionHistDisEndRecursivoDto } from './dto/create-eqfx-evolucion-hist-dis-end-recursivo.dto';
import { UpdateEqfxEvolucionHistDisEndRecursivoDto } from './dto/update-eqfx-evolucion-hist-dis-end-recursivo.dto';
import { Auth } from 'src/auth/decorators';
@Controller('eqfxEvolucionHistDisEndRecursivo')
export class EqfxEvolucionHistDisEndRecursivoController {
  constructor(private readonly eqfxEvolucionHistDisEndRecursivoService: EqfxEvolucionHistDisEndRecursivoService) {}

  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxEvolucionHistDisEndRecursivoService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxEvolucionHistDisEndRecursivoService.findOne(+id);
  }

}
