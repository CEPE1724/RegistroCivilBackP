import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreReferenciasclienteswebService } from './cre-referenciasclientesweb.service';
import { CreateCreReferenciasclienteswebDto } from './dto/create-cre-referenciasclientesweb.dto';
import { UpdateCreReferenciasclienteswebDto } from './dto/update-cre-referenciasclientesweb.dto';

@Controller('cre-referenciasclientesweb')
export class CreReferenciasclienteswebController {
  constructor(private readonly creReferenciasclienteswebService: CreReferenciasclienteswebService) {}

  @Post()
  create(@Body() createCreReferenciasclienteswebDto: CreateCreReferenciasclienteswebDto) {
    return this.creReferenciasclienteswebService.create(createCreReferenciasclienteswebDto);
  }

  @Get('all/:idsolicitud')
  findAll(@Param('idsolicitud') idsolicitud: number) {
    return this.creReferenciasclienteswebService.findAll(idsolicitud);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creReferenciasclienteswebService.findOne(+id);
  }

}
