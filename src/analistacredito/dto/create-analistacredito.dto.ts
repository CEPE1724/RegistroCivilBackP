/*CREATE TABLE AnalistaCredito (
    idAnalistaCredito INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(200),
    idUsuario INT,
    Fecha DATETIME DEFAULT GETDATE(),
    Estado INT DEFAULT 1, -- 1 = Activo, 0 = Inactivo
    Observaciones VARCHAR(500),
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME() 
)

*/
import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateAnalistacreditoDto {
    @IsOptional()
    @IsNumber()
    idAnalistaCredito: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    Nombre: string;

    @IsNotEmpty()
    @IsNumber()
    idUsuario: number;

    @IsOptional()
    @IsDate()
    Fecha: Date;

    @IsOptional()
    @IsNumber()
    Estado: number;

   
}

