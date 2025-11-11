import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxResultadoService } from './uat_eqfx_resultado.service';
import { CreateUatEqfxResultadoDto } from './dto/create-uat_eqfx_resultado.dto';
import { UpdateUatEqfxResultadoDto } from './dto/update-uat_eqfx_resultado.dto';

@Controller('uat-eqfx-resultado')
export class UatEqfxResultadoController {
  constructor(private readonly uatEqfxResultadoService: UatEqfxResultadoService) {}

//   @Get()
//   findAll() {
//     return this.uatEqfxResultadoService.findAll();
//   }

  @Get(':idEqfx')
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxResultadoService.findOne(+idEqfx);
  }

}
