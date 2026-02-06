import { Controller, Get, Query, UseGuards, Logger, Post, Body } from '@nestjs/common';
import { CboGestorCobranzasOperativoService } from './cbo-gestor-cobranzas-operativo.service';
import {
    CboGestorCobranzasOperativoFilterDetalleDto, CboGestorCobranzasOperativoFilterDto,
    CboGestorCobranzasOperativoFilterDetalleWebDto, GuardaCbo_GestionesDeCobranzasWebDto,
    TablaAmortizacionFilterDto, TablaAmortizacionValoresFilterDto, CboGestorCobranzasOperativoPorcentajeDto,
    notificacionFilterDto

} from './cbo-gestor-cobranzas-operativo.dto';
import { Auth, GetUser } from '../auth/decorators';
import { get } from 'http';


@Controller('cbo-gestores-cobranzas-operativo')
//@UseGuards(AuthGuard('jwt'))
export class CboGestorCobranzasOperativoController {

    constructor(private readonly cboGestorCobranzasOperativoService: CboGestorCobranzasOperativoService) { }

    @Get()
    @Auth()
    async getGestoresCobranzasOperativo(@Query() filtros: CboGestorCobranzasOperativoFilterDto) {
        return this.cboGestorCobranzasOperativoService.getGestoresCobranzasOperativo(filtros);
    }

    @Get('detalle')
    @Auth()
    async getDetalleGestoresCobranzasOperativo(@Query() filtros: CboGestorCobranzasOperativoFilterDetalleDto) {
        return this.cboGestorCobranzasOperativoService.getDetalleGestoresCobranzasDetalleOperativo(filtros);
    }

    @Get('detalle-web')
    @Auth()
    async getDetalleGestoresCobranzasOperativoWeb(@Query() filtros: CboGestorCobranzasOperativoFilterDetalleWebDto) {
        return this.cboGestorCobranzasOperativoService.getDetalleGestoresCobranzasDetalleOperativoWeb(filtros);
    }

    @Get('exportar')
    @Auth()
    async exportarGestoresCobranzas(@Query() filtros: Omit<CboGestorCobranzasOperativoFilterDto, 'pageNumber' | 'pageSize'>) {
  
        return this.cboGestorCobranzasOperativoService.exportarGestoresCobranzas(filtros);
    }

    @Post('new-insert-data')
    @Auth()
    async guardaCbo_GestionesDeCobranzasWeb(@Body() datos: GuardaCbo_GestionesDeCobranzasWebDto,
        @GetUser() usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean }) {
        return this.cboGestorCobranzasOperativoService.guardaCbo_GestionesDeCobranzasWeb(datos, usuario);
    }


    @Post('tabla-amortizacion')
    @Auth()
    async getTablaAmortizacion(@Body() filtros: TablaAmortizacionFilterDto) {
        return this.cboGestorCobranzasOperativoService.getTablaAmortizacion(filtros.idCompra, filtros.Fecha);
    }

    @Post('tabla-amortizacion-valores')
    @Auth()
    async getTablaAmortizacionValores(@Body() filtros: TablaAmortizacionFilterDto) {
        return this.cboGestorCobranzasOperativoService.getTablaAmortizacionValores(filtros.idCompra, filtros.Fecha);
    }

    @Post('tabla-amortizacion-valores/detalle-pagos')
    @Auth()
    async getTablaAmortizacionValoresDetallePagos(@Body() filtros: TablaAmortizacionValoresFilterDto) {
        return this.cboGestorCobranzasOperativoService.getTablaAmortizacionValoresDetallePagos(filtros.idCre_TablaDeAmortizacion);
    }

    @Get('porcentaje-cobranza')
    @Auth()
    async getPorcentajeCobranzas(@Query() filtros: CboGestorCobranzasOperativoPorcentajeDto,
        @GetUser() usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean }) {
        return this.cboGestorCobranzasOperativoService.getPorcentajeCobranzas(filtros, usuario);
    }

    @Get('notificacion')
    //@Auth()
    async getnotificaciones(@Query() filtros: notificacionFilterDto) {
        return this.cboGestorCobranzasOperativoService.getnotificaciones(filtros.idCompra);
    }

}
