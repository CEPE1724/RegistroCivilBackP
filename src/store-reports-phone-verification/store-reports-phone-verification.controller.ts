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


	@Get('gastos-cobranza/:id')
	//@Auth()
	async getGastosCobranzasReport(
		@Res() res: Response,
		@Param('id') id: string,
	) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getGastosCobranzasReport(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-gasto-cobranza-${id}.pdf`);

			pdfDoc.info.Title = `Gasto Cobranza Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}



	@Get('tratamiento-datos/:id')
	//@Auth()
	async getConsentimientoTratDatos(
		@Res() res: Response,
		@Param('id') id: string,
	) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getConsentimientoTratDatos(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-tratamiento-datos-${id}.pdf`);

			pdfDoc.info.Title = `Tratamiento de Datos Personales Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}
	

	@Get('pagare-orden/:id')
	//@Auth()
	async getPagareALaOrden(
		@Res() res: Response,
		@Param('id') id: string,
	) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getPagareALaOrden(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-tratamiento-datos-${id}.pdf`);

			pdfDoc.info.Title = `Pagare a la Orden Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}


	@Get('entrega-datos/:id')
	//@Auth()
	async getActaEntregaDocs(
		@Res() res: Response,
		@Param('id') id: string,
	) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getActaEntregaDocs(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-entrega-documentos-${id}.pdf`);

			pdfDoc.info.Title = `Acta Entrega Documentos Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}


	@Get('compromiso-lugarPag/:id')
	//@Auth()
	async getCompromisoLugPago(
		@Res() res: Response,
		@Param('id') id: string,
	) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getCompromisoLugPago(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-compromiso-lugar-${id}.pdf`);

			pdfDoc.info.Title = `Compromiso Lugar Pago Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}

	@Get('declaracion-compromiso/:id')
	//@Auth()
	async getDeclaracionCompromisos(
		@Res() res: Response,
		@Param('id') id: string,
	) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getDeclaracionCompromisos(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-compromiso-lugar-${id}.pdf`);

			pdfDoc.info.Title = `Declaracion y Compromisos Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}


	@Get('compraVenta-resDominio')
	//@Auth()
	async getcompraVentaResDominio(@Res() res: Response) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getcompraVentaResDominio();
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-compraVenta-reservaDominio.pdf`);

			pdfDoc.info.Title = `Compra Venta con Reserva Dominio Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}

	@Get('tabla-amortizacion/:id')
	//@Auth()
	async getTablaAmortizacion(@Res() res: Response, @Param('id') id: string) {
		try {
			const pdfDoc = await this.storeReportsPhoneVerificationService.getTablaAmortizacion(+id);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=dfl-tabla-amortizacion-${id}.pdf`);

			pdfDoc.info.Title = `Tabla Amortizacion Report`;
			pdfDoc.pipe(res);
			pdfDoc.end();
		} catch (error) {
			console.error('[PDF Error]', error);

			if (!res.headersSent) {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: 'No se pudo generar el PDF', details: error.message });
			}
		}
	}
}
