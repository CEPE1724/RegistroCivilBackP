import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token); // Verifica el token
      request.user = { Nombre: payload.Nombre, idUsuario: payload.sub, idGrupo: payload.idGrupo }; // Agrega lo que necesites
      return true;
      
    } catch (error) {
      throw new UnauthorizedException('Invalid token or token expired');
    }
  }
}
