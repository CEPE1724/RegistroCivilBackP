import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CognotrabajocargoService } from './cognotrabajocargo.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cognotrabajocargo')
export class CognotrabajocargoController {
  constructor(private readonly cognotrabajocargoService: CognotrabajocargoService) {}

  @Get()
  @Auth()
  findAll() {
    return this.cognotrabajocargoService.findAll();
  }


}
