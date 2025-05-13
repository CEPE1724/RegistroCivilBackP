import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EqfxDeudaReportadaInfoService } from './eqfx-deuda-reportada-info.service';
import { CreateEqfxDeudaReportadaInfoDto } from './dto/create-eqfx-deuda-reportada-info.dto';
import { UpdateEqfxDeudaReportadaInfoDto } from './dto/update-eqfx-deuda-reportada-info.dto';
import { Auth } from 'src/auth/decorators';

@Controller('eqfxDeudaReportadaInfo')
export class EqfxDeudaReportadaInfoController {
  constructor(private readonly eqfxDeudaReportadaInfoService: EqfxDeudaReportadaInfoService) {}


  @Get(':idEqfx')
  @Auth() 
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.eqfxDeudaReportadaInfoService.findAll(+idEqfx);
  }

  @Get(':id')
  @Auth() 
  findOne(@Param('id') id: string) {
    return this.eqfxDeudaReportadaInfoService.findOne(+id);
  }
}
