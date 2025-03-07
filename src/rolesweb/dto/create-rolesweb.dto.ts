

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
export class CreateRoleswebDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    Nombre: string;


    @IsOptional()
    @IsString()
    Usuario: string;
}
