import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auths/decorators/role-protected.decorator';
import { Usuario } from 'src/usuarios/usuario.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles : string[] = this.reflector.get(META_ROLES, context.getHandler());
    if(!validRoles) return true; // No se requiere ningun rol
    if(validRoles.length === 0) return true;// No se requiere ningun rol
    const request = context.switchToHttp().getRequest();
        const user = request.user as Usuario

    if(!user)
      throw new BadRequestException('User not found (request)');
    console.log('User:', user.idGrupo);

    for (const role of user.idGrupo.toString()){ 
      if(validRoles.includes(role)){
        return true;
      }
    }
    throw new BadRequestException( `User ${user.Nombre} need a valid role: [${validRoles}]`);
  }
}
