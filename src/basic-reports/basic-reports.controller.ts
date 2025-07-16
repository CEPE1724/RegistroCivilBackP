import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get('basic-reports')
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Basic Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentletter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentletter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }


  @Get('employment-letter/:idNomina')
  async employmentletterById(
    @Res() response: Response,
    @Param('idNomina') idNomina: string,
  ) {
    const pdfDoc = await this.basicReportsService.employmentletterById(+idNomina);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }



  @Get('countries')
  async getCountriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Basic Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('credito-directo/:idCre_SolicitudWeb')
  async getCredDirectoReport(@Res() response: Response, @Param('idCre_SolicitudWeb') idCre_SolicitudWeb:string) {
	const pdfDoc = await this.basicReportsService.getCredDirectoReport(+idCre_SolicitudWeb);

	response.setHeader('Content-Type', 'application/pdf');
	pdfDoc.info.Title = 'Credito Directo Report';
	pdfDoc.pipe(response);
	pdfDoc.end();
  }

}
