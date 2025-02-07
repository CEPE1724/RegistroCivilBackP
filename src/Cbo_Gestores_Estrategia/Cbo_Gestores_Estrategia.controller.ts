// src/cbo-gestores/cbo-gestores-estrategia.controller.ts
import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CboGestoresEstrategiaService } from './Cbo_Gestores_Estrategia.service';
import { CboGestoresEstrategia } from './Cbo_Gestores_Estrategia.entity';
import { ResponseDto } from './Cbo_Gestores_Estrategia.service.dto';
import { Response } from 'express';  // Para utilizar el tipo Response de Express

@Controller('cbo-gestores-estrategia')
export class CboGestoresEstrategiaController {
  constructor(private readonly cboGestoresEstrategiaService: CboGestoresEstrategiaService) {}

  // Endpoint para crear un nuevo registro de estrategia
  @Post()
  async create(@Body() cboGestoresEstrategia: CboGestoresEstrategia, @Res() res: Response): Promise<Response> {
    try {
      // Creamos el nuevo registro a través del servicio
      const createdItem = await this.cboGestoresEstrategiaService.create(cboGestoresEstrategia);
      
      // Generamos la respuesta con DTO
      const response = new ResponseDto(HttpStatus.CREATED, 'Registro creado con éxito', createdItem);
      
      // Retornamos la respuesta con código de estado 201 (CREATED)
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      // En caso de error, generamos una respuesta con código de estado 400 (BAD REQUEST)
      const response = new ResponseDto(HttpStatus.BAD_REQUEST, 'Error al crear el registro', null);
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  // Endpoint para obtener todos los registros
  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      // Obtenemos los registros a través del servicio
      const items = await this.cboGestoresEstrategiaService.findAll();
      
      // Generamos la respuesta con DTO
      const response = new ResponseDto(HttpStatus.OK, 'Registros obtenidos con éxito', items);
      
      // Retornamos la respuesta con código de estado 200 (OK)
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      // En caso de error, generamos una respuesta con código de estado 400 (BAD REQUEST)
      const response = new ResponseDto(HttpStatus.BAD_REQUEST, 'Error al obtener los registros', null);
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }
}
