/*CREATE TABLE AnalisisDeIdentidad (
    idAnalisisDeIdentidad UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    codigo VARCHAR(255) DEFAULT '',
    identificacion VARCHAR(15) DEFAULT '',
    url VARCHAR(500) DEFAULT '',
    short_url VARCHAR(255) DEFAULT '',
    valido_hasta DATETIME NOT NULL,
    Usuario VARCHAR(50) DEFAULT '',
    idCre_SolicitudWeb int default 0 ,
    codigo_interno VARCHAR(500) DEFAULT '',
    idEstadoAnalisisDeIdentidad INT DEFAULT 0,
    FechaSistema DATETIME DEFAULT GETDATE(),
    Mensaje varchar(500) default '', 
    FechaRespuesta DATETIME 
);
*/

import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber, IsUUID, isString } from 'class-validator';

export class CreateAnalisisdeidentidadDto {

    @IsString()
    @IsOptional()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    identificacion: string;

    @IsString()
    @IsOptional()
    url?: string;

    @IsString()
    @IsOptional()
    short_url: string;

    @IsDate()
    @IsNotEmpty()
    valido_hasta: Date;

    @IsString()
    @IsOptional()
    Usuario: string;

    @IsNumber()
    @IsOptional()
    idCre_SolicitudWeb?: number;

    @IsString()
    @IsOptional()
    codigo_interno?: string;

    @IsNumber()
    @IsOptional()
    idEstadoAnalisisDeIdentidad?: number;

    @IsDate()
    @IsOptional()
    FechaSistema?: Date;

    @IsString()
    @IsOptional()
    Mensaje?: string;

    @IsDate()
    @IsOptional()
    FechaRespuesta?: Date;

    @IsUUID()
    @IsOptional()
    sCreSolicitudWeb?: string;

    @IsString()
    @IsOptional()
    hash_operation?: string;
}