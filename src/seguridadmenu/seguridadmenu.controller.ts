import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeguridadmenuService } from './seguridadmenu.service';


@Controller('seguridadmenu')
export class SeguridadmenuController {
  constructor(private readonly seguridadmenuService: SeguridadmenuService) {}

 

  @Get()
  findAll() {
    return this.seguridadmenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguridadmenuService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguridadmenuService.remove(+id);
  }
}
