import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSituacionlaboralService } from './cre-situacionlaboral.service';
import { CreateCreSituacionlaboralDto } from './dto/create-cre-situacionlaboral.dto';
import { UpdateCreSituacionlaboralDto } from './dto/update-cre-situacionlaboral.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-situacionlaboral')
export class CreSituacionlaboralController {
  constructor(private readonly creSituacionlaboralService: CreSituacionlaboralService) {}

 
  @Get()
  @Auth()
  findAll() {
    return this.creSituacionlaboralService.findAll();
  }

 
}
