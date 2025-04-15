

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
export class CreateRolePermissionsWebDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    idRolesWeb: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    idRoutesWeb: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    idPermissionsWeb: number;



    @IsOptional()
    @IsString()
    Usuario: string;
}
