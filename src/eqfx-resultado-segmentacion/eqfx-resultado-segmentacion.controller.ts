import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxResultadoSegmentacionService } from './eqfx-resultado-segmentacion.service';
import { CreateEqfxResultadoSegmentacionDto } from './dto/create-eqfx-resultado-segmentacion.dto';
import { UpdateEqfxResultadoSegmentacionDto } from './dto/update-eqfx-resultado-segmentacion.dto';

@Controller('eqfxResultadoSegmentacion')
export class EqfxResultadoSegmentacionController {
  constructor(private readonly eqfxResultadoSegmentacionService: EqfxResultadoSegmentacionService) {}

  @Get(':idEqfx')
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.eqfxResultadoSegmentacionService.findOne(+idEqfx);
  }

}
