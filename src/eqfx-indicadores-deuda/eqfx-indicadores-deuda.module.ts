import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EqfxIndicadoresDeudaService } from './eqfx-indicadores-deuda.service';
import { EqfxIndicadoresDeudaController } from './eqfx-indicadores-deuda.controller';
import { EqfxIndicadoresDeuda } from './entities/eqfx-indicadores-deuda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxIndicadoresDeudaController],
  providers: [EqfxIndicadoresDeudaService],
  imports: [TypeOrmModule.forFeature([EqfxIndicadoresDeuda]), AuthModule],
  exports: [EqfxIndicadoresDeudaService],
})
export class EqfxIndicadoresDeudaModule {}
