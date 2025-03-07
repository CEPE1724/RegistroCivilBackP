
/*CREATE  TABLE RoutesWeb (
    idRoutesWeb INT PRIMARY KEY IDENTITY(1,1),
    RouteName NVARCHAR(255) NOT NULL,  -- Nombre descriptivo de la ruta
    RouteUrl NVARCHAR(255) NOT NULL  , -- URL o endpoint de la ruta,
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
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateRouteswebDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    RouteName: string;

    @IsOptional()
    @IsString()
    RouteUrl: string;

    @IsOptional()
    @IsString()
    Usuario: string;
}
