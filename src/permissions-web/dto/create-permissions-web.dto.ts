

/*CREATE  TABLE PermissionsWeb (
    idPermissionsWeb INT PRIMARY KEY IDENTITY(1,1),
    PermissionName NVARCHAR(50) NOT NULL,  -- Nombre de la acción (por ejemplo, "create", "edit", "delete", etc.)
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
export class CreatePermissionsWebDto {

    @IsString()
    @MinLength(1)
    PermissionName: string;

   

    @IsString()
    @MinLength(1)
    @IsOptional()
    Usuario?: string;

}


