import { Injectable } from "@nestjs/common";
import { Cbo_EstadosGestionEntity } from "./Cbo_EstadosGestion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class Cbo_EstadosGestionService {
    constructor(
        @InjectRepository(Cbo_EstadosGestionEntity)
        private readonly repository: Repository<Cbo_EstadosGestionEntity>
    ) {}

//obtener todos los registros

    async findAll(): Promise<Cbo_EstadosGestionEntity[]> {
        return await this.repository.find(
            {
                where: { Activo: true },
            }
        );
    }
}