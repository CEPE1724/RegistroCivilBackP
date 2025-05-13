import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreEstadocivilService } from './cre_estadocivil.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-estadocivil')
export class CreEstadocivilController {
  constructor(private readonly creEstadocivilService: CreEstadocivilService) {}

  

  @Get()
  @Auth()
  findAll() {
    return this.creEstadocivilService.findAll();
  }

}
