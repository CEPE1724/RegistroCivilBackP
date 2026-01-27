import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboScoreResultadoService } from './cbo-score-resultado.service';
import { CreateCboScoreResultadoDto } from './dto/create-cbo-score-resultado.dto';
import { UpdateCboScoreResultadoDto } from './dto/update-cbo-score-resultado.dto';
import { Auth } from 'src/auth/decorators';
@Controller('cbo-score-resultado')
export class CboScoreResultadoController {
  constructor(private readonly cboScoreResultadoService: CboScoreResultadoService) {}


  @Get()
  @Auth()
  findAll(@Query('sCbo_Scores_Cobranzas') sCbo_Scores_Cobranzas: string) {
    return this.cboScoreResultadoService.findAll(sCbo_Scores_Cobranzas);
  }
}