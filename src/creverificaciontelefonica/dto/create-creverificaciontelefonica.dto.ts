/*
CREATE TABLE [dbo].[Cre_VerificacionTelefonica](
	[idCre_VerificacionTelefonica] [int] IDENTITY(1,1) NOT NULL,
	[ClienteGarante] [bit] NULL,
	[Origen] [int] NULL,
	[idCre_Solicitud] [int] NULL,
	[Fecha] [datetime] NULL,
	[Telefono] [varchar](20) NULL,
	[Contacto] [varchar](100) NULL,
	[idParentesco] [int] NULL,
	[idEstadoGestns] [int] NULL,
	[Observaciones] [varchar](1000) NULL,
	[Estado] [bit] NULL,
	[NotasDelSistema] [varchar](100) NULL,
	[Usuario] [varchar](50) NULL,
	[Indice] [int] NULL,
	[Web] [int] NULL,*/

import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive,
    Max,
    MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCreverificaciontelefonicaDto {

    @IsBoolean()
    @IsOptional()
    ClienteGarante: boolean;

    @IsNumber()
    @IsPositive()
    Origen: number;

    @IsNumber()
    @IsPositive()
    idCre_Solicitud: number;

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
    @MaxLength(99)
    NotasDelSistema: string;

    @IsString()
    @MaxLength(49)
    Usuario: string;

    @IsNumber()
    @IsPositive()
    Indice: number;

    @IsNumber()
    @IsPositive()
    Web: number;

}