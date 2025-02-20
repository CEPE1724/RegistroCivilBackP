import { Module } from '@nestjs/common';
import { CreSolicitudWebService } from './cre_solicitud-web.service';
import { CreSolicitudWebController } from './cre_solicitud-web.controller';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [CreSolicitudWebController],
  providers: [CreSolicitudWebService],
   imports: [
    TypeOrmModule.forFeature([CreSolicitudWeb])
   ]
})
export class CreSolicitudWebModule {}
