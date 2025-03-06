/*

CREATE TABLE CognoSolicitudCredito (
        idCognoSolicitudCredito INT IDENTITY(1,1) PRIMARY KEY,
        idCre_SolicitudWeb INT DEFAULT 0,
        Cedula VARCHAR(20),
        FechaActualizacion DATETIME DEFAULT GETDATE(),
        bInfoPersonal BIT, 
        bInfoLaboral BIT, 
        Codigo VARCHAR(20),
        Mensaje VARCHAR(255),
    )*/
import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCognosolicitudcreditoDto {

    @IsNumber()
    @IsPositive()
    idCre_SolicitudWeb?: number;

    @IsString()
    @MinLength(10)
    Cedula: string;

    @IsDate()
    @Type(() => Date)
    FechaActualizacion: Date;

    @IsBoolean()
    @IsOptional()
    bInfoPersonal: boolean;

    @IsBoolean()
    @IsOptional()
    bInfoLaboral: boolean;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Codigo: string;

    @IsString()
    @MinLength(0)
    @IsOptional()
    Mensaje: string;

}


