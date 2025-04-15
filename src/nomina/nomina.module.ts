import { Module } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { NominaController } from './nomina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomina } from './entities/nomina.entity';
@Module({
  controllers: [NominaController],
  providers: [NominaService],
  imports: [TypeOrmModule.forFeature([Nomina])],
})
export class NominaModule {}
