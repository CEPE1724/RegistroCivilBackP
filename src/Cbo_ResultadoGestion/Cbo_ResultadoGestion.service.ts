import { Injectable } from "@nestjs/common";
import { Cbo_ResultadoGestionEntity } from "./Cbo_ResultadoGestion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable() 
export class Cbo_ResultadoGestionService {
    constructor(
        @InjectRepository(Cbo_ResultadoGestionEntity)
        private readonly repository: Repository<Cbo_ResultadoGestionEntity>
    ) {}

    //obtener un registro por id

    async find(idCbo_EstadosTipocontacto: number): Promise<Cbo_ResultadoGestionEntity[]> {
        return this.repository.find({ where: { idCbo_EstadosTipocontacto } });
    }

}

