import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreEstadocivilService } from './cre_estadocivil.service';

@Controller('cre-estadocivil')
export class CreEstadocivilController {
  constructor(private readonly creEstadocivilService: CreEstadocivilService) {}

  

  @Get()
  findAll() {
    return this.creEstadocivilService.findAll();
  }

}
