import { Controller, Get, Query } from "@nestjs/common";
import { Cbo_ResultadoGestionService } from "./Cbo_ResultadoGestion.service";
import { Cbo_ResultadoGestionEntity } from "./Cbo_ResultadoGestion.entity";
import { ResponseDto } from "./Cbo_ResultadoGestion.dto";
import { Param } from "@nestjs/common";
import { query } from "express";

@Controller('api/v1/Cbo_ResultadoGestion')
export class Cbo_ResultadoGestionController {
    constructor(private readonly service: Cbo_ResultadoGestionService) {}

    @Get() 
    async find(@Query('idCbo_EstadosTipocontacto') idCbo_EstadosTipocontacto: number): Promise<any> {
        console.log('idCbo_EstadosTipocontacto', idCbo_EstadosTipocontacto);
        if (!idCbo_EstadosTipocontacto) {
            return { statusCode: 400, message: 'Bad Request', data: null };
        }
        const data = await this.service.find(idCbo_EstadosTipocontacto); 
        if (!data) {
            return { statusCode: 400, message: 'No data found', data: null };
        }
        return { statusCode: 200, message: 'Success', data };
    }
}