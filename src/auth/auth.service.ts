import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: Usuario): string {
    const payload = { Nombre: user.Nombre, sub: user.idUsuario };
    return this.jwtService.sign(payload, { expiresIn: '3h' });
  }
  
}
