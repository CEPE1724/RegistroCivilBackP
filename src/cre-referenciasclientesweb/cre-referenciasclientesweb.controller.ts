import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreReferenciasclienteswebService } from './cre-referenciasclientesweb.service';
import { CreateCreReferenciasclienteswebDto } from './dto/create-cre-referenciasclientesweb.dto';
import { UpdateCreReferenciasclienteswebDto } from './dto/update-cre-referenciasclientesweb.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-referenciasclientesweb')
export class CreReferenciasclienteswebController {
  constructor(private readonly creReferenciasclienteswebService: CreReferenciasclienteswebService) {}

  @Post()
  @Auth()
  create(@Body() createCreReferenciasclienteswebDto: CreateCreReferenciasclienteswebDto) {
    return this.creReferenciasclienteswebService.create(createCreReferenciasclienteswebDto);
  }

  @Get('all/:idsolicitud')
  @Auth()
  findAll(@Param('idsolicitud') idsolicitud: number) {
    return this.creReferenciasclienteswebService.findAll(idsolicitud);
  }

  @Get('all/count/:idsolicitud')
  @Auth()
  findAllCount(@Param('idsolicitud') idsolicitud: number) {
    return this.creReferenciasclienteswebService.findAllCount(idsolicitud);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.creReferenciasclienteswebService.findOne(+id);
  }

}
