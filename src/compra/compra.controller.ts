import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Auth } from 'src/auth/decorators';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}



  @Get()
  findAll( ) {
    return this.compraService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.compraService.findOne(+id);
  }

  @Get('ValidaEstadoCompra/:NumeroIdentificacion/:Bodega')
  @Auth()
  validaEstadoCompra(@Param('NumeroIdentificacion') numeroIdentificacion: string, @Param('Bodega') bodega: number) {
    return this.compraService.validaEstadoCompra(numeroIdentificacion, bodega);
  }

}