import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreVerificacionTelefonicaService } from './cre_verificacion-telefonica.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-verificacion-telefonica')
export class CreVerificacionTelefonicaController {
  constructor(private readonly creVerificacionTelefonicaService: CreVerificacionTelefonicaService) {}

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {

    return this.creVerificacionTelefonicaService.findAll(paginationDto);
  }
}
