import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { PrinterModule } from 'src/printer/printer.module';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { CreReferenciasclientesweb } from 'src/cre-referenciasclientesweb/entities/cre-referenciasclientesweb.entity'
import { CreNacionalidad } from 'src/cre_nacionalidad/entities/cre_nacionalidad.entity'
import { Bodega } from 'src/Bodega/Bodega.entity'
import { CreProvincia } from 'src/cre_provincia/entities/cre_provincia.entity'
import { CreCanton } from 'src/cre-canton/entities/cre-canton.entity'
import { CreActividadeconomina } from 'src/cre_actividadeconomina/entities/cre_actividadeconomina.entity'
import { CreParroquia } from 'src/cre_parroquia/entities/cre_parroquia.entity'
import { CreBarrio } from 'src/cre_barrio/entities/cre_barrio.entity'
import { CreProfesion } from 'src/cre_profesion/entities/cre_profesion.entity'
import { Compra } from '../compra/entities/compra.entity'


@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  exports: [BasicReportsService],
  imports: [
    TypeOrmModule.forFeature([Nomina, WebSolicitudgrande, CreReferenciasclientesweb, CreNacionalidad, Bodega, CreProvincia, CreCanton, CreActividadeconomina, CreParroquia, CreBarrio, CreProfesion, Compra]),
    PrinterModule
  ],
})
export class BasicReportsModule {}
