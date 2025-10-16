/*CREATE TABLE DFL_AnalisisBiometrico (
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    status INT NOT NULL,
    tipo VARCHAR(50),
    codigo VARCHAR(50),
    rostroSimilitud FLOAT,
    rostroSimilitudFrontal FLOAT,
    rostroSimilitudSelfie FLOAT,
    img_frontal NVARCHAR(MAX),
    img_reverso NVARCHAR(MAX),
    img_selfie NVARCHAR(MAX),
    bio_intento_frontal INT,
    bio_intento_reverso INT,
    bio_intento_selfie INT,
    bio_intento_dactilar INT,
    FechaSistema DATETIME DEFAULT GETDATE()
);
*/

import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateDflAnalisisBiometricoDto {
    @IsNumber()
    @IsNotEmpty()
    status: number;

    @IsString()
    @IsOptional()
    tipo?: string;

    @IsString()
    @IsOptional()
    codigo?: string;

    @IsNumber()
    @IsOptional()
    rostroSimilitud?: number;

    @IsNumber()
    @IsOptional()
    rostroSimilitudFrontal?: number;

    @IsNumber()
    @IsOptional()
    rostroSimilitudSelfie?: number;

    @IsString()
    @IsOptional()
    img_frontal?: string;

    @IsString()
    @IsOptional()
    img_reverso?: string;

    @IsString()
    @IsOptional()
    img_selfie?: string;

    @IsNumber()
    @IsOptional()
    bio_intento_frontal?: number;

    @IsNumber()
    @IsOptional()
    bio_intento_reverso?: number;

    @IsNumber()
    @IsOptional()
    bio_intento_selfie?: number;

    @IsNumber()
    @IsOptional()
    bio_intento_dactilar?: number;

    @IsDate()
    @IsOptional()
    FechaSistema?: Date;
}