import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirOperacionesfirmaService } from './fir-operacionesfirma.service';
import { CreateFirOperacionesfirmaDto } from './dto/create-fir-operacionesfirma.dto';
import { UpdateFirOperacionesfirmaDto } from './dto/update-fir-operacionesfirma.dto';

@Controller('fir-operacionesfirma')
export class FirOperacionesfirmaController {
  constructor(private readonly firOperacionesfirmaService: FirOperacionesfirmaService) {}

  @Post()
  create(@Body() createFirOperacionesfirmaDto: CreateFirOperacionesfirmaDto) {
    return this.firOperacionesfirmaService.create(createFirOperacionesfirmaDto);
  }

 
}
