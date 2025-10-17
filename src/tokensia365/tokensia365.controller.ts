import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Tokensia365Service } from './tokensia365.service';
import { CreateTokensia365Dto } from './dto/create-tokensia365.dto';
import { UpdateTokensia365Dto } from './dto/update-tokensia365.dto';

@Controller('tokensia365')
export class Tokensia365Controller {
  constructor(private readonly tokensia365Service: Tokensia365Service) {}

  @Post()
  create(@Body() createTokensia365Dto: CreateTokensia365Dto) {
    return this.tokensia365Service.create(createTokensia365Dto);
  }
  
}
