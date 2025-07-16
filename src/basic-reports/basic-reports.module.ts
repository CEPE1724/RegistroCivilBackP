import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { PrinterModule } from 'src/printer/printer.module';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  exports: [BasicReportsService],
  imports: [
    TypeOrmModule.forFeature([Nomina, WebSolicitudgrande]),
    PrinterModule
  ],
})
export class BasicReportsModule {}
