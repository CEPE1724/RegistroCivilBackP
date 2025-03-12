import { Module } from '@nestjs/common';
import { EqfxidentificacionconsultadaService } from './eqfxidentificacionconsultada.service';
import { EqfxidentificacionconsultadaController } from './eqfxidentificacionconsultada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eqfxidentificacionconsultada } from './entities/eqfxidentificacionconsultada.entity';

@Module({
  controllers: [EqfxidentificacionconsultadaController],
  providers: [EqfxidentificacionconsultadaService],
  imports: [TypeOrmModule.forFeature([Eqfxidentificacionconsultada])],
  exports: [EqfxidentificacionconsultadaService]
})
export class EqfxidentificacionconsultadaModule {}
