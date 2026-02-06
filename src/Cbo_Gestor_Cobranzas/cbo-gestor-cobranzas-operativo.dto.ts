import { IsOptional, IsNumber, IsInt, Min, Max, IsString, Matches, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para filtros del SP Cbo_GestorDeCobranzasOperativo
 */
export class CboGestorCobranzasOperativoFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    desdeDiasMora?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    hastaDiasMora?: number = 100000;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(2)
    cobradorOperador?: number = 0; // 0: TODOS, 1: OPERADOR, 2: COBRADOR

    @IsOptional()
    @IsString()
    idOperadorCobrador?: string = '';

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(2)
    gestionados?: number = 0; // 0: TODOS, 1: CON GESTION, 2: SIN GESTION

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    idCbo_ResultadoGestion?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    idGestores?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    GestionHoy?: number = 0;

    @IsOptional()
    @IsString()
    Filtro?: string = '';

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    pageNumber?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    pageSize?: number = 50;

    @IsOptional()
    @IsString()
    ordenarPor?: string = 'Dias_Mora_Proyectado';

    @IsOptional()
    @IsString()
    @Matches(/^(ASC|DESC)$/)
    direccion?: string = 'DESC';


}
export class TablaAmortizacionFilterDto {

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    idCompra?: number = 0;

    @IsOptional()
    @Type(() => Date)
    Fecha?: Date = new Date();
}

export class notificacionFilterDto {

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    idCompra: number = 0;



 
}

export class TablaAmortizacionValoresFilterDto {

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    idCre_TablaDeAmortizacion?: number = 0;

 
}

export class GuardaCbo_GestionesDeCobranzasWebDto {
    @IsNumber()
    idCompra: number;

    @IsNumber()
    idCbo_EstadoGestion: number;
    
    @IsNumber()
    idCbo_EstadosTipocontacto?: number = 0;

    @IsNumber()
    idCbo_ResultadoGestion: number;

    @IsString()
    Notas: string;

    @IsString()
    telefono: string;
    /* @FechaPago DateTime = '2000-01-01 00:00:00.000', */
    @IsOptional()
    @Type(() => Date)
    FechaPago?: Date = new Date('2000-01-01T00:00:00Z');
    

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    Valor?: number = 0;

}

/**
 * DTO de respuesta del SP Cbo_GestorDeCobranzasOperativo
 */
export class CboGestorCobranzasOperativoResponseDto {
    idCbo_GestorDeCobranzas: number;
    idCbo_GestionesDeCobranzas: number;
    idCompra: number;
    Periodo: string;
    Riesgo: string;
    Operador: string; // Nombre del operador
    Cobrador: string; // Nombre del cobrador
    Fecha_Ultima_Gestion: Date;
    Estado: string; // Estado de gestión
    Resultado: string; // Resultado de gestión
    Almacen: string;
    Fecha_Factura: Date;
    DiaPago: number;
    Numero_Documento: string;
    Cedula: string;
    Banco: string;
    Cliente: string;
    Celular: string;
    Dias_Mora_Actual: number;
    Dias_Mora_Proyectado: number;
    Valor_Cobrar_Proyectado: number;
    Valor_Cobrado: number;
    Valor_Cobrado_Total: number;
    sCre_SolicitudWeb: string;
    Gestor: string;
    Fecha_Gestion: Date;
}

/**
 * DTO de respuesta con paginación
 */
export class CboGestorCobranzasOperativoPaginatedResponseDto {
    data: CboGestorCobranzasOperativoResponseDto[];
    pageNumber: number;
    pageSize: number;
    totalCount?: number;
    totalPages?: number;
}

/*idCre_TablaDeAmortizacion	idCompra	idAnticipo	NumeroCuota	Inicia	Vence	ValorCuota	InteresTotal	Interes	ABInteres	CapitalTotal	Capital	ABCapital	Gastos	DsctoGastos	Mora	DsctoIntMora	TotalDiferimiento	Diferimiento	Saldo	Abono	Retraso	Estado	R
1629700	861324	494606	3	2019-11-16 00:00:00.000	2019-12-15 00:00:00.000	92.220000	17.670000	0.000000	17.670000	74.550000	0.000000	74.550000	0.000000	0	0.00	0	0.00	0.00	0.000000	92.220000	-24	2	 */

export class TablaDeAmortizacionResponseDto {
    idCre_TablaDeAmortizacion: number
    idCompra: number
    idAnticipo: number
    NumeroCuota: number
    Inicia: Date
    Vence: Date
    ValorCuota: number
    InteresTotal: number
    Interes: number
    ABInteres: number
    CapitalTotal: number
    Capital: number
    ABCapital: number
    Gastos: number
    DsctoGastos: number
    Mora: number
    DsctoIntMora: number
    TotalDiferimiento: number
    Diferimiento: number
    Saldo: number
    Abono: number
    Retraso: number
    Estado: number
}

export class CboGestorCobranzasOperativoFilterDetalleDto {
   
    @IsOptional()
    @IsString()
    ScRE_SOLIICTUDwEB?: string = null;
}

export class CboGestorCobranzasOperativoPorcentajeDto {
   
    @IsOptional()
    @IsUUID()
    ScRE_SOLIICTUDwEB: string = null;
}
export class CboGestorCobranzasOperativoFilterDetalleWebDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    idCompra?: number = 1;

 
}

export class CboGestorCobranzasOperativoPorcentajeResponseDto {
    TotalCobrado: number;
    TotalProyectado: number;
    PorcentajeCobrado: number;
}

/*TelefonoDomicilio	TelefonoDomiliarDos	Celular	CallePrincipal	CalleSecundaria	NumeroCasa	ReferenciaUbicacion	Latitud	Longitud
		0959595083	17 DE SEPTIEMBRE 	la dolorosa	mdjds	al frente de la cnacha azul	-0.209904	-78.500602*/
export class CboGestorCobranzasOperativoDetalleResponseDto {
    TelefonoDomicilio: string;
    TelefonoDomiliarDos: string;
    Celular: string;
    CallePrincipal: string;
    CalleSecundaria: string;
    NumeroCasa: string;
    ReferenciaUbicacion: string;
    Latitud: string;
    Longitud: string;
    provincia: string;
    canton: string;
    parroquia: string;
    barrio: string;
}
/*idCompra	Tipo	idCbo_GestionesDeCobranzas	Fecha	Operador_Cobrador	Estado	Tipo Contrato	Resultado	FechaPago	Valor	ESTADO_PAGO	Nombre	Usuario	Notas	Cliente	Direccion	Telefono	DireccionUrlWSP	Email
1367168	VENDEDOR	2854496	2024-07-18 18:23:05.000	NULL	GESTION TELEFONICA	DIRECTO	COMPROMISO DE PAGO	2024-07-18 00:00:00.000	109.00	ESPERA	NULL	GRCAJA	CLIENTE SE COMPROMETE EN HACERCAR A CANCELAR EL DIA SABADO 20-07-2024	GARCIA SILVA BYRON NOE		0989121254		*/
export class CboGestorCobranzasOperativoDetalleWebResponseDto {
    idCompra: number;
    Tipo: string;
    idCbo_GestionesDeCobranzas: number;
    Fecha: Date;
    Operador_Cobrador: string;
    Estado: string;
    Tipo_Contrato: string;
    Resultado: string;
    FechaPago: Date;
    Valor: number;
    ESTADO_PAGO: string;
    Nombre: string;
    Usuario: string;
    Notas: string;
    Cliente: string;
    Direccion: string;
    Telefono: string;
    DireccionUrlWSP: string;
    Email: string;
}