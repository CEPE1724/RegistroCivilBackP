/*CREATE TABLE DFL_Referencia (
    idDFL_Referencia UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    identificacion VARCHAR(15),
    codigo_dactilar VARCHAR(10),
    fecha_nacimiento DATE,
    fecha_mayor_edad DATE,
    edad_actual VARCHAR(20),
    fecha_actual DATE,
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateDflReferenciaDto {
    @IsString()
    @IsNotEmpty()
    idDFL_AnalisisBiometrico: string;

    @IsString()
    @IsOptional()
    identificacion: string;

    @IsString()
    @IsOptional()
    codigo_dactilar: string;

    @IsDate()
    @IsOptional()
    fecha_nacimiento: Date;

    @IsDate()
    @IsOptional()
    fecha_mayor_edad: Date;

    @IsString()
    @IsOptional()
    edad_actual: string;

    @IsDate()
    @IsOptional()
    fecha_actual: Date;
}
