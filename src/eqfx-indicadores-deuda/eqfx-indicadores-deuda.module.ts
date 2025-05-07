import { Module } from '@nestjs/common';
import { EqfxIndicadoresDeudaService } from './eqfx-indicadores-deuda.service';
import { EqfxIndicadoresDeudaController } from './eqfx-indicadores-deuda.controller';
import { EqfxIndicadoresDeuda } from './entities/eqfx-indicadores-deuda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxIndicadoresDeudaController],
  providers: [EqfxIndicadoresDeudaService],
  imports: [TypeOrmModule.forFeature([EqfxIndicadoresDeuda])],
  exports: [EqfxIndicadoresDeudaService],
})
export class EqfxIndicadoresDeudaModule {}
