/*CREATE   TABLE CupoCredito (
    idCupoCredito UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID() PRIMARY KEY,
    MontoDesde DECIMAL(18,2) NOT NULL,
    MontoHasta DECIMAL(18,2) NOT NULL,
    Activo BIT NOT NULL DEFAULT 1,
	Autonomia BIT NOT NULL DEFAULT 0,
	Parcial BIT NOT NULL DEFAULT 0,
	SinAutonomia BIT NOT NULL DEFAULT 0,
    FechaSistema DATETIME NOT NULL DEFAULT GETDATE()
);
GO*/
import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive,
    Max,
    MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCupoCreditoDto {
    @IsNumber()
    @IsPositive()
    MontoDesde: number;

    @IsNumber()
    @IsPositive()
    MontoHasta: number;

    @IsBoolean()
    @IsOptional()
    Activo: boolean;

    @IsBoolean()
    @IsOptional()
    Autonomia: boolean;

    @IsBoolean()
    @IsOptional()
    Parcial: boolean;

    @IsBoolean()
    @IsOptional()
    SinAutonomia: boolean;

    /* Porcentaje DECIMAL(18,2) NOT NULL,*/
    @IsNumber()
    @IsPositive()
    Porcentaje: number;
}
