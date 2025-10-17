/*CREATE TABLE DFL_IndicadoresReverso (
    idDFL_IndicadoresReverso UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    confianza FLOAT,
    metadata NVARCHAR(MAX),
    codigoDactilar VARCHAR(10),
    confianza_indicadores NVARCHAR(MAX),
    codigoDactilarEncontrado VARCHAR(10),
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateDflIndicadoresReversoDto {
    @IsString()
    @IsNotEmpty()
    idDFL_AnalisisBiometrico: string;

    @IsNumber()
    @IsOptional()
    confianza: number;

    @IsString()
    @IsOptional()
    metadata: string;

    @IsString()
    @IsOptional()
    codigoDactilar: string;

    @IsString()
    @IsOptional()
    confianza_indicadores: string;

    @IsString()
    @IsOptional()
    codigoDactilarEncontrado: string;
}
