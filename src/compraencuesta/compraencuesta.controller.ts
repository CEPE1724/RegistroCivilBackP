import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { CompraencuestaService } from './compraencuesta.service';
import { Auth } from 'src/auths/decorators';
import { ValidRoles } from 'src/auths/interfaces';

@Controller('compraencuesta')
//@Auth()  si va aqui todas las rutas deben estra validadas
export class CompraencuestaController {
  constructor(private readonly compraencuestaService: CompraencuestaService) {}

  @Get(':Estado')
  @Auth(ValidRoles.admin)
  findAll(@Param('Estado',ParseIntPipe) Estado: number) {
     
    return this.compraencuestaService.findAll(Estado);
  }

}
