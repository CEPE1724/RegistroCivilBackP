/*CREATE TABLE CognoSolicitudNacionalidades (
    idCognoSolicitudNacionalidades INT IDENTITY(1,1) PRIMARY KEY,
    idCognoSolicitudCredito INT,
    idPais INT,
    nombre VARCHAR(200),
    codigoArea VARCHAR(10),
    codigoIso2 VARCHAR(5),
    codigoIso3 VARCHAR(5),
    codigoIso INT,
    /* auditoria
    FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);
*/
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    IsPositive,
    MinLength,
    isString,
} from 'class-validator';

export class CreateCognosolicitudnacionalidadesDto {


    @IsString()
    @IsOptional()
    idCognoSolicitudCredito?: string;


    @IsNumber()
    @IsPositive()
    @IsOptional()
    idPais?: number;


    @IsString()
    @MinLength(1)
    @IsOptional()
    nombre?: string;


    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoArea?: string;

    
    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoIso2?: string;


    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoIso3?: string;

 
    @IsNumber()
    @IsPositive()
    @IsOptional()
    codigoIso?: number;

}
