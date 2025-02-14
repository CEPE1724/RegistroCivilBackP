import { Module } from '@nestjs/common';
import { DatacognoService } from './datacogno.service';
import { DatacognoController } from './datacogno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datacogno } from './entities/datacogno.entity';

@Module({
  controllers: [DatacognoController],
  providers: [DatacognoService],
  imports: [
    TypeOrmModule.forFeature([Datacogno]),
  ]
})
export class DatacognoModule {}
