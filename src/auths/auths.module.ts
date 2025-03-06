import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        //console.log('JWT_SECRET', configService.get('JWT_SECRET'))
        //console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '3h'
          }
        }
      }
    }),
  ],

  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule], // Asegúrate de exportar lo que necesitas
})
export class AuthsModule {}
