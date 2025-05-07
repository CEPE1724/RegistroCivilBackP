import { Module } from '@nestjs/common';
import { EqfxEvolucionHistDisEndeudamientoService } from './eqfx-evolucion-hist-dis-endeudamiento.service';
import { EqfxEvolucionHistDisEndeudamientoController } from './eqfx-evolucion-hist-dis-endeudamiento.controller';
import { EqfxEvolucionHistDisEndeudamiento } from './entities/eqfx-evolucion-hist-dis-endeudamiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxEvolucionHistDisEndeudamientoController],
  providers: [EqfxEvolucionHistDisEndeudamientoService],
  imports: [TypeOrmModule.forFeature([EqfxEvolucionHistDisEndeudamiento])],
  exports: [EqfxEvolucionHistDisEndeudamientoService],
})
export class EqfxEvolucionHistDisEndeudamientoModule {}
