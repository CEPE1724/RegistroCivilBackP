import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreParroquiaService } from './cre_parroquia.service';
import { CreateCreParroquiaDto } from './dto/create-cre_parroquia.dto';
import { UpdateCreParroquiaDto } from './dto/update-cre_parroquia.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('cre-parroquia')
export class CreParroquiaController {
  constructor(private readonly creParroquiaService: CreParroquiaService) {}

  @Get(':idCanton')
  @Auth()
  async findByCanton(@Param('idCanton') idCanton: string) {
    return await this.creParroquiaService.findByCanton(Number(idCanton));
  }
}
