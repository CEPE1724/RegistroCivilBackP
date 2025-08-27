/* 
CREATE TABLE [dbo].[Cre_VerificacionTelefonicaMaestro](
    [Fecha] [datetime] NULL,
    [Telefono] [varchar](15) NULL,
    [idEstadoOrigenTelefonica] [int] NULL,
    [idCre_SolicitudWeb] [int] NULL,
    [idWeb_SolicitudGrande] [int] NULL,
    [Observacion] [varchar](300) NULL,
*/

import { IsString, IsDate, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCreVerificacionTelefonicaMaestroDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    Fecha?: Date;


    @IsString()
    Telefono: string;

    @IsNumber()
    @IsPositive()
    idEstadoOrigenTelefonica: number;

    @IsNumber()
    @IsPositive()
    idCre_SolicitudWeb: number;

    @IsNumber()
    @IsPositive()
    idWeb_SolicitudGrande: number;

    @IsString()
    Observacion: string;
}
