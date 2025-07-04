import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { AuthModule } from 'src/auth/auth.module';
import { InfoSistemaModule } from 'src/info-sistema/info-sistema.module'; 
import { EmailModule } from 'src/email/email.module';
import { NominaModule } from 'src/nomina/nomina.module';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), AuthModule , InfoSistemaModule , EmailModule, NominaModule],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
  
})
export class UsuarioModule {}
