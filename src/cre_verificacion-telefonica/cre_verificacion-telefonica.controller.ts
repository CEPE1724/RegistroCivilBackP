import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreVerificacionTelefonicaService } from './cre_verificacion-telefonica.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
@Controller('cre-verificacion-telefonica')
export class CreVerificacionTelefonicaController {
  constructor(private readonly creVerificacionTelefonicaService: CreVerificacionTelefonicaService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.creVerificacionTelefonicaService.findAll(paginationDto);
  }
}
