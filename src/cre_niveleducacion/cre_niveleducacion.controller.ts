import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreNiveleducacionService } from './cre_niveleducacion.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-niveleducacion')
export class CreNiveleducacionController {
  constructor(private readonly creNiveleducacionService: CreNiveleducacionService) {}

  @Get()
  @Auth()
  findAll() {
    return this.creNiveleducacionService.findAll();
  }

}
