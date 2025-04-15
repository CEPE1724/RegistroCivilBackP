import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerrenaGestionDomicilioService } from './terrena-gestion-domicilio.service';
import { CreateTerrenaGestionDomicilioDto } from './dto/create-terrena-gestion-domicilio.dto';
import { UpdateTerrenaGestionDomicilioDto } from './dto/update-terrena-gestion-domicilio.dto';

@Controller('terrena-gestion-domicilio')
export class TerrenaGestionDomicilioController {
  constructor(private readonly terrenaGestionDomicilioService: TerrenaGestionDomicilioService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.terrenaGestionDomicilioService.findOne(+id);
  }


}
