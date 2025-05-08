import { Module } from '@nestjs/common';
import { DatacognoService } from './datacogno.service';
import { DatacognoController } from './datacogno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datacogno } from './entities/datacogno.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DatacognoController],
  providers: [DatacognoService],
  imports: [
    TypeOrmModule.forFeature([Datacogno]), AuthModule
  ]
})
export class DatacognoModule {}
