import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CboGestoresService } from './cbo-gestores.service';
import { CboGestores } from './cbo-gestores.entity';
import { ResponseDto } from './cbo-gestores.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('Cbo_Gestores')
export class CboGestoresController {
  constructor(private readonly cboGestoresService: CboGestoresService) {}

  @Post()
  @Auth()
  create(@Body() cboGestores: Partial<CboGestores>): Promise<CboGestores> {
    return this.cboGestoresService.create(cboGestores);
  }

  

  @Get()
  @Auth()
  async findAll(): Promise<ResponseDto<CboGestores[]>> {
    return this.cboGestoresService.findAll();  // Devuelve la respuesta con formato éxito
  }
  

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: number): Promise<CboGestores> {
    return this.cboGestoresService.findOne(id);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: number,
    @Body() cboGestores: Partial<CboGestores>,
  ): Promise<CboGestores> {
    return this.cboGestoresService.update(id, cboGestores);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: number): Promise<void> {
    return this.cboGestoresService.remove(id);
  }
}
