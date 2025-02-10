import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { CiudadanoModule } from './ciudadanos/ciudadano.module';
import { HistoricoModule } from './historico/historico.module';
import { CboGestorCobranzasModule } from './Cbo_Gestor_Cobranzas/cbo-gestor-cobranzas.module';
import { CboGestoresModule } from './cbo-gestores/cbo-gestores.module';
import { CboGestoresEstrategiaModule } from './Cbo_Gestores_Estrategia/Cbo_Gestores_Estrategia.module';
import {BodegaModule} from './Bodega/Bodega.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<number>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: false, // Asegúrate de que está en 'false' para producción.
        options: {
          enableArithAbort: true, // Necesario para SQL Server
          trustServerCertificate: true,
          connectionTimeout: Number(configService.get<number>('SQLSERVER_CONNECTION_TIMEOUT')), // Convertir a número
          requestTimeout: Number(configService.get<number>('SQLSERVER_REQUEST_TIMEOUT')),       // Convertir a número
        },
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    AuthModule,
    CiudadanoModule,
    HistoricoModule,
    CboGestorCobranzasModule,
    CboGestoresModule,
    CboGestoresEstrategiaModule,
    BodegaModule
  ],
})
export class AppModule {}
