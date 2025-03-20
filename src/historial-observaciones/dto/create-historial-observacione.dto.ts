/*
CREATE TABLE [dbo].[HistorialObservaciones](
	[idHistorialObservaciones] [int] IDENTITY(1,1) NOT NULL,
	[idCre_SolicitudWeb] [int] NULL,
	[idDocumentosSolicitudWeb] [int] NULL,
	[idUsuario] [int] NULL,
	[Observacion] [text] NULL,
	[Fecha] [datetime] NULL,
	[TipoUsuario] [int] NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,
	[idTipoDocumentoWEB] [int] NULL,
*/

import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHistorialObservacioneDto {

    @IsNumber()
    @IsOptional()
    idCre_SolicitudWeb: number;

    @IsNumber()
    @IsOptional()
    idDocumentosSolicitudWeb: number;

    @IsNumber()
    @IsOptional()
    idUsuario: number;

    @IsString()
    Observacion: string;

    @IsDate()
    @Type(() => Date)
    Fecha: Date;

    @IsNumber()
    @IsOptional()
    TipoUsuario: number;

    @IsString()
    @IsOptional()
    Estacion: string;

    @IsString()
    @IsOptional()
    Usuario: string;

    @IsNumber()
    @IsOptional()
    idTipoDocumentoWEB: number;
}
