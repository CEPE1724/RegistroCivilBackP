import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreEntidadFinancieraService } from './cre-entidad-financiera.service';
import { CreateCreEntidadFinancieraDto } from './dto/create-cre-entidad-financiera.dto';
import { UpdateCreEntidadFinancieraDto } from './dto/update-cre-entidad-financiera.dto';
import { Auth } from 'src/auth/decorators';
@Controller('cre-entidad-financiera')
export class CreEntidadFinancieraController {
  constructor(private readonly creEntidadFinancieraService: CreEntidadFinancieraService) {}



  @Get('findAllCobranza/:activo')
  @Auth()
  findAll(@Param('activo') activo: boolean) {
    return this.creEntidadFinancieraService.findAll(activo);
  }

 
}
