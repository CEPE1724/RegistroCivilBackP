import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreProfesionService } from './cre_profesion.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-profesion')
export class CreProfesionController {

  constructor(private readonly creProfesionService: CreProfesionService) {}
  @Get()
  @Auth()
  findAll() {
    return this.creProfesionService.findAll();
  }
}
