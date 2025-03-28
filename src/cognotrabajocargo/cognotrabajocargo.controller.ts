import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CognotrabajocargoService } from './cognotrabajocargo.service';

@Controller('cognotrabajocargo')
export class CognotrabajocargoController {
  constructor(private readonly cognotrabajocargoService: CognotrabajocargoService) {}

  @Get()
  findAll() {
    return this.cognotrabajocargoService.findAll();
  }


}
