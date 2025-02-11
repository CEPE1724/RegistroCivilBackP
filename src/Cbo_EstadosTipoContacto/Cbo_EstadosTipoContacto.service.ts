import { Injectable } from "@nestjs/common";
import { Cbo_EstadosTipoContactoEntity } from "./Cbo_EstadosTipoContacto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class Cbo_EstadosTipoContactoService {
    constructor(
        @InjectRepository(Cbo_EstadosTipoContactoEntity)
        private readonly repository: Repository<Cbo_EstadosTipoContactoEntity>
    ) {}

    //obtener un registro por id

    async findOne(idCbo_EstadoGestion: number): Promise<Cbo_EstadosTipoContactoEntity> {
        return await this.repository.findOne({ where: { idCbo_EstadoGestion } });
    }

}