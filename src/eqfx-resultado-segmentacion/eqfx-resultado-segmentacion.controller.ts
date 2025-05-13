import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxResultadoSegmentacionService } from './eqfx-resultado-segmentacion.service';
import { CreateEqfxResultadoSegmentacionDto } from './dto/create-eqfx-resultado-segmentacion.dto';
import { UpdateEqfxResultadoSegmentacionDto } from './dto/update-eqfx-resultado-segmentacion.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxResultadoSegmentacion')
export class EqfxResultadoSegmentacionController {
  constructor(private readonly eqfxResultadoSegmentacionService: EqfxResultadoSegmentacionService) {}

  @Get(':idEqfx')
  @Auth() 
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.eqfxResultadoSegmentacionService.findOne(+idEqfx);
  }

}
