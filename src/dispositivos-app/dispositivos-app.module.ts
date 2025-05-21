import { Module } from '@nestjs/common';
import { DispositivosAppService } from './dispositivos-app.service';
import { DispositivosAppController } from './dispositivos-app.controller';
import { DispositivosApp } from './entities/dispositivos-app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoCobrador } from 'src/ingreso-cobrador/entities/ingreso-cobrador.entity';
import { Nomina } from 'src/nomina/entities/nomina.entity';

@Module({
  controllers: [DispositivosAppController],
  providers: [DispositivosAppService],
  imports: [TypeOrmModule.forFeature([DispositivosApp, IngresoCobrador, Nomina])],
  exports: [DispositivosAppService],
})
export class DispositivosAppModule {}
