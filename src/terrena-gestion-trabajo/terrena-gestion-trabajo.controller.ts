import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerrenaGestionTrabajoService } from './terrena-gestion-trabajo.service';
import { CreateTerrenaGestionTrabajoDto } from './dto/create-terrena-gestion-trabajo.dto';
import { UpdateTerrenaGestionTrabajoDto } from './dto/update-terrena-gestion-trabajo.dto';

@Controller('terrena-gestion-trabajo')
export class TerrenaGestionTrabajoController {
  constructor(private readonly terrenaGestionTrabajoService: TerrenaGestionTrabajoService) {}


  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.terrenaGestionTrabajoService.findOne(+id);
  }





}
