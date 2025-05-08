import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EqfxEvolucionHistDisEndRecursivoService } from './eqfx-evolucion-hist-dis-end-recursivo.service';
import { EqfxEvolucionHistDisEndRecursivoController } from './eqfx-evolucion-hist-dis-end-recursivo.controller';
import { EqfxEvolucionHistDisEndRecursivo } from './entities/eqfx-evolucion-hist-dis-end-recursivo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxEvolucionHistDisEndRecursivoController],
  providers: [EqfxEvolucionHistDisEndRecursivoService],
  imports: [TypeOrmModule.forFeature([EqfxEvolucionHistDisEndRecursivo]), AuthModule],
  exports: [EqfxEvolucionHistDisEndRecursivoService],
})
export class EqfxEvolucionHistDisEndRecursivoModule {}
