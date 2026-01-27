import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboSaldosService } from './cbo-saldos.service';
import { CreateCboSaldoDto } from './dto/create-cbo-saldo.dto';
import { UpdateCboSaldoDto } from './dto/update-cbo-saldo.dto';
import { Auth } from 'src/auth/decorators';

@Controller('cbo-saldos')
export class CboSaldosController {
  constructor(private readonly cboSaldosService: CboSaldosService) {}

 
 @Get()
  @Auth()
  findAll(@Query('sCbo_Scores_Cobranzas') sCbo_Scores_Cobranzas: string) {
    return this.cboSaldosService.findAll(sCbo_Scores_Cobranzas);
  }

  
}
