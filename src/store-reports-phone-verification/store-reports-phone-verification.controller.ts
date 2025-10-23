import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { StoreReportsPhoneVerificationService } from './store-reports-phone-verification.service';
import { Response } from 'express';
import { Auth } from '../auth/decorators';

@Controller('store-reports-phone-verification')
export class StoreReportsPhoneVerificationController {
  constructor(
    private readonly storeReportsPhoneVerificationService: StoreReportsPhoneVerificationService,
  ) {}

  @Get('cre-solicitud/:orderId')
  //@Auth()
  async getCreSolicitudReport(
    @Res() res: Response,
    @Param('orderId') orderId: string,
  ) {
    try {
      const pdfDoc = await this.storeReportsPhoneVerificationService.getCreSolicitudReport(+orderId);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=solicitud-${orderId}.pdf`);

      pdfDoc.info.Title = `Cre Solicitud Report`;
      pdfDoc.pipe(res);
      pdfDoc.end();
    } catch (error) {
      console.error('[PDF Error]', error);

      // Enviar error como JSON, si aún no se envió contenido
      if (!res.headersSent) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'No se pudo generar el PDF', details: error.message });
      }
    }
  }

  @Get('dflfirma-digital/:orderId')
  //@Auth()
  async getDflFirmaDigitalReport(
    @Res() res: Response,
    @Param('orderId') orderId: string,
  ) {
    try {
      const pdfDoc = await this.storeReportsPhoneVerificationService.getDflFirmaDigitalReport(+orderId);
      /*res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=dfl-firma-digital-${orderId}.pdf`);

      pdfDoc.info.Title = `Dfl Firma Digital Report`;
      pdfDoc.pipe(res);
      pdfDoc.end();*/
    } catch (error) {
      console.error('[PDF Error]', error);

      // Enviar error como JSON, si aún no se envió contenido
      if (!res.headersSent) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'No se pudo generar el PDF', details: error.message });
      }
    }
  }

}
