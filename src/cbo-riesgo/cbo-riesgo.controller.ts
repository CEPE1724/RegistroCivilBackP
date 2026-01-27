import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CboRiesgoService } from './cbo-riesgo.service';
import { CreateCboRiesgoDto } from './dto/create-cbo-riesgo.dto';
import { UpdateCboRiesgoDto } from './dto/update-cbo-riesgo.dto';

@Controller('cbo-riesgo')
export class CboRiesgoController {
  constructor(private readonly cboRiesgoService: CboRiesgoService) {}



  @Get()
  findAll() {
    return this.cboRiesgoService.findAll();
  }

  
}
