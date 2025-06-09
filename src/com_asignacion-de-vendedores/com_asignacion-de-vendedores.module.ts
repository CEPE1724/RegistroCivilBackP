import { Module } from '@nestjs/common';
import { ComAsignacionDeVendedoresService } from './com_asignacion-de-vendedores.service';
import { ComAsignacionDeVendedoresController } from './com_asignacion-de-vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComAsignacionDeVendedore } from './entities/com_asignacion-de-vendedore.entity';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { DispositivosApp } from 'src/dispositivos-app/entities/dispositivos-app.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [ComAsignacionDeVendedoresController],
  providers: [ComAsignacionDeVendedoresService],
  imports: [TypeOrmModule.forFeature([ ComAsignacionDeVendedore , Nomina, DispositivosApp],
  ), AuthModule],
  exports: [ComAsignacionDeVendedoresService],
})
export class ComAsignacionDeVendedoresModule {}
