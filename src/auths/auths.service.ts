import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { log } from 'console';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) { }


  async login(loginUserDto: LoginUserDto) {
    try {
      const { Nombre, Clave } = loginUserDto;

      const usuario = await this.usuarioRepository.findOne({ 
           where: { Nombre },
           select: { Nombre: true, Clave: true, idUsuario: true, idGrupo: true, Activo: true }
          });

      if (!usuario)
        throw new UnauthorizedException('Usuario no encontrado');
      if (usuario.Clave !== Clave)
        throw new UnauthorizedException('Contraseña incorrecta');

      return {
        ...usuario,
        token: this.getJwtToken({
          Nombre: usuario.Nombre,
          idUsuario: usuario.idUsuario,
          idGrupo: usuario.idGrupo,
          Activo: usuario.Activo
        })
      }
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload){

    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new BadRequestException('Error desconocido');
  }
}
