/*
CREATE TABLE [dbo].[Cre_SolicitudVerificacionTelefonica](
    [idCre_SolicitudVerificacionTelefonica] [int] IDENTITY(1,1) NOT NULL,
    [ClienteGarante] [bit] NULL,
    [Origen] [int] NULL,
    [idCre_SolicitudWeb] [int] NULL,
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
    [Web] [int] NULL,
    [Nuevo] [bit] NULL,
*/

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
    idCre_SolicitudWeb: number;

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
}
