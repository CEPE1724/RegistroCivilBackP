import { Module } from '@nestjs/common';
import { DflIndicadoresAnversoService } from './dfl_indicadores-anverso.service';
import { DflIndicadoresAnversoController } from './dfl_indicadores-anverso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DflIndicadoresAnverso } from './entities/dfl_indicadores-anverso.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DflIndicadoresAnverso])],
  controllers: [DflIndicadoresAnversoController],
  providers: [DflIndicadoresAnversoService],
})
export class DflIndicadoresAnversoModule {}
