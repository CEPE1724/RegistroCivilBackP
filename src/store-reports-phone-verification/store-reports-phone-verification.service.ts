import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, In, Repository } from 'typeorm';
import { CreSolicitudWeb } from 'src/cre_solicitud-web/entities/cre_solicitud-web.entity';
import { CreCanton } from 'src/cre-canton/entities/cre-canton.entity';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { PrinterService } from 'src/printer/printer.service';
import { Cognotrabajocargo } from 'src/cognotrabajocargo/entities/cognotrabajocargo.entity';
import { CreSolicitudverificaciontelefonica } from 'src/cre-solicitudverificaciontelefonica/entities/cre-solicitudverificaciontelefonica.entity';
import { phoneVerificationReport } from 'src/reports';
import { autorizacionDatosReport } from 'src/reports/dflFirmaDigital/autorizaciondatos.report';
import { CreVerificacionTelefonicaMaestro } from 'src/cre_verificacion-telefonica-maestro/entities/cre_verificacion-telefonica-maestro.entity';
import { TiempoSolicitudesWeb } from 'src/tiemposolicitudesweb/entities/tiemposolicitudesweb.entity';
import { GastosCobranzasReport } from 'src/reports/dflFirmaDigital/gastosCobranzas.report';
import { ConsentimientoTratDatosReport } from 'src/reports/dflFirmaDigital/consentimientoTratDatos.reports';
import { PagareALaOrdenReport } from 'src/reports/dflFirmaDigital/pagareAlaOrden.report';
import { Compra } from 'src/compra/entities/compra.entity';
import { actaEntregaDocsReport } from 'src/reports/dflFirmaDigital/actaEntregaDocs.report';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { compromisoLugPagReport } from 'src/reports/dflFirmaDigital/compromisoLugarPago.report';
import { declaracionCompromisosReport } from 'src/reports/dflFirmaDigital/declaracionCompromisos.report';
import { compraVentaResDominioReport } from 'src/reports/dflFirmaDigital/compraVentaResDominio.report';
import { Readable } from 'stream';
import * as getStream from 'get-stream';
import PDFDocument = require('pdfkit');

@Injectable()
export class StoreReportsPhoneVerificationService {
  private readonly logger = new Logger(StoreReportsPhoneVerificationService.name);

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>,
    @InjectRepository(WebSolicitudgrande)
    private readonly webSolicitudgrandeRepository: Repository<WebSolicitudgrande>,
    @InjectRepository(Cognotrabajocargo)
    private readonly cognoTrabajoCargoRepository: Repository<Cognotrabajocargo>,
    @InjectRepository(CreVerificacionTelefonicaMaestro)
    private readonly creverificacionTelefonicaMaestroRepository: Repository<CreVerificacionTelefonicaMaestro>,
    @InjectRepository(CreSolicitudverificaciontelefonica)
    private readonly creSolicitudverificaciontelefonicaRepository: Repository<CreSolicitudverificaciontelefonica>,
    @InjectRepository(CreCanton)
    private readonly creCantonRepository: Repository<CreCanton>,
    @InjectRepository(TiempoSolicitudesWeb)
    private readonly tiempoSolicitudesWebRepository: Repository<TiempoSolicitudesWeb>,
	@InjectRepository(Compra)
	private readonly compraRepository: Repository<Compra>,
	@InjectRepository(Nomina)
	private readonly nominaRepository: Repository<Nomina>,
    private readonly printerService: PrinterService,
  ) { }

  async getCreSolicitudReport(orderId: number) {
    try {
      const creSolicitud = await this.findCreSolicitud(orderId);
      const webSolicitudGrande = await this.findWebSolicitudGrande(orderId);

      const cognoTrabajoCargo = creSolicitud.bAfiliado
        ? await this.cognoTrabajoCargoRepository.findOne({ where: { idCognoTrabajoCargo: webSolicitudGrande.idCargo } })
        : null;

      const titularMaestro = await this.findVerificacionMaestro(creSolicitud.idCre_SolicitudWeb, webSolicitudGrande.idWeb_SolicitudGrande, 3);
      const informeTitular = await this.findVerificacionDetalle(titularMaestro.idCre_VerificacionTelefonicaMaestro);

      const familiaMaestro = await this.findVerificacionMaestro(creSolicitud.idCre_SolicitudWeb, webSolicitudGrande.idWeb_SolicitudGrande, In([6, 8, 5]));
      const informeFamiliares = await this.findVerificacionDetalle(familiaMaestro.idCre_VerificacionTelefonicaMaestro);

      const referencias = await this.getVerificacionReferencias(creSolicitud.idCre_SolicitudWeb);

      const analista = await this.tiempoSolicitudesWebRepository.findOne({
        where: {
          idCre_SolicitudWeb: creSolicitud.idCre_SolicitudWeb,
          Tipo: 2,
          idEstadoVerificacionDocumental: 3,
        },
      });

      if (!analista) {
        throw new NotFoundException(`Analista not found for Solicitud ${creSolicitud.idCre_SolicitudWeb}`);
      }

      const docDefinition = phoneVerificationReport({
        title: 'INFORME DE VERIFICACION TELEFONICA',
        subtitle: 'Details of the Cre Solicitud',
        data: {
          Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
          Cedula: creSolicitud.Cedula,
          Celular: creSolicitud.Celular,
          Fecha: creSolicitud.Fecha,
          Afiliacion: creSolicitud.bAfiliado ? 'SI' : 'NO',
          Direccion: `${webSolicitudGrande.CallePrincipal} ${webSolicitudGrande.NumeroCasa} ${webSolicitudGrande.CalleSecundaria}`,
          ReferenciaUbicacion: webSolicitudGrande.ReferenciaUbicacion,
          EmpresaTrabaja: creSolicitud.bAfiliado ? webSolicitudGrande.NombreEmpresa : webSolicitudGrande.NombreNegocio,
          Cargo: cognoTrabajoCargo?.NombreCargo || 'S/N',
          Ingresos: creSolicitud.bAfiliado ? webSolicitudGrande.IngresosTrabajo : webSolicitudGrande.IngresosNegosio,
          TelefonoTitular: titularMaestro.Telefono,
          InformeTitular: informeTitular.Observaciones,
          FechaVeriTitular: informeTitular.Fecha,
          TelefonoNegocio: familiaMaestro.Telefono,
          ContactoNegocio: informeFamiliares.Contacto,
          cargoNegocio: informeFamiliares.idParentesco,
          InformeNegocio: informeFamiliares.Observaciones,
          CargoFamiliares: informeFamiliares.idParentesco,
          AnalistaAprueba: analista.Usuario,
        },
        referencias,
      });

      return this.printerService.createPdf(docDefinition);
    } catch (error) {
      this.logger.error('Error generating report', error.stack);
      throw new InternalServerErrorException(error.message || 'Unexpected error generating report');
    }
  }

  async getDflFirmaDigitalReport(orderId: number) {

    try {
      const creSolicitud = await this.findCreSolicitud(orderId);
      const webSolicitudGrande = await this.findWebSolicitudGrande(orderId);
      // buscar canton
      const canton = await this.creCantonRepository.findOne({ where: { idCanton: webSolicitudGrande.idCantonDomicilio } });


      const docDefinition = autorizacionDatosReport({
        ciudad:  canton?.Nombre ,
        dia: new Date().getDate().toString(),
        mes: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ][new Date().getMonth()],
        anio: new Date().getFullYear().toString(),
        ApellidoPaterno: creSolicitud.ApellidoPaterno,
        ApellidoMaterno: creSolicitud.ApellidoMaterno,
        PrimerNombre: creSolicitud.PrimerNombre,
        SegundoNombre: creSolicitud.SegundoNombre,
        Cedula: creSolicitud.Cedula,
      });
      const pdfDoc = this.printerService.createPdf(docDefinition);
      const base64 = await this.pdfToBase64(pdfDoc);
      return base64;
     // return this.printerService.createPdf(docDefinition);
    } catch (error) {
      this.logger.error('Error generating DFL Firma Digital report', error.stack);
      throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
    }
  }

  private async  pdfToBase64(pdfDoc: PDFKit.PDFDocument): Promise<string> {
  pdfDoc.end();
  const readableStream = pdfDoc as unknown as Readable;
  const pdfBuffer = await getStream.buffer(readableStream);
  return pdfBuffer.toString('base64');
  }



  private async findCreSolicitud(id: number) {
    const solicitud = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb: id } });
    if (!solicitud) {
      throw new NotFoundException(`Cre Solicitud with id ${id} not found`);
    }
    return solicitud;
  }

  private async findWebSolicitudGrande(id: number) {
    const solicitud = await this.webSolicitudgrandeRepository.findOne({ where: { idCre_SolicitudWeb: id } });
    if (!solicitud) {
      throw new NotFoundException(`Web Solicitud Grande with id ${id} not found`);
    }
    return solicitud;
  }

  private async findVerificacionMaestro(idSolicitud: number, idWeb: number, estado: number | FindOperator<number>) {
    const maestro = await this.creverificacionTelefonicaMaestroRepository.findOne({
      where: {
        idCre_SolicitudWeb: idSolicitud,
        idWeb_SolicitudGrande: idWeb,
        idEstadoOrigenTelefonica: estado,
      },
    });
    if (!maestro) {
      throw new NotFoundException(`Verificación telefónica maestro no encontrada para solicitud ${idSolicitud}`);
    }
    return maestro;
  }

  private async findVerificacionDetalle(idMaestro: number) {
    const detalle = await this.creSolicitudverificaciontelefonicaRepository.findOne({
      where: { idCre_VerificacionTelefonicaMaestro: idMaestro },
      order: { idParentesco: 'ASC' },
    });
    if (!detalle) {
      throw new NotFoundException(`Verificación telefónica detalle no encontrada para maestro ${idMaestro}`);
    }
    return detalle;
  }

  
  private async findCompra(id: number) {
    const compra = await this.compraRepository.findOne({ where: { idCompra: id } });
    if (!compra) {
      throw new NotFoundException(`Compra with id ${id} not found`);
    }
    return compra;
  }

  private async findNomina(id: number) {
	const nomina = await this.nominaRepository.findOne({where: {idPersonal: id}});
	if (!nomina) {
      throw new NotFoundException(`Nomina with id ${id} not found`);
    }
    return nomina;

  }

  async getVerificacionReferencias(orderId: number) {
    return await this.creverificacionTelefonicaMaestroRepository
      .createQueryBuilder('m')
      .innerJoinAndSelect('m.cre_SolicitudVerificacionTelefonica', 'c')
      .where('m.idCre_SolicitudWeb = :orderId', { orderId })
      .andWhere('m.idEstadoOrigenTelefonica = :estadoOrigen', { estadoOrigen: 4 })
      .andWhere('c.idEstadoGestns = :estadoGestion', { estadoGestion: 11 })
      .select([
        'm.Observacion AS observacionMaestro',
        'm.Telefono AS telefonoMaestro',
        'c.idParentesco AS parentesco',
        'c.Fecha AS fechaVerificacion',
        'c.Observaciones AS observacionesDetalle',
      ])
      .getRawMany();
  }

	async getGastosCobranzasReport(id: number) {
		try {
			const creSolicitud = await this.findCreSolicitud(id);

			const docDefinition = GastosCobranzasReport({
				Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
				Cedula: creSolicitud.Cedula,
				Fecha: creSolicitud.Fecha
			});

			return this.printerService.createPdf(docDefinition);

		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}

	async getConsentimientoTratDatos(id: number) {
		try {
			const creSolicitud = await this.findCreSolicitud(id);

			const docDefinition = ConsentimientoTratDatosReport({
				Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
				Cedula: creSolicitud.Cedula,
				Celular: creSolicitud.Celular
			});

			return this.printerService.createPdf(docDefinition);

		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}




	async getPagareALaOrden(id: number) {

		function formatoFechaParaProcedimiento(fechaStr: Date): string {
			const date = new Date(fechaStr);
			const pad = (n: number) => n.toString().padStart(2, '0');

			const year = date.getFullYear();
			const month = pad(date.getMonth() + 1);
			const day = pad(date.getDate());

			return `${year}${month}${day}`;
		}

		try {
			const creSolicitud = await this.findCreSolicitud(id);
			const compra = await this.findCompra(creSolicitud.idCompra)

			const fecha = formatoFechaParaProcedimiento(compra.Fecha)

			const query = `EXEC Cre_RetornaTasasDeInteres @FechaGenera = '${fecha}'`;
			const result = await this.creSolicitudWebRepository.query(query);

			const query2 = `EXEC ReportePagarePrefactura @idCompra = ${creSolicitud.idCompra}`;
			const result2 = await this.creSolicitudWebRepository.query(query2);

			const docDefinition = PagareALaOrdenReport({
				TasaNominal: result[0]?.TasaAnual,
				TasaEfectiva: result[0]?.TasaEfectiva,
				Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
				Cedula: creSolicitud.Cedula,
				Celular: creSolicitud.Celular,
				TasaNominal2: result2[0]?.TasaAnual,
				TasaEfectiva2: result2[0]?.TasaEfectiva,
				Total: result2[0].Total,
				TotalLetras: result2[0].TotalLetras,
				NumCuotas: result2[0].NumCuotas,
				ValorCuotas: result2[0].ValorCuotas,
				Cuotaletras: result2[0].Cuotaletras,
				PrimerPago: result2[0].PrimerPago,
				UltimoPago: result2[0].UltimoPago,
				CiuMesAnio: `En ${result2[0].Ciudad}, a los ${result2[0].Dia} días del mes de ${result2[0].Mes} del ${result2[0].Año}`
			});

			return this.printerService.createPdf(docDefinition);

		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}


	async getActaEntregaDocs(id: number) {
		try {
			const creSolicitud = await this.findCreSolicitud(id);
			const nomina = await this.findNomina(creSolicitud.idVendedor)
			const compra = await this.findCompra(creSolicitud.idCompra)
			

			const docDefinition = actaEntregaDocsReport({
				Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
				Cedula: creSolicitud.Cedula,
				Celular: creSolicitud.Celular,
				nombreVendedor: `${nomina.ApellidoPaterno} ${nomina.ApellidoMaterno} ${nomina.PrimerNombre} ${nomina.SegundoNombre}`,
				CedulaVendedor: nomina.NIdentificacion,
				Fecha: compra.FechaIngreso
			});

			return this.printerService.createPdf(docDefinition);

		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}

	async getCompromisoLugPago(id: number) {
		try {
			const creSolicitud = await this.findCreSolicitud(id);

			const docDefinition = compromisoLugPagReport({
				Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
				Cedula: creSolicitud.Cedula,
			});

			return this.printerService.createPdf(docDefinition);

		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}

	async getDeclaracionCompromisos(id: number) {
		try {
			const creSolicitud = await this.findCreSolicitud(id);

			const docDefinition = declaracionCompromisosReport({
				Nombre: `${creSolicitud.ApellidoPaterno} ${creSolicitud.ApellidoMaterno} ${creSolicitud.PrimerNombre} ${creSolicitud.SegundoNombre}`,
				Cedula: creSolicitud.Cedula,
			});

			return this.printerService.createPdf(docDefinition);

		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}

	async getcompraVentaResDominio() {
		try {
			const docDefinition = compraVentaResDominioReport();
			return this.printerService.createPdf(docDefinition);
		} catch (error) {
			this.logger.error('Error generating DFL Firma Digital report', error.stack);
			throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
		}
	}

}
