import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrectaedogestionService } from './crectaedogestion.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';


@Controller('crectaedogestion')
export class CrectaedogestionController {
  constructor(private readonly crectaedogestionService: CrectaedogestionService) {}


  @Get()
  @Auth()
  findAll() {
    return this.crectaedogestionService.findAll();
  }

}
