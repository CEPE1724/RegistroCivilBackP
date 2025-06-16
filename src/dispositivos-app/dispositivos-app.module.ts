import { Module } from '@nestjs/common';
import { DispositivosAppService } from './dispositivos-app.service';
import { DispositivosAppController } from './dispositivos-app.controller';
import { DispositivosApp } from './entities/dispositivos-app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoCobrador } from 'src/ingreso-cobrador/entities/ingreso-cobrador.entity';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { CreSolicitudWeb } from 'src/cre_solicitud-web/entities/cre_solicitud-web.entity';

@Module({
  controllers: [DispositivosAppController],
  providers: [DispositivosAppService],
  imports: [TypeOrmModule.forFeature([DispositivosApp, IngresoCobrador, Nomina , CreSolicitudWeb, Usuario])],
  exports: [DispositivosAppService],
})
export class DispositivosAppModule {}
