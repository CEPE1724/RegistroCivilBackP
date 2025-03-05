import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Usuario} from '../entities/user.entity';
import { JwtPayload } from "../interfaces/jwt-payload.interfaces";
import {  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


  async validate(payload: JwtPayload): Promise<Usuario> {
    const { Nombre } = payload;

    const user = await this.usuarioRepository.findOneBy({ Nombre });

    if (!user) 
      throw new UnauthorizedException('Usuario no encontrado');
    
    if (!user.Activo)
      throw new UnauthorizedException('Usuario inactivo');

    if(user.idGrupo == 36)
        throw new UnauthorizedException('Usuario no autorizado');
    
    
    return user;
  }
}