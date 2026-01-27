import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CboTipoClienteService } from './cbo-tipo-cliente.service';
import { CreateCboTipoClienteDto } from './dto/create-cbo-tipo-cliente.dto';
import { UpdateCboTipoClienteDto } from './dto/update-cbo-tipo-cliente.dto';
import { Auth } from 'src/auth/decorators';
@Controller('cbo-tipo-cliente')
export class CboTipoClienteController {
  constructor(private readonly cboTipoClienteService: CboTipoClienteService) {}





   @Get()
      @Auth()
      findAll(@Query('sCbo_Scores_Cobranzas') sCbo_Scores_Cobranzas: string) {
        return this.cboTipoClienteService.findAll(sCbo_Scores_Cobranzas);
      }
 
}
