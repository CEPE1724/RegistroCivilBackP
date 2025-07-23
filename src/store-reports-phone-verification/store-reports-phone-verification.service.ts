import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreSolicitudWeb } from 'src/cre_solicitud-web/entities/cre_solicitud-web.entity';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { PrinterService } from 'src/printer/printer.service';
import { Cognotrabajocargo } from 'src/cognotrabajocargo/entities/cognotrabajocargo.entity';
import { CreSolicitudverificaciontelefonica } from 'src/cre-solicitudverificaciontelefonica/entities/cre-solicitudverificaciontelefonica.entity';
import { phoneVerificationReport } from 'src/reports';
import { CreVerificacionTelefonicaMaestro } from 'src/cre_verificacion-telefonica-maestro/entities/cre_verificacion-telefonica-maestro.entity';
import { TiempoSolicitudesWeb } from 'src/tiemposolicitudesweb/entities/tiemposolicitudesweb.entity';
@Injectable()
export class StoreReportsPhoneVerificationService {
    private readonly logger = new Logger('StoreReportsPhoneVerificationService');
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
        this.logger.log(`Generating Cre Solicitud Report for orderId: ${orderId}`);

        const creSolicitud = await this.creSolicitudWebRepository.findOne({
            where: { idCre_SolicitudWeb: orderId }
        });

        if (!creSolicitud) {
            this.logger.error(`Cre Solicitud with id ${orderId} not found`);
            throw new Error(`Cre Solicitud with id ${orderId} not found`);
        }

        const webSolicitudGrande = await this.webSolicitudgrandeRepository.findOne({
            where: {
                idCre_SolicitudWeb: creSolicitud.idCre_SolicitudWeb
            },

        });

        if (!webSolicitudGrande) {
            this.logger.error(`Web Solicitud Grande with id ${creSolicitud.idCre_SolicitudWeb} not found`);
            throw new Error(`Web Solicitud Grande with id ${creSolicitud.idCre_SolicitudWeb} not found`);
        }

        let cognoTrabajoCargo = null;
        if (creSolicitud.bAfiliado) {
            cognoTrabajoCargo = await this.cognoTrabajoCargoRepository.findOne({
                where: { idCargo: webSolicitudGrande.idCargo }
            });
        }

        const cre_verificacionTelefonicaMaestro = await this.creverificacionTelefonicaMaestroRepository.findOne({
            where: {
                idCre_SolicitudWeb: creSolicitud.idCre_SolicitudWeb,
                idWeb_SolicitudGrande: webSolicitudGrande.idWeb_SolicitudGrande,
                idEstadoOrigenTelefonica: 3
            }
        });

        if (!cre_verificacionTelefonicaMaestro) {
            this.logger.error(`Cre Verificacion Telefonica Maestro with id ${creSolicitud.idCre_SolicitudWeb} not found`);
            throw new Error(`Cre Verificacion Telefonica Maestro with id ${creSolicitud.idCre_SolicitudWeb} not found`);
        }

        const informeTitular = await this.creSolicitudverificaciontelefonicaRepository.findOne({
            where: { idCre_VerificacionTelefonicaMaestro: cre_verificacionTelefonicaMaestro.idCre_VerificacionTelefonicaMaestro }
        });

        if (!informeTitular) {
            this.logger.error(`Cre Solicitud Verificacion Telefonica with id ${cre_verificacionTelefonicaMaestro.idCre_VerificacionTelefonicaMaestro} not found`);
            throw new Error(`Cre Solicitud Verificacion Telefonica with id ${cre_verificacionTelefonicaMaestro.idCre_VerificacionTelefonicaMaestro} not found`);
        }

        const cre_verificacionTelefonicaMaestroFamiliares = await this.creverificacionTelefonicaMaestroRepository.findOne({
            where: {
                idCre_SolicitudWeb: creSolicitud.idCre_SolicitudWeb,
                idWeb_SolicitudGrande: webSolicitudGrande.idWeb_SolicitudGrande,
                idEstadoOrigenTelefonica: 8
            }
        });

        if (!cre_verificacionTelefonicaMaestroFamiliares) {
            this.logger.error(`Cre Verificacion Telefonica Maestro for family with id ${creSolicitud.idCre_SolicitudWeb} not found`);
            throw new Error(`Cre Verificacion Telefonica Maestro for family with id ${creSolicitud.idCre_SolicitudWeb} not found`);
        }

        const informeFamiliares = await this.creSolicitudverificaciontelefonicaRepository.findOne({
            where: { idCre_VerificacionTelefonicaMaestro: cre_verificacionTelefonicaMaestroFamiliares.idCre_VerificacionTelefonicaMaestro },
            order: {
                idParentesco: 'ASC',
            },
        });

        const referencias = await this.getVerificacionReferencias(creSolicitud.idCre_SolicitudWeb);
        if (!referencias || referencias.length === 0) {
            this.logger.warn(`No references found for Cre Solicitud with id ${creSolicitud.idCre_SolicitudWeb}`);
        } else {
            this.logger.log(`Found ${referencias.length} references for Cre Solicitud with id ${creSolicitud.idCre_SolicitudWeb}`);
        }

        
       const Analista = await this.tiempoSolicitudesWebRepository.findOne({
            where: { idCre_SolicitudWeb: creSolicitud.idCre_SolicitudWeb,
                    Tipo: 2,
                    idEstadoVerificacionDocumental: 3
            }
        });

        if (!Analista) {
            this.logger.error(`Analista not found for Cre Solicitud with id ${creSolicitud.idCre_SolicitudWeb}`);
            throw new Error(`Analista not found for Cre Solicitud with id ${creSolicitud.idCre_SolicitudWeb}`);
        }


                    

        const docDefinition = phoneVerificationReport({
            title: 'INFORME DE VERIFICACION TELEFONICA',
            subtitle: 'Details of the Cre Solicitud',
            /*ApellidoPaterno	ApellidoMaterno	PrimerNombre	SegundoNombre*/
            data: {
                Nombre: creSolicitud.ApellidoPaterno + ' ' + creSolicitud.ApellidoMaterno + ' ' + creSolicitud.PrimerNombre + ' ' + creSolicitud.SegundoNombre,
                Cedula: creSolicitud.Cedula,
                Celular: creSolicitud.Celular,
                Fecha: creSolicitud.Fecha,
                Afiliacion: creSolicitud.bAfiliado ? 'SI' : 'NO',
                Direccion: webSolicitudGrande.CallePrincipal + ' ' + webSolicitudGrande.NumeroCasa + ' ' + webSolicitudGrande.CalleSecundaria,
                ReferenciaUbicacion: webSolicitudGrande.ReferenciaUbicacion,
                EmpresaTrabaja: creSolicitud.bAfiliado ? webSolicitudGrande.NombreEmpresa : webSolicitudGrande.NombreNegocio,
                Cargo: cognoTrabajoCargo ? cognoTrabajoCargo.NombreCargo : 'S/N',
                Ingresos: creSolicitud.bAfiliado ? webSolicitudGrande.IngresosTrabajo : webSolicitudGrande.IngresosNegosio,
                TelefonoTitular: cre_verificacionTelefonicaMaestro.Telefono,
                InformeTitular: informeTitular.Observaciones,

                FechaVeriTitular: informeTitular.Fecha,
                TelefonoNegocio: cre_verificacionTelefonicaMaestroFamiliares.Telefono,
                ContactoNegocio: informeFamiliares.Contacto,
                cargoNegocio: informeFamiliares.idParentesco,
                InformeNegocio: informeFamiliares.Observaciones,
                CargoFamiliares: informeFamiliares.idParentesco,
                AnalistaAprueba: Analista.Usuario,
            },
            referencias: referencias,


        });



        const doc = this.printerService.createPdf(docDefinition);

        return doc;
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
                'c.Observaciones AS observacionesDetalle'
            ])
            .getRawMany();
    }


}
