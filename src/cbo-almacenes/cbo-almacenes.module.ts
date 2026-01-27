import { Module } from '@nestjs/common';
import { CboAlmacenesService } from './cbo-almacenes.service';
import { CboAlmacenesController } from './cbo-almacenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboAlmacenes } from './entities/cbo-almacene.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BodegaModule } from 'src/Bodega/Bodega.module';
import {CboRiesgoestado} from 'src/cbo-riesgo/entities/cbo-riesgo.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CboAlmacenes, CboRiesgoestado]), AuthModule, BodegaModule,],
  controllers: [CboAlmacenesController],
  providers: [CboAlmacenesService],
})
export class CboAlmacenesModule {}
