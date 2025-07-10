import { Module } from '@nestjs/common';
import { join } from 'path';
import { ApiConfig } from './configjoi/api.config';
import { JoinValidationSchema } from './configjoi/joi.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuarios/usuario.module';
import { CiudadanoModule } from './ciudadanos/ciudadano.module';
import { HistoricoModule } from './historico/historico.module';
import { CboGestorCobranzasModule } from './Cbo_Gestor_Cobranzas/cbo-gestor-cobranzas.module';
import { CboGestoresModule } from './cbo-gestores/cbo-gestores.module';
import { CboGestoresEstrategiaModule } from './Cbo_Gestores_Estrategia/Cbo_Gestores_Estrategia.module';
import { BodegaModule } from './Bodega/Bodega.module';
import { Cbo_EstadosGestionModule } from './Cbo_EstadosGestion/Cbo_EstadosGestion.module';
import { Cbo_EstadosTipoContactoModule } from './Cbo_EstadosTipoContacto/Cbo_EstadosTipoContacto.module';
import { Cbo_ResultadoGestionModule } from './Cbo_ResultadoGestion/Cbo_ResultadoGestion.module';
import { DatacognoModule } from './datacogno/datacogno.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CreVerificacionTelefonicaModule } from './cre_verificacion-telefonica/cre_verificacion-telefonica.module';
import { CommonModule } from './common/common.module';
import { CompraencuestaModule } from './compraencuesta/compraencuesta.module';
import { CreActividadeconominaModule } from './cre_actividadeconomina/cre_actividadeconomina.module';
import { CreTiempoModule } from './cre_tiempo/cre_tiempo.module';
import { CreSolicitudWebModule } from './cre_solicitud-web/cre_solicitud-web.module';
import { CognosolicitudcreditoModule } from './cognosolicitudcredito/cognosolicitudcredito.module';
import { AuthModuleCogno } from './cognosolicitudcredito/auth/auth.module';
import { CoordenadasprefacturaModule } from './coordenadasprefactura/coordenadasprefactura.module';
import { AuthModule } from './auth/auth.module';
import { WebSolicitudgrandeModule } from './web_solicitudgrande/web_solicitudgrande.module';
import { CreProvinciaModule } from './cre_provincia/cre_provincia.module';
import { CreCantonModule } from './cre-canton/cre-canton.module';
import { CreParroquiaModule } from './cre_parroquia/cre_parroquia.module';
import { CreBarrioModule } from './cre_barrio/cre_barrio.module';
import { CreTipodocumentoModule } from './cre_tipodocumento/cre_tipodocumento.module';
import { CreSexoModule } from './cre_sexo/cre_sexo.module';
import { CreNiveleducacionModule } from './cre_niveleducacion/cre_niveleducacion.module';
import { CreProfesionModule } from './cre_profesion/cre_profesion.module';
import { CreParentescoModule } from './cre_parentesco/cre_parentesco.module';
import { CreEstadocivilModule } from './cre_estadocivil/cre_estadocivil.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { TipoClienteModule } from './tipo-cliente/tipo-cliente.module';
import { CreTipoempresaModule } from './cre_tipoempresa/cre_tipoempresa.module';
import { CreTipocontratoModule } from './cre_tipocontrato/cre_tipocontrato.module';
import { CreTiposueldoModule } from './cre_tiposueldo/cre_tiposueldo.module';
import { CreCargoModule } from './cre_cargo/cre_cargo.module';
import { RoleswebModule } from './rolesweb/rolesweb.module';
import { UserRolesWebModule } from './user-roles-web/user-roles-web.module';
import { RolePermissionsWebModule } from './role-permissions-web/role-permissions-web.module';
import { RouteswebModule } from './routesweb/routesweb.module';
import { PermissionsWebModule } from './permissions-web/permissions-web.module';
import { SeguridadmenuModule } from './seguridadmenu/seguridadmenu.module';
import { MenuItemRoleModule } from './menu-item-role/menu-item-role.module';
import { UsuarioBodegaModule } from './usuario-bodega/usuario-bodega.module';
import { DetalleTipoClienteModule } from './detalle-tipo-cliente/detalle-tipo-cliente.module';
import { TipoTrabajoModule } from './tipo-trabajo/tipo-trabajo.module';
import { CreTipocalificacionModule } from './cre-tipocalificacion/cre-tipocalificacion.module';
import { CreEstadoModule } from './cre-estado/cre-estado.module';
import { EstadoSolicitudModule } from './estado-solicitud/estado-solicitud.module';
import { CrectaedogestionModule } from './crectaedogestion/crectaedogestion.module';

import { CreNacionalidadModule } from './cre_nacionalidad/cre_nacionalidad.module';
import { CreInmuebleModule } from './cre_inmueble/cre_inmueble.module';
import { CreCiudadinmuebleModule } from './cre_ciudadinmueble/cre_ciudadinmueble.module';
import { CreTipoviviendaModule } from './cre_tipovivienda/cre_tipovivienda.module';
import { CreTiempoviviendaModule } from './cre_tiempovivienda/cre_tiempovivienda.module';

import { NominaModule } from './nomina/nomina.module';
import { OtpcodigoModule } from './otpcodigo/otpcodigo.module';
import { CreverificaciontelefonicaModule } from './creverificaciontelefonica/creverificaciontelefonica.module';
import { EqfxidentificacionconsultadaModule } from './eqfxidentificacionconsultada/eqfxidentificacionconsultada.module';
import { DocumentosSolicitudModule } from './documentos-solicitud/documentos-solicitud.module';
import { CreSolicitudverificaciontelefonicaModule } from './cre-solicitudverificaciontelefonica/cre-solicitudverificaciontelefonica.module';
import { AnalistacreditoModule } from './analistacredito/analistacredito.module';
import { FechaAnalistaModule } from './fecha-analista/fecha-analista.module';
import { HorariosanalistasModule } from './horariosanalistas/horariosanalistas.module';
import { HistorialObservacionesModule } from './historial-observaciones/historial-observaciones.module';
import { CreSituacionlaboralModule } from './cre-situacionlaboral/cre-situacionlaboral.module';
import { CreVerificacionTelefonicaMaestroModule } from './cre_verificacion-telefonica-maestro/cre_verificacion-telefonica-maestro.module';
import { CreReferenciasclienteswebModule } from './cre-referenciasclientesweb/cre-referenciasclientesweb.module';
import { CognotrabajocargoModule } from './cognotrabajocargo/cognotrabajocargo.module';
import { TiemposolicitudeswebModule } from './tiemposolicitudesweb/tiemposolicitudesweb.module';
import { IngresoCobradorModule } from './ingreso-cobrador/ingreso-cobrador.module';
import { ClientesVerificacionTerrenaModule } from './clientes-verificacion-terrena/clientes-verificacion-terrena.module';
import { TerrenaGestionDomicilioModule } from './terrena-gestion-domicilio/terrena-gestion-domicilio.module';
import { TerrenaGestionTrabajoModule } from './terrena-gestion-trabajo/terrena-gestion-trabajo.module';
import { ExecSpModule } from './exec-sp/exec-sp.module';
import { HorariosverificadoresModule } from './horariosverificadores/horariosverificadores.module';
import { VerificadorcreditoModule } from './verificadorcredito/verificadorcredito.module';
import { FechaVerificadorModule } from './fecha-verificador/fecha-verificador.module';

import { ListaNegraCellModule } from './lista-negra-cell/lista-negra-cell.module';
import { ListaNegraEmailModule } from './lista-negra-email/lista-negra-email.module';
import { ListaNegraCedula } from './lista-negra-cedula/entities/lista-negra-cedula.entity';

import { CreSolicitudwebWsModule } from './cre_solicitudweb-ws/cre_solicitudweb-ws.module';
import { ListacuentasdepositosModule } from './listacuentasdepositos/listacuentasdepositos.module';
import { EqfxResultadoSegmentacionModule } from './eqfx-resultado-segmentacion/eqfx-resultado-segmentacion.module';
import { EqfxResultadoPoliticasModule } from './eqfx-resultado-politicas/eqfx-resultado-politicas.module';
import { EqfxScorePuntajeV3Module } from './eqfx-score-puntaje-v3/eqfx-score-puntaje-v3.module';
import { EqfxIndicadoresDeudaModule } from './eqfx-indicadores-deuda/eqfx-indicadores-deuda.module';
import { EqfxIndicadoresDeudaHistoricaModule } from './eqfx-indicadores-deuda-historica/eqfx-indicadores-deuda-historica.module';
import { EqfxDetalleDeudaActModule } from './eqfx-detalle-deuda-act/eqfx-detalle-deuda-act.module';
import { EqfxCalificaDetalleTarjModule } from './eqfx-califica-detalle-tarj/eqfx-califica-detalle-tarj.module';
import { EqfxDetalleOperacionesVencModule } from './eqfx-detalle-operaciones-venc/eqfx-detalle-operaciones-venc.module';
import { EqfxPerfilRiesgoDirecModule } from './eqfx-perfil-riesgo-direc/eqfx-perfil-riesgo-direc.module';
import { EqfxDeudaReportadaInfoModule } from './eqfx-deuda-reportada-info/eqfx-deuda-reportada-info.module';
import { EqfxEvolucionHistDisEndRecursivoModule } from './eqfx-evolucion-hist-dis-end-recursivo/eqfx-evolucion-hist-dis-end-recursivo.module';
import { EqfxDeudaReportadaRfrModule } from './eqfx-deuda-reportada-rfr/eqfx-deuda-reportada-rfr.module';
import { EqfxAnalisisSaldoVencerModule } from './eqfx-analisis-saldo-vencer/eqfx-analisis-saldo-vencer.module';
import { EqfxEvolucionHistDisEndeudamientoModule } from './eqfx-evolucion-hist-dis-endeudamiento/eqfx-evolucion-hist-dis-endeudamiento.module';
import { EqfxCreditosOtorg12UltMesEdModule } from './eqfx-creditos-otorg12-ult-mes-ed/eqfx-creditos-otorg12-ult-mes-ed.module';
import { EqfxInfoPosteriorFechaCorteModule } from './eqfx-info-posterior-fecha-corte/eqfx-info-posterior-fecha-corte.module';
import { EqfxEntidadesConsultadasModule } from './eqfx-entidades-consultadas/eqfx-entidades-consultadas.module';
import { EqfxReporteBuroCreditoModule } from './eqfx-reporte-buro-credito/eqfx-reporte-buro-credito.module';
import { DispositivosAppModule } from './dispositivos-app/dispositivos-app.module';
import { ListaNegraCedulaModule } from './lista-negra-cedula/lista-negra-cedula.module';
import { ComAsignacionDeVendedoresModule } from './com_asignacion-de-vendedores/com_asignacion-de-vendedores.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { InfoSistemaModule } from './info-sistema/info-sistema.module';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';





@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ApiConfig],
      validationSchema: JoinValidationSchema,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProd = process.env.NODE_ENV === 'prod'; // Verifica si estamos en producción

        return {
          type: 'mssql',
          host: configService.get<string>('DATABASE_HOST'),
          port: Number(configService.get<number>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: false, // Asegúrate de que esté en 'false' para producción.
          options: {
            enableArithAbort: true, // Necesario para SQL Server
            trustServerCertificate: true,
            connectionTimeout: Number(configService.get<number>('SQLSERVER_CONNECTION_TIMEOUT')), // Convertir a número
            requestTimeout: Number(configService.get<number>('SQLSERVER_REQUEST_TIMEOUT')),       // Convertir a número
            ssl: isProd, // SSL activado solo en producción
            extra: isProd ? { rejectUnauthorized: false } : undefined, // Solo establecer 'extra' en producción
          },
        };
      },
      inject: [ConfigService],
    }),

    // Módulos adicionales
    UsuarioModule,
    AuthModule,
    CiudadanoModule,
    HistoricoModule,
    CboGestorCobranzasModule,
    CboGestoresModule,
    CboGestoresEstrategiaModule,
    BodegaModule,
    Cbo_EstadosGestionModule,
    Cbo_EstadosTipoContactoModule,
    Cbo_ResultadoGestionModule,
    DatacognoModule,
    CreVerificacionTelefonicaModule,
    CommonModule,
    CompraencuestaModule,
    CreActividadeconominaModule,
    CreTiempoModule,
    CreTipoempresaModule,
    CreTipocontratoModule,
    CreCargoModule,
    CreSolicitudWebModule,
    CognosolicitudcreditoModule,
    AuthModuleCogno,
    CoordenadasprefacturaModule,
    AuthModule,
    WebSolicitudgrandeModule,
    CreProvinciaModule,
    CreCantonModule,
    CreParroquiaModule,
    CreBarrioModule,

    CreTipodocumentoModule,

    CreSexoModule,
    CreNiveleducacionModule,
    CreProfesionModule,
    CreParentescoModule,

    CreEstadocivilModule,
    FileUploadModule,

    TipoClienteModule,

    CreTiposueldoModule,
    RoleswebModule,
    UserRolesWebModule,
    RolePermissionsWebModule,
    RouteswebModule,
    PermissionsWebModule,
    SeguridadmenuModule,
    MenuItemRoleModule,
    UsuarioBodegaModule,
    DetalleTipoClienteModule,
    TipoTrabajoModule,
    CreTipocalificacionModule,
    CreEstadoModule,
    EstadoSolicitudModule,
    CrectaedogestionModule,

    CreNacionalidadModule,
    CreInmuebleModule,
    CreCiudadinmuebleModule,
    CreTipoviviendaModule,
    CreTiempoviviendaModule,

    NominaModule,
    OtpcodigoModule,
    CreverificaciontelefonicaModule,
    EqfxidentificacionconsultadaModule,
    DocumentosSolicitudModule,
    CreSolicitudverificaciontelefonicaModule,
    AnalistacreditoModule,
    FechaAnalistaModule,
    HorariosanalistasModule,
    HistorialObservacionesModule,
    CreSituacionlaboralModule,
    CreVerificacionTelefonicaMaestroModule,
    CreReferenciasclienteswebModule,
    CognotrabajocargoModule,
    TiemposolicitudeswebModule,
    IngresoCobradorModule,
    ClientesVerificacionTerrenaModule,
    TerrenaGestionDomicilioModule,
    TerrenaGestionTrabajoModule,
    ExecSpModule,
    HorariosverificadoresModule,
    VerificadorcreditoModule,
    FechaVerificadorModule,

    ListaNegraCellModule,
    ListaNegraEmailModule,
    ListaNegraCedulaModule,

    CreSolicitudwebWsModule,

    ListacuentasdepositosModule,

    EqfxResultadoSegmentacionModule,

    EqfxResultadoPoliticasModule,

    EqfxScorePuntajeV3Module,

    EqfxIndicadoresDeudaModule,

    EqfxIndicadoresDeudaHistoricaModule,

    EqfxDetalleDeudaActModule,

    EqfxCalificaDetalleTarjModule,

    EqfxDetalleOperacionesVencModule,

    EqfxPerfilRiesgoDirecModule,

    EqfxDeudaReportadaInfoModule,

    EqfxEvolucionHistDisEndRecursivoModule,

    EqfxDeudaReportadaRfrModule,

    EqfxAnalisisSaldoVencerModule,

    EqfxEvolucionHistDisEndeudamientoModule,

    EqfxCreditosOtorg12UltMesEdModule,

    EqfxInfoPosteriorFechaCorteModule,

    EqfxEntidadesConsultadasModule,

    EqfxReporteBuroCreditoModule,

    DispositivosAppModule,

    ComAsignacionDeVendedoresModule,

    EmailModule,

    InfoSistemaModule,

    BasicReportsModule,

    PrinterModule,





  ],
  providers: [EmailService],
})
export class AppModule {}
