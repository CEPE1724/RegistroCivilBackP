import { Controller, Get } from "@nestjs/common";
import { Cbo_EstadosGestionService } from "./Cbo_EstadosGestion.service";
import { Cbo_EstadosGestionEntity } from "./Cbo_EstadosGestion.entity";
import { ResponseDto } from "./Cbo_EstadosGestion.dto";

@Controller('api/v1/Cbo_EstadosGestion')
export class Cbo_EstadosGestionController {
    constructor(private readonly service: Cbo_EstadosGestionService) {}

    @Get()
    async findAll(): Promise<ResponseDto<Cbo_EstadosGestionEntity[]>> {
        const data = await this.service.findAll();
        if (!data || data.length === 0) {
            return { statusCode: 400, message: 'No data found', data: [] };
        }
        return { statusCode: 200, message: 'Success', data };
    }
}