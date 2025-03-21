import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreSituacionlaboralService } from './cre-situacionlaboral.service';
import { CreateCreSituacionlaboralDto } from './dto/create-cre-situacionlaboral.dto';
import { UpdateCreSituacionlaboralDto } from './dto/update-cre-situacionlaboral.dto';

@Controller('cre-situacionlaboral')
export class CreSituacionlaboralController {
  constructor(private readonly creSituacionlaboralService: CreSituacionlaboralService) {}

 
  @Get()
  findAll() {
    return this.creSituacionlaboralService.findAll();
  }

 
}
