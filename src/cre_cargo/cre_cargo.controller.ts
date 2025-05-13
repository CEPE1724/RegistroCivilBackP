import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreCargoService } from './cre_cargo.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-cargo')
export class CreCargoController {
  constructor(private readonly creCargoService: CreCargoService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creCargoService.findAll();
  }
  
}
