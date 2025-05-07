import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxEvolucionHistDisEndeudamientoService } from './eqfx-evolucion-hist-dis-endeudamiento.service';
import { CreateEqfxEvolucionHistDisEndeudamientoDto } from './dto/create-eqfx-evolucion-hist-dis-endeudamiento.dto';
import { UpdateEqfxEvolucionHistDisEndeudamientoDto } from './dto/update-eqfx-evolucion-hist-dis-endeudamiento.dto';

@Controller('eqfxEvolucionHistDisEndeudamiento')
export class EqfxEvolucionHistDisEndeudamientoController {
  constructor(private readonly eqfxEvolucionHistDisEndeudamientoService: EqfxEvolucionHistDisEndeudamientoService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxEvolucionHistDisEndeudamientoService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxEvolucionHistDisEndeudamientoService.findOne(+id);
  }
}
