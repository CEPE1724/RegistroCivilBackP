import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class EnvTokenAuthGuard implements CanActivate {
  constructor(private envVarName: string) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    const expectedToken = process.env[this.envVarName];

    if (!authHeader || !expectedToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || token !== expectedToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}