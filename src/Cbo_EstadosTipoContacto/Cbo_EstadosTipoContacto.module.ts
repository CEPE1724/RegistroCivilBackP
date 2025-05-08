import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cbo_EstadosTipoContactoEntity } from "./Cbo_EstadosTipoContacto.entity";
import { Cbo_EstadosTipoContactoService } from "./Cbo_EstadosTipoContacto.service";
import { Cbo_EstadosTipoContactoController } from "./Cbo_EstadosTipoContacto.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cbo_EstadosTipoContactoEntity]) , AuthModule],
    providers: [Cbo_EstadosTipoContactoService],
    exports: [Cbo_EstadosTipoContactoService],
    controllers: [Cbo_EstadosTipoContactoController],
})

export class Cbo_EstadosTipoContactoModule {}