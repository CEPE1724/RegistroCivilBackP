import { Module } from '@nestjs/common';
import { ExcelSolicitudesWebService } from './excel-solicitudes-web.service';
import { ExcelSolicitudesWebController } from './excel-solicitudes-web.controller';

@Module({
  controllers: [ExcelSolicitudesWebController],
  providers: [ExcelSolicitudesWebService],
})
export class ExcelSolicitudesWebModule {}
