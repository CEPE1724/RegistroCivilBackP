import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards , Headers, SetMetadata} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/usuarios/usuario.entity';
import { RawHeaders, GetUser, Auth } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authsService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authsService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  getPrivate(
    @GetUser() user: Usuario,
    @GetUser('Nombre') nombre: string,
    @RawHeaders() rawHeaders: string [],
    @Headers() headers: IncomingHttpHeaders
  ) {
    return {
      ok: true,
      message: 'This is a private route',
      usuario: user,
      nombre,
      rawHeaders,
      headers

    }
  }

 @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(
    @GetUser() user: Usuario,
    @GetUser('Nombre') nombre: string,
    @RawHeaders() rawHeaders: string [],
    @Headers() headers: IncomingHttpHeaders
  ) {
    return {
      ok: true,
      message: 'This is a private route',
      usuario: user,
      nombre,
      rawHeaders,
      headers

    }
  }

  @Get('private2')
  //@SetMetadata('roles', ['1'])
  @RoleProtected(ValidRoles.almacen, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: Usuario
  ){
    return {
      ok: true,
      message: 'This is a private route 2',
      usuario: user
    }
  }

  @Get('private3')
  //@SetMetadata('roles', ['1'])
  //@RoleProtected(ValidRoles.almacen, ValidRoles.admin)
  //@UseGuards(AuthGuard(), UserRoleGuard) ejemplos no van
  // aqui si vamos a usar el decorador Auth
  //@Auth() validamos solo token y no roles
  @Auth(ValidRoles.almacen, ValidRoles.calidad)
  privateRoute3(
    @GetUser() user: Usuario
  ){
    return {
      ok: true,
      message: 'This is a private route 2',
      usuario: user
    }
  }
}

