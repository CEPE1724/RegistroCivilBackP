import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreParentescoService } from './cre_parentesco.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-parentesco')
export class CreParentescoController {
  constructor(private readonly creParentescoService: CreParentescoService) { }

  @Get()
  @Auth()
  findAll() {
    return this.creParentescoService.findAll();
  }
}
