/*CREATE TABLE [dbo].[TiempoSolicitudesWeb](
	[idTiempoSolicitudesWeb] [int] IDENTITY(1,1) NOT NULL,
	[idEstadoVerificacionDocumental] [int] NULL,
	[idCre_SolicitudWeb] [int] NULL,
	[Tipo] [int] NULL,
	[Usuario] [varchar](50) NULL,
	[FechaSistema] [datetime] NULL,
*/

import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTiemposolicitudeswebDto {

    @IsNumber()
    idEstadoVerificacionDocumental?: number;

    @IsNumber()
    idCre_SolicitudWeb?: string;

    @IsNumber()
    Tipo?: number;

    @IsString()
    Usuario?: string;

    @IsString()
    @IsOptional()
    Telefono?: string;

}



