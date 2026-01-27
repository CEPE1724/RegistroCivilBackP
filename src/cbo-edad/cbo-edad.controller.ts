import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboEdadService } from './cbo-edad.service';
import { CreateCboEdadDto } from './dto/create-cbo-edad.dto';
import { UpdateCboEdadDto } from './dto/update-cbo-edad.dto';
import { Auth } from 'src/auth/decorators';
@Controller('cbo-edad')
export class CboEdadController {
  constructor(private readonly cboEdadService: CboEdadService) {}


  @Get()
  @Auth()
  findAll(@Query('sCbo_Scores_Cobranzas') sCbo_Scores_Cobranzas: string) {
    return this.cboEdadService.findAll(sCbo_Scores_Cobranzas);
  }

  
}
