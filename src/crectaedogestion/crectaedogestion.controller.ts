import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrectaedogestionService } from './crectaedogestion.service';


@Controller('crectaedogestion')
export class CrectaedogestionController {
  constructor(private readonly crectaedogestionService: CrectaedogestionService) {}


  @Get()
  findAll() {
    return this.crectaedogestionService.findAll();
  }

}
