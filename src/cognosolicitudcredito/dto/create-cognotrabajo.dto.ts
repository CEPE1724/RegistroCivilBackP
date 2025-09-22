

import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    IsPositive,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCognoTrabajoDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idCognoSolicitudCredito?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    fechaActualizacion?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    fechaIngreso?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    fechaAfiliacionHasta?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    identificacionPersonaPatrono?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombrePatrono?: string;
    
    @IsString()
    @IsOptional()
    nombreUno?: string;

    @IsString()
    @IsOptional()
    nombreDos?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idTipoIdentificacion?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    descripcion?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    plazoSocial?: Date;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    expediente?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaConstitucion?: Date;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreComercial?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idTipoCompania?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombretipoCompania?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idCanton?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreCanton?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idProvincia?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoArea?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreProvincia?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idPais?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombrePais?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoAreaPais?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoIso2?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoIso3?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    codigoIso?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreSituacionLegal?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    proveedoraEstado?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    pagoRemesas?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    vendeCredito?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    capitalSuscrito?: number;

    @IsNumber()
    @IsOptional()
    capitalAutorizado?: number;

    @IsNumber()
    @IsOptional()
    valorNominal?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    perteneceMv?: string;

    @IsString()
    @IsOptional()
    apellidoUno?: string;
    
    @IsString()
    @IsOptional()
    apellidoDos?: string;

    @IsNumber()
    @IsOptional()
    valor?: number;

    @IsString()
    @IsOptional()
    tipoIngreso?: string;

    @IsString()
    @IsOptional()
    frecuenciaIngreso?: string;

    @IsString()
    @IsOptional()
    valorRango?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idCargo?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombreCargo?: string;

    @IsString()
    @IsOptional()
    tipoAfiliado?: string;

    @IsString()
    @IsOptional()
    telefonoOfi?: string;

    @IsString()
    @IsOptional()
    telefonoAfi?: string;

    @IsString()
    @IsOptional()
    direccionOfi?: string;

    @IsString()
    @IsOptional()
    direccionAfi?: string;

    @IsString()
    @IsOptional()
    celular?: string;

    @IsString()
    @IsOptional()
    baseDate?: string;
}