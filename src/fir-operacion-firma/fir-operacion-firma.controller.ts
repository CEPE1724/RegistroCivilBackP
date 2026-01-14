import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirOperacionFirmaService } from './fir-operacion-firma.service';
import { CreateFirOperacionFirmaDto } from './dto/create-fir-operacion-firma.dto';
import { UpdateFirOperacionFirmaDto } from './dto/update-fir-operacion-firma.dto';

@Controller('fir-operacion-firma')
export class FirOperacionFirmaController {
  constructor(private readonly firOperacionFirmaService: FirOperacionFirmaService) {}

  @Post()
  create(@Body() createFirOperacionFirmaDto: CreateFirOperacionFirmaDto) {
    return this.firOperacionFirmaService.create(createFirOperacionFirmaDto);
  }

}
