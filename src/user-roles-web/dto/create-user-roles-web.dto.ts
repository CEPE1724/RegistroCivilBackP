
/*

CREATE   TABLE UserRolesWeb (
idUserRolesWeb INT PRIMARY KEY IDENTITY(1,1),
    idUsuario int,
    idRolesWeb INT ,
	 FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);*/
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    IsPositive,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateUserRolesWebDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    idUsuario: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    idRolesWeb: number;

    @IsOptional()
    @IsString()
    Usuario: string;
}
