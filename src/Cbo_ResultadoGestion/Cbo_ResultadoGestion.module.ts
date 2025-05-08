import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cbo_ResultadoGestionEntity } from "./Cbo_ResultadoGestion.entity";
import { Cbo_ResultadoGestionService } from "./Cbo_ResultadoGestion.service";
import { Cbo_ResultadoGestionController } from "./Cbo_ResultadoGestion.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cbo_ResultadoGestionEntity]) , AuthModule],
    providers: [Cbo_ResultadoGestionService],
    exports: [Cbo_ResultadoGestionService],
    controllers: [Cbo_ResultadoGestionController],
})

export class Cbo_ResultadoGestionModule {}