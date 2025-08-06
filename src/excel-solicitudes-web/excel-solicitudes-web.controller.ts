import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelSolicitudesWebService } from './excel-solicitudes-web.service';

@Controller('excel-solicitudes-web')
export class ExcelSolicitudesWebController {
  constructor(private readonly excelSolicitudesWebService: ExcelSolicitudesWebService) {}
  
  @Get('export-excel')
  async exportExcel(@Res() res: Response) {
    await this.excelSolicitudesWebService.generateExcel(res);
  }
}
