import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class MetricsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers['authorization'];
    const expectedToken = process.env.METRICS_TOKEN;

    if (!authHeader || !expectedToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const [type, token] = authHeader.split(' ');
    const valid = type === 'Bearer' && token === expectedToken;

    if (!valid) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
} 