import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  /*   @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
      return this.usuarioService.createUsuario(createUsuarioDto.Nombre, createUsuarioDto.Clave);
    } */

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('rol/:idGrupo')
async findUsuariosByGrupo(@Param('idGrupo') idGrupo: number): Promise<Partial<Usuario>[]> {
  return this.usuarioService.findByGrupoId(idGrupo);
}


  @Get('analistas')
  async findAnalistas(@Query('Filtro') Filtro: string): Promise<Usuario[]> {
    return this.usuarioService.findAllAnalistas(Filtro);
  }


  @Get(':Nombre')
  async findOne(@Param('Nombre') Nombre: string): Promise<Usuario | string> {
    const resultado = await this.usuarioService.findByNombre(Nombre);
    if (typeof resultado === 'string') {
      return resultado;
    }

    return resultado;
  }

}
