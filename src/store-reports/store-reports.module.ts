import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
  imports: [
      TypeOrmModule.forFeature([Nomina]),
      PrinterModule
    ],
})
export class StoreReportsModule {}
