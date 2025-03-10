import { Module } from '@nestjs/common';
import { join } from 'path';
import { ApiConfig } from './configjoi/api.config';
import { JoinValidationSchema } from './configjoi/joi.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
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
import { AuthsModule } from './auths/auths.module';
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
import { CreNacionalidadModule } from './cre_nacionalidad/cre_nacionalidad.module';
import { CreInmuebleModule } from './cre_inmueble/cre_inmueble.module';
import { CreCiudadinmuebleModule } from './cre_ciudadinmueble/cre_ciudadinmueble.module';
import { CreTipoviviendaModule } from './cre_tipovivienda/cre_tipovivienda.module';
import { CreTiempoviviendaModule } from './cre_tiempovivienda/cre_tiempovivienda.module';


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
    AuthsModule,
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
    CreNacionalidadModule,
    CreInmuebleModule,
    CreCiudadinmuebleModule,
    CreTipoviviendaModule,
    CreTiempoviviendaModule,



  ],
})
export class AppModule {}
