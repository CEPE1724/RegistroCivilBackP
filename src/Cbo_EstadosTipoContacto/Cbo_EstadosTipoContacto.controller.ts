import { Controller, Get, Query } from "@nestjs/common";
import { Cbo_EstadosTipoContactoService } from "./Cbo_EstadosTipoContacto.service";
import { Cbo_EstadosTipoContactoEntity } from "./Cbo_EstadosTipoContacto.entity";
import { ResponseDto } from "./Cbo_EstadosTipoContacto.dto";
import { Param } from "@nestjs/common";

@Controller('api/v1/Cbo_EstadosTipoContacto')
export class Cbo_EstadosTipoContactoController {
    constructor(private readonly service: Cbo_EstadosTipoContactoService) {}

    @Get()
    async find(@Query('idCbo_EstadoGestion') idCbo_EstadoGestion: number): Promise<ResponseDto<any>> {
        const data = await this.service.find(idCbo_EstadoGestion);
        if (!data) {
            return { statusCode: 400, message: 'No data found', data: null };
        }
        return { statusCode: 200, message: 'Success', data };
    }
}