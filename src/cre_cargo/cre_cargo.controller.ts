import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreCargoService } from './cre_cargo.service';

@Controller('cre-cargo')
export class CreCargoController {
  constructor(private readonly creCargoService: CreCargoService) {}

  @Get()
  findAll() {
    return this.creCargoService.findAll();
  }
  
}
