import { Module } from '@nestjs/common';
import { EqfxidentificacionconsultadaService } from './eqfxidentificacionconsultada.service';
import { EqfxidentificacionconsultadaController } from './eqfxidentificacionconsultada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eqfxidentificacionconsultada } from './entities/eqfxidentificacionconsultada.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [EqfxidentificacionconsultadaController],
  providers: [EqfxidentificacionconsultadaService],
  imports: [TypeOrmModule.forFeature([Eqfxidentificacionconsultada]), AuthModule],
  exports: [EqfxidentificacionconsultadaService]
})
export class EqfxidentificacionconsultadaModule {}
