import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EqfxIndicadoresDeudaHistoricaService } from './eqfx-indicadores-deuda-historica.service';
import { EqfxIndicadoresDeudaHistoricaController } from './eqfx-indicadores-deuda-historica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EqfxIndicadoresDeudaHistorica } from './entities/eqfx-indicadores-deuda-historica.entity';

@Module({
  controllers: [EqfxIndicadoresDeudaHistoricaController],
  providers: [EqfxIndicadoresDeudaHistoricaService],
  imports: [TypeOrmModule.forFeature([EqfxIndicadoresDeudaHistorica]), AuthModule],
  exports: [EqfxIndicadoresDeudaHistoricaService],
})
export class EqfxIndicadoresDeudaHistoricaModule {}
