import { Module } from '@nestjs/common';
import { EqfxEntidadesConsultadasService } from './eqfx-entidades-consultadas.service';
import { EqfxEntidadesConsultadasController } from './eqfx-entidades-consultadas.controller';
import { EqfxEntidadesConsultada } from './entities/eqfx-entidades-consultada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxEntidadesConsultadasController],
  providers: [EqfxEntidadesConsultadasService],
  imports: [TypeOrmModule.forFeature([EqfxEntidadesConsultada]) , AuthModule],
  exports: [EqfxEntidadesConsultadasService],
})
export class EqfxEntidadesConsultadasModule {}
