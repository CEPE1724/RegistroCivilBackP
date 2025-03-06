import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebSolicitudgrandeService } from './web_solicitudgrande.service';
import { WebSolicitudgrandeController } from './web_solicitudgrande.controller';
import { WebSolicitudgrande } from './entities/web_solicitudgrande.entity';
@Module({
  controllers: [WebSolicitudgrandeController],
  providers: [WebSolicitudgrandeService],
  imports: [
    TypeOrmModule.forFeature([WebSolicitudgrande])
  ]

})
export class WebSolicitudgrandeModule { }




