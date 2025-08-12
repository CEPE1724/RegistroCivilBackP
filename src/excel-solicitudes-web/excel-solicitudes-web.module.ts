import { Module } from '@nestjs/common';
import { ExcelSolicitudesWebService } from './excel-solicitudes-web.service';
import { ExcelSolicitudesWebController } from './excel-solicitudes-web.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExcelSolicitudesWebController],
  providers: [ExcelSolicitudesWebService],
  imports: [AuthModule],
})
export class ExcelSolicitudesWebModule {}
