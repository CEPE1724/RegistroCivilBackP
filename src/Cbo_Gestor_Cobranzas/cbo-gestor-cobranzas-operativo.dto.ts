import { IsOptional, IsNumber, IsInt, Min, Max, IsString, Matches } from 'class-validator';
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

/**
 * DTO de respuesta del SP Cbo_GestorDeCobranzasOperativo
 */
export class CboGestorCobranzasOperativoResponseDto {
    idCbo_GestionesDeCobranzas: number;
    idCompra: number;
    Periodo: string;
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
}

/**
 * DTO de respuesta con paginación
 */
export class CboGestorCobranzasOperativoPaginatedResponseDto {
    data: CboGestorCobranzasOperativoResponseDto[];
    pageNumber: number;
    pageSize: number;
    totalCount?: number;
}
