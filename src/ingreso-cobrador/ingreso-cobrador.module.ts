import { Module } from '@nestjs/common';
import { IngresoCobradorService } from './ingreso-cobrador.service';
import { IngresoCobradorController } from './ingreso-cobrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoCobrador } from './entities/ingreso-cobrador.entity';

@Module({
  controllers: [IngresoCobradorController],
  providers: [IngresoCobradorService],
  imports: [TypeOrmModule.forFeature([IngresoCobrador])],
})
export class IngresoCobradorModule {}
