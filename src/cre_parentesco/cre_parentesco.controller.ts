import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreParentescoService } from './cre_parentesco.service';

@Controller('cre-parentesco')
export class CreParentescoController {
  constructor(private readonly creParentescoService: CreParentescoService) { }

  @Get()
  findAll() {
    return this.creParentescoService.findAll();
  }
}
