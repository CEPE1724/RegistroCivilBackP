import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CboScoresCobranzaService } from './cbo-scores-cobranza.service';
import { CreateCboScoresCobranzaDto } from './dto/create-cbo-scores-cobranza.dto';
import { UpdateCboScoresCobranzaDto } from './dto/update-cbo-scores-cobranza.dto';

@Controller('cbo-scores-cobranza')
export class CboScoresCobranzaController {
  constructor(private readonly cboScoresCobranzaService: CboScoresCobranzaService) {}


  @Get()
  findAll() {
    return this.cboScoresCobranzaService.findAll();
  }

}
