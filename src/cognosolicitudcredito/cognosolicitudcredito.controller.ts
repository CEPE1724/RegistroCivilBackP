import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CognosolicitudcreditoService } from './cognosolicitudcredito.service';
import { CreateCognosolicitudcreditoDto } from './dto/create-cognosolicitudcredito.dto';
import { UpdateCognosolicitudcreditoDto } from './dto/update-cognosolicitudcredito.dto';

@Controller('cognosolicitudcredito')
export class CognosolicitudcreditoController {
  constructor(private readonly cognosolicitudcreditoService: CognosolicitudcreditoService) {}

  @Post()
  create(@Body() createCognosolicitudcreditoDto: CreateCognosolicitudcreditoDto) {
    return this.cognosolicitudcreditoService.create(createCognosolicitudcreditoDto);
  }

  @Get()
  findAll() {
    return this.cognosolicitudcreditoService.findAll();
  }
  
  @Post('auth')
  auth(@Body() body: any) {
    return this.cognosolicitudcreditoService.auth(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cognosolicitudcreditoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCognosolicitudcreditoDto: UpdateCognosolicitudcreditoDto) {
    return this.cognosolicitudcreditoService.update(+id, updateCognosolicitudcreditoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cognosolicitudcreditoService.remove(+id);
  }
}
