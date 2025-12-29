import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { PersonalBddService } from './personal-bdd.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('personal-bdd')
export class PersonalBddController {
  constructor(private readonly personalBddService: PersonalBddService) {}

  @Get('gestores')
  @UseGuards(AuthGuard('jwt'))
  findAllGestor(@Req() req: any) {
    const usuarioAutenticado = {
      nombre: req.user?.Nombre || 'USUARIO_DEMO',
      grupo: req.user?.idGrupo || 0
    };
    return this.personalBddService.findAllgestor(usuarioAutenticado);
  }
}