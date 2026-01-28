import { Controller, Get, Query, UseGuards, Logger, Post, Body } from '@nestjs/common';
import { CboGestorCobranzasOperativoService } from './cbo-gestor-cobranzas-operativo.service';
import { CboGestorCobranzasOperativoFilterDetalleDto, CboGestorCobranzasOperativoFilterDto,
        CboGestorCobranzasOperativoFilterDetalleWebDto, GuardaCbo_GestionesDeCobranzasWebDto,
        TablaAmortizacionFilterDto, TablaAmortizacionValoresFilterDto, CboGestorCobranzasOperativoPorcentajeDto,
        notificacionFilterDto

 } from './cbo-gestor-cobranzas-operativo.dto';
import { Auth, GetUser } from '../auth/decorators';
import { get } from 'http';


@Controller('cbo-gestores-cobranzas-operativo')
//@UseGuards(AuthGuard('jwt'))
export class CboGestorCobranzasOperativoController {
    private readonly logger = new Logger(CboGestorCobranzasOperativoController.name);

    constructor(private readonly cboGestorCobranzasOperativoService: CboGestorCobranzasOperativoService) {}

    @Get()
    @Auth()
    async getGestoresCobranzasOperativo(@Query() filtros: CboGestorCobranzasOperativoFilterDto) {
        this.logger.log(`📥 Solicitud de gestores de cobranzas 1 con filtros: ${JSON.stringify(filtros)}`);
        return this.cboGestorCobranzasOperativoService.getGestoresCobranzasOperativo(filtros);
    }

    @Get('detalle')
    @Auth()
    async getDetalleGestoresCobranzasOperativo(@Query() filtros: CboGestorCobranzasOperativoFilterDetalleDto) {
        this.logger.log(`📥 Solicitud de detalle de gestores de cobranzas 2 con filtros: ${JSON.stringify(filtros)}`);
        return this.cboGestorCobranzasOperativoService.getDetalleGestoresCobranzasDetalleOperativo(filtros);
    }

    @Get('detalle-web')
    @Auth()
    async getDetalleGestoresCobranzasOperativoWeb(@Query() filtros: CboGestorCobranzasOperativoFilterDetalleWebDto) {
        this.logger.log(`📥 Solicitud de detalle web de gestores de cobranzas 3 con filtros: ${JSON.stringify(filtros)}`);
        return this.cboGestorCobranzasOperativoService.getDetalleGestoresCobranzasDetalleOperativoWeb(filtros);
    }

    @Get('exportar')
    @Auth()
    async exportarGestoresCobranzas(@Query() filtros: Omit<CboGestorCobranzasOperativoFilterDto, 'pageNumber' | 'pageSize'>) {
        this.logger.log(`📤 Solicitud de exportación con filtros: ${JSON.stringify(filtros)}`);
        return this.cboGestorCobranzasOperativoService.exportarGestoresCobranzas(filtros);
    }

    @Post('new-insert-data')
    @Auth()
    async guardaCbo_GestionesDeCobranzasWeb(@Body() datos: GuardaCbo_GestionesDeCobranzasWebDto,
    @GetUser() usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean }) {
        this.logger.log(`📥 Solicitud de inserción de gestión de cobranza web con datos: ${JSON.stringify(datos)}`);
        return this.cboGestorCobranzasOperativoService.guardaCbo_GestionesDeCobranzasWeb(datos, usuario);
    }


    @Post('tabla-amortizacion')
    @Auth()
    async getTablaAmortizacion(@Body() filtros: TablaAmortizacionFilterDto) {
        this.logger.log(`📥 Solicitud de tabla de amortización para idCompra: ${filtros.idCompra} y Fecha: ${filtros.Fecha}`);
        return this.cboGestorCobranzasOperativoService.getTablaAmortizacion(filtros.idCompra, filtros.Fecha);
    }

     @Post('tabla-amortizacion-valores')
    @Auth()
    async getTablaAmortizacionValores(@Body() filtros: TablaAmortizacionFilterDto) {
        this.logger.log(`📥 Solicitud de tabla de amortización para idCompra: ${filtros.idCompra} y Fecha: ${filtros.Fecha}`);
        return this.cboGestorCobranzasOperativoService.getTablaAmortizacionValores(filtros.idCompra, filtros.Fecha);
    }

    @Post('tabla-amortizacion-valores/detalle-pagos')
    @Auth()
    async getTablaAmortizacionValoresDetallePagos(@Body() filtros: TablaAmortizacionValoresFilterDto) {
        this.logger.log(`📥 Solicitud de detalle de pagos para idCompra: ${filtros.idCre_TablaDeAmortizacion}`);
        return this.cboGestorCobranzasOperativoService.getTablaAmortizacionValoresDetallePagos(filtros.idCre_TablaDeAmortizacion);
    }

    @Get('porcentaje-cobranza')
    @Auth()
    async getPorcentajeCobranzas(@Query() filtros: CboGestorCobranzasOperativoPorcentajeDto,
    @GetUser() usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean } ) {
        this.logger.log(`📥 Solicitud de porcentaje de cobranza para solicitud web: ${filtros.ScRE_SOLIICTUDwEB}`);
        return this.cboGestorCobranzasOperativoService.getPorcentajeCobranzas(filtros, usuario);
    }

    @Get('notificacion')
    @Auth()
    async getnotificaciones(@Query() filtros: notificacionFilterDto) {
        this.logger.log(`📥 Solicitud de notificaciones para idCompra: ${filtros.idCompra} `);
        return this.cboGestorCobranzasOperativoService.getnotificaciones(filtros.idCompra);
    }

}
