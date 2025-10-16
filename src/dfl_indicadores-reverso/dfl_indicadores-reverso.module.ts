import { Module } from '@nestjs/common';
import { DflIndicadoresReversoService } from './dfl_indicadores-reverso.service';
import { DflIndicadoresReversoController } from './dfl_indicadores-reverso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DflIndicadoresReverso } from './entities/dfl_indicadores-reverso.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DflIndicadoresReverso])],
  controllers: [DflIndicadoresReversoController],
  providers: [DflIndicadoresReversoService],
})
export class DflIndicadoresReversoModule {}
