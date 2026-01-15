import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebSolicitudgrandeService } from './web_solicitudgrande.service';
import { WebSolicitudgrandeController } from './web_solicitudgrande.controller';
import { WebSolicitudgrande } from './entities/web_solicitudgrande.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CupoCreditoModule } from 'src/cupo-credito/cupo-credito.module';
import { MenuItemRoleModule } from 'src/menu-item-role/menu-item-role.module';
@Module({
  controllers: [WebSolicitudgrandeController],
  providers: [WebSolicitudgrandeService],
  imports: [
    TypeOrmModule.forFeature([WebSolicitudgrande] ), 
    AuthModule,
    CupoCreditoModule,
    MenuItemRoleModule,
  ],
  exports: [WebSolicitudgrandeService],

})
export class WebSolicitudgrandeModule { }




