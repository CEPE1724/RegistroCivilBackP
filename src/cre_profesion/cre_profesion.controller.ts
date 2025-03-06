import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreProfesionService } from './cre_profesion.service';

@Controller('cre-profesion')
export class CreProfesionController {
  constructor(private readonly creProfesionService: CreProfesionService) { }

  @Get()
  findAll() {
    return this.creProfesionService.findAll();
  }
}
