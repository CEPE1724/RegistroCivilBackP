import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CupoCreditoService } from './cupo-credito.service';
import { CreateCupoCreditoDto } from './dto/create-cupo-credito.dto';
import { UpdateCupoCreditoDto } from './dto/update-cupo-credito.dto';

@Controller('cupo-credito')
export class CupoCreditoController {
  constructor(private readonly cupoCreditoService: CupoCreditoService) {}


  @Get()
  findAll() {
    return this.cupoCreditoService.findAll();
  }


}
