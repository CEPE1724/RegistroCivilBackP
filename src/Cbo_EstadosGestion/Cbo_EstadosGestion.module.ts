import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cbo_EstadosGestionEntity } from "./Cbo_EstadosGestion.entity";
import { Cbo_EstadosGestionService } from "./Cbo_EstadosGestion.service";
import { Cbo_EstadosGestionController } from "./Cbo_EstadosGestion.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cbo_EstadosGestionEntity]) ,AuthModule ],
    providers: [Cbo_EstadosGestionService],
    exports: [Cbo_EstadosGestionService],
    controllers: [Cbo_EstadosGestionController],
})

export class Cbo_EstadosGestionModule {}