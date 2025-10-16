/*CREATE TABLE DFL_MetadataProcesada (
    idDFL_MetadataProcesada UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    identificacion VARCHAR(15),
    codigo_dactilar VARCHAR(10),
    nacionalidad VARCHAR(10),
    estado_civil VARCHAR(20),
    sexo VARCHAR(10),
    fecha_nacimiento DATE,
    fecha_emision DATE,
    fecha_caducidad DATE,
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateDflMetadataProcesadaDto {
    @IsString()
    @IsNotEmpty()
    idDFL_AnalisisBiometrico: string;

    @IsString()
    @IsOptional()
    identificacion: string;

    @IsString()
    @IsOptional()
    codigo_dactilar: string;

    @IsString()
    @IsOptional()
    nacionalidad: string;

    @IsString()
    @IsOptional()
    estado_civil: string;

    @IsString()
    @IsOptional()
    sexo: string;

    @IsDate()
    @IsOptional()
    fecha_nacimiento: Date;

    @IsDate()
    @IsOptional()
    fecha_emision: Date;

    @IsDate()
    @IsOptional()
    fecha_caducidad: Date;
}
