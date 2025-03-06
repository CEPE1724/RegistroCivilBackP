import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreNiveleducacionService } from './cre_niveleducacion.service';

@Controller('cre-niveleducacion')
export class CreNiveleducacionController {
  constructor(private readonly creNiveleducacionService: CreNiveleducacionService) {}

  @Get()
  findAll() {
    return this.creNiveleducacionService.findAll();
  }

}
