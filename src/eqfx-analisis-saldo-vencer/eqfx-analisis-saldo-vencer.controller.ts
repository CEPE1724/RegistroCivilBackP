import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxAnalisisSaldoVencerService } from './eqfx-analisis-saldo-vencer.service';
import { CreateEqfxAnalisisSaldoVencerDto } from './dto/create-eqfx-analisis-saldo-vencer.dto';
import { UpdateEqfxAnalisisSaldoVencerDto } from './dto/update-eqfx-analisis-saldo-vencer.dto';

@Controller('eqfxAnalisisSaldoVencer')
export class EqfxAnalisisSaldoVencerController {
  constructor(private readonly eqfxAnalisisSaldoVencerService: EqfxAnalisisSaldoVencerService) {}

  @Get(':idEqfx')
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxAnalisisSaldoVencerService.findAll(+idEqfx);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eqfxAnalisisSaldoVencerService.findOne(+id);
  }

}
