import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CognosolicitudcreditoService } from './cognosolicitudcredito.service';
import { CreateCognosolicitudcreditoDto } from './dto/create-cognosolicitudcredito.dto';
import { UpdateCognosolicitudcreditoDto } from './dto/update-cognosolicitudcredito.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cognosolicitudcredito')
export class CognosolicitudcreditoController {
  constructor(private readonly cognosolicitudcreditoService: CognosolicitudcreditoService) {}

  @Post()
  @Auth()
  create(@Body() createCognosolicitudcreditoDto: CreateCognosolicitudcreditoDto) {
    return this.cognosolicitudcreditoService.create(createCognosolicitudcreditoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.cognosolicitudcreditoService.findAll();
  }
  
  @Post('auth')
  @Auth()
  auth(@Body() body: any) {
    return this.cognosolicitudcreditoService.auth(body);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.cognosolicitudcreditoService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateCognosolicitudcreditoDto: UpdateCognosolicitudcreditoDto) {
    return this.cognosolicitudcreditoService.update(+id, updateCognosolicitudcreditoDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.cognosolicitudcreditoService.remove(+id);
  }
}
