import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, In, Repository } from 'typeorm';
import { CreSolicitudWeb } from 'src/cre_solicitud-web/entities/cre_solicitud-web.entity';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { PrinterService } from 'src/printer/printer.service';
import { Cognotrabajocargo } from 'src/cognotrabajocargo/entities/cognotrabajocargo.entity';
import { CreSolicitudverificaciontelefonica } from 'src/cre-solicitudverificaciontelefonica/entities/cre-solicitudverificaciontelefonica.entity';
import { phoneVerificationReport } from 'src/reports';
import { autorizacionDatosReport } from 'src/reports/dflFirmaDigital/autorizaciondatos.report';
import { CreVerificacionTelefonicaMaestro } from 'src/cre_verificacion-telefonica-maestro/entities/cre_verificacion-telefonica-maestro.entity';
import { TiempoSolicitudesWeb } from 'src/tiemposolicitudesweb/entities/tiemposolicitudesweb.entity';

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
    @InjectRepository(TiempoSolicitudesWeb)
    private readonly tiempoSolicitudesWebRepository: Repository<TiempoSolicitudesWeb>,
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
      const docDefinition = autorizacionDatosReport({
        ciudad:  'CIUDAD',
        dia: new Date().getDate().toString(),
        mes: (new Date().getMonth() + 1).toString(),
        anio: new Date().getFullYear().toString(),
        ApellidoPaterno: creSolicitud.ApellidoPaterno,
        ApellidoMaterno: creSolicitud.ApellidoMaterno,
        PrimerNombre: creSolicitud.PrimerNombre,
        SegundoNombre: creSolicitud.SegundoNombre,
        Cedula: creSolicitud.Cedula,
      });
      return this.printerService.createPdf(docDefinition);
    } catch (error) {
      this.logger.error('Error generating DFL Firma Digital report', error.stack);
      throw new InternalServerErrorException(error.message || 'Unexpected error generating DFL Firma Digital report');
    }
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
}
