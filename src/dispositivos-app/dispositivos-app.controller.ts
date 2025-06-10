import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispositivosAppService } from './dispositivos-app.service';
import { CreateDispositivosAppDto } from './dto/create-dispositivos-app.dto';
import { UpdateDispositivosAppDto } from './dto/update-dispositivos-app.dto';

@Controller('dispositivosApp')
export class DispositivosAppController {
  constructor(private readonly dispositivosAppService: DispositivosAppService) {}


  // dispositivos-app.controller.ts
@Get('tokenExpo/:numeroSolicitud')
getTokenExpo(@Param('numeroSolicitud') numeroSolicitud: string) {
  return this.dispositivosAppService.getTokenExpoByNumeroSolicitud(numeroSolicitud);
}

  @Post()
  create(@Body() createDispositivosAppDto: CreateDispositivosAppDto) {
    return this.dispositivosAppService.create(createDispositivosAppDto);
  }

  @Get('empresa/:id')
  findAll(@Param('id') id: string) {
    return this.dispositivosAppService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispositivosAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispositivosAppDto: UpdateDispositivosAppDto) {
    return this.dispositivosAppService.update(+id, updateDispositivosAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispositivosAppService.remove(+id);
  }
}
