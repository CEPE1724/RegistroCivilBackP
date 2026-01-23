import { Controller, Get, Query, UseGuards, Logger } from '@nestjs/common';
import { CboGestorCobranzasOperativoService } from './cbo-gestor-cobranzas-operativo.service';
import { CboGestorCobranzasOperativoFilterDto } from './cbo-gestor-cobranzas-operativo.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('cbo-gestores-cobranzas-operativo')
//@UseGuards(AuthGuard('jwt'))
export class CboGestorCobranzasOperativoController {
    private readonly logger = new Logger(CboGestorCobranzasOperativoController.name);

    constructor(private readonly cboGestorCobranzasOperativoService: CboGestorCobranzasOperativoService) {}

    @Get()
    async getGestoresCobranzasOperativo(@Query() filtros: CboGestorCobranzasOperativoFilterDto) {
        this.logger.log(`📥 Solicitud de gestores de cobranzas con filtros: ${JSON.stringify(filtros)}`);
        return this.cboGestorCobranzasOperativoService.getGestoresCobranzasOperativo(filtros);
    }

    @Get('exportar')
    async exportarGestoresCobranzas(@Query() filtros: Omit<CboGestorCobranzasOperativoFilterDto, 'pageNumber' | 'pageSize'>) {
        this.logger.log(`📤 Solicitud de exportación con filtros: ${JSON.stringify(filtros)}`);
        return this.cboGestorCobranzasOperativoService.exportarGestoresCobranzas(filtros);
    }
}
