import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeguridadmenuService } from './seguridadmenu.service';
import { Auth } from 'src/auth/decorators';


@Controller('seguridadmenu')
export class SeguridadmenuController {
  constructor(private readonly seguridadmenuService: SeguridadmenuService) {}

 

  @Get()
  @Auth()
  findAll() {
    return this.seguridadmenuService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.seguridadmenuService.findOne(+id);
  }



  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.seguridadmenuService.remove(+id);
  }
}
