import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsPhoneVerificationService } from './store-reports-phone-verification.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser } from '../auth/decorators';
@Controller('store-reports-phone-verification')
export class StoreReportsPhoneVerificationController {
  constructor(private readonly storeReportsPhoneVerificationService: StoreReportsPhoneVerificationService) { }

  @Get('cre-solicitud/:orderId')
  @Auth()
  async getCreSolicitudReport(
    @Res() response: Response,
    @Param('orderId') orderId: string,
  ) {
    const pdfDoc = await this.storeReportsPhoneVerificationService.getCreSolicitudReport(+orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = `Cre Solicitud Report`;
    pdfDoc.pipe(response);
    pdfDoc.end();
  }


}


