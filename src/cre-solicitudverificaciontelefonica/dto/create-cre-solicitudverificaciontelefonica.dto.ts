

import { IsBoolean, IsDate, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCreSolicitudverificaciontelefonicaDto {

    @IsBoolean()
    @IsOptional()
    ClienteGarante: boolean;

    @IsNumber()
    @IsPositive()
    Origen: number;

    @IsNumber()
    @IsPositive() 
    idCre_SolicitudWeb: string;

    @IsDate()
    @Type(() => Date)
    Fecha: Date;

    @IsString()
    @MinLength(9)  
    Telefono: string;

    @IsString()
    @MinLength(5)
    Contacto: string;

    @IsNumber()
    @IsPositive()
    idParentesco: number;

    @IsNumber()
    @IsPositive()
    idEstadoGestns: number;

    @IsString()
    @MaxLength(999)
    @MinLength(10)
    Observaciones: string;

    @IsBoolean()
    Estado: boolean;

    @IsString()
    @MaxLength(100)
    NotasDelSistema: string;

    @IsString()
    @MaxLength(50)
    Usuario: string;

    @IsNumber()
    @IsPositive()
    Indice: number;

    @IsNumber()
    @IsPositive()
    Web: number;

    @IsBoolean()
    Nuevo: boolean;

    @IsNumber()
    @IsPositive()
    idCre_VerificacionTelefonicaMaestro: number;
}
