import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxCreditosOtorg12UltMesEdService } from './eqfx-creditos-otorg12-ult-mes-ed.service';
import { CreateEqfxCreditosOtorg12UltMesEdDto } from './dto/create-eqfx-creditos-otorg12-ult-mes-ed.dto';
import { UpdateEqfxCreditosOtorg12UltMesEdDto } from './dto/update-eqfx-creditos-otorg12-ult-mes-ed.dto';
import { Auth } from 'src/auth/decorators';
@Controller('eqfxCreditosOtorg12UltMesEd')
export class EqfxCreditosOtorg12UltMesEdController {
  constructor(private readonly eqfxCreditosOtorg12UltMesEdService: EqfxCreditosOtorg12UltMesEdService) {}

  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxCreditosOtorg12UltMesEdService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxCreditosOtorg12UltMesEdService.findOne(+id);
  }
}
