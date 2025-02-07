import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CboGestoresService } from './cbo-gestores.service';
import { CboGestores } from './cbo-gestores.entity';
import { ResponseDto } from './cbo-gestores.dto';
@Controller('Cbo_Gestores')
export class CboGestoresController {
  constructor(private readonly cboGestoresService: CboGestoresService) {}

  @Post()
  create(@Body() cboGestores: Partial<CboGestores>): Promise<CboGestores> {
    return this.cboGestoresService.create(cboGestores);
  }

  

  @Get()
  async findAll(): Promise<ResponseDto<CboGestores[]>> {
    return this.cboGestoresService.findAll();  // Devuelve la respuesta con formato éxito
  }
  

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CboGestores> {
    return this.cboGestoresService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() cboGestores: Partial<CboGestores>,
  ): Promise<CboGestores> {
    return this.cboGestoresService.update(id, cboGestores);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cboGestoresService.remove(id);
  }
}
